'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';

interface Review {
  id: string;
  author: string;
  content: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  created_at: string;
}

export default function ReviewList({ reviews }: { reviews?: Review[] }) {
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  if (!reviews || reviews.length === 0) return null;

  // We'll show the top 3 most relevant reviews to avoid massive walls of text.
  const displayReviews = reviews.slice(0, 3);

  const getAvatarUrl = (path: string | null) => {
    if (!path) return '';
    if (path.startsWith('/https')) return path.substring(1); 
    return `https://image.tmdb.org/t/p/w150_and_h150_face${path}`;
  };

  const toggleReview = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatReviewDate = (isoDate: string) => {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  return (
    <div className="w-full mt-16 animate-fadeIn" style={{ animationDelay: '500ms' }}>
      <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-900 to-dark-600 dark:from-white dark:to-dark-300 mb-8">
        Featured Reviews
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((review) => {
          const isExpanded = !!expandedReviews[review.id];
          const shouldShowReadMore = review.content.length > 280;

          return (
          <div key={review.id} className="bg-dark-50 dark:bg-dark-800 rounded-3xl p-6 shadow-sm hover:shadow-lg border border-dark-200/50 dark:border-dark-700 transition-all duration-300">
            <div className="flex flex-col h-full">
              {/* Header: User & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dark-200 dark:bg-dark-700 overflow-hidden relative flex-shrink-0">
                    {review.author_details?.avatar_path ? (
                      <Image 
                        src={getAvatarUrl(review.author_details.avatar_path)}
                        alt={review.author}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-dark-500 font-bold bg-gradient-to-br from-neon-pink/20 to-neon-cyan/20">
                        {review.author[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-900 dark:text-white text-sm">
                      {review.author_details?.name || review.author}
                    </h4>
                    <p className="text-xs text-dark-400">{formatReviewDate(review.created_at)}</p>
                  </div>
                </div>
                
                {review.author_details?.rating && (
                  <div className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-yellow-500 font-bold text-xs">
                      {review.author_details.rating}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content block */}
              <div className="relative flex-grow">
                <p className={`text-sm text-dark-600 dark:text-dark-300 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-6'}`}>
                  {review.content}
                </p>

                {!isExpanded && shouldShowReadMore && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-dark-50 dark:from-dark-800 to-transparent" />
                )}

                {shouldShowReadMore && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleReview(review.id)}
                    className="mt-4 group relative overflow-hidden rounded-full border border-neon-cyan/40 bg-gradient-to-r from-neon-cyan/10 via-neon-cyan/5 to-neon-pink/10 px-4 text-neon-cyan hover:border-neon-cyan/70 hover:text-neon-cyan-light"
                  >
                    <span className="relative z-10 flex items-center gap-1.5 font-semibold tracking-wide">
                      {isExpanded ? 'Read Less' : 'Read More'}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 transition-transform duration-300 group-hover:translate-y-0" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
