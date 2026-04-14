import Image from 'next/image';
import React from 'react';
import { FaStar } from "react-icons/fa";
import WatchNowClient from '@/Components/WatchNowClient';

// Flexible interface to handle both Movies and TV formats identically
interface HeroData {
  title: string;
  original_title?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  genres: Array<{ id: number; name: string }>;
  runtimeStr?: string; 
  releaseYear?: string;
  status?: string;
  trailerKey?: string;
}

export default function HeroSection({ data }: { data: HeroData }) {
  const backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : '';
  const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '';
  const stars = data.vote_average?.toFixed(1) ?? 'N/A';
  const sanitizeOverview = (text?: string) => {
    if (!text) return 'Synopsis is currently unavailable.';

    // Remove links and noisy punctuation artifacts that often appear in imported descriptions.
    const withoutLinks = text.replace(/https?:\/\/\S+/gi, '');
    const normalized = withoutLinks
      .replace(/\[[^\]]*\]/g, ' ')
      .replace(/[|*_`]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normalized) return 'Synopsis is currently unavailable.';

    const sentences = normalized.match(/[^.!?]+[.!?]?/g) ?? [normalized];
    const concise = sentences.slice(0, 2).join(' ').trim();

    return concise.length > 260 ? `${concise.slice(0, 257).trimEnd()}...` : concise;
  };

  const professionalOverview = sanitizeOverview(data.overview);

  return (
    <div className="relative min-h-[90vh] bg-dark-50 dark:bg-dark-900 flex items-center pt-24 pb-12 lg:py-0 overflow-hidden">
      {/* Immersive Backdrop Image */}
      {backdrop && (
        <div className="absolute inset-0 z-0 animate-fadeIn">
          <Image
            src={backdrop}
            alt={data.title}
            fill
            className="object-cover object-top opacity-50 dark:opacity-30 blur-[2px] transition-transform duration-1000 scale-105"
            sizes="100vw"
            priority
          />
          {/* Gradients to seamlessly blend backdrop into background color */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-transparent to-dark-50/80 dark:from-dark-900 dark:via-dark-900/60 dark:to-dark-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-50/90 via-transparent to-transparent dark:from-dark-900/90" />
        </div>
      )}

      <div className="container mx-auto px-5 relative z-10 w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between lg:items-end gap-8 lg:gap-12 md:gap-10">
          
          {/* Main Poster */}
          {poster && (
            <div className="w-64 sm:w-72 md:w-80 lg:w-[360px] flex-shrink-0 animate-fadeIn mx-auto lg:mx-0" style={{ animationDelay: '100ms' }}>
              <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-dark-200/20 dark:border-dark-700/50 group">
                <Image
                  src={poster}
                  alt={data.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )}

          {/* Core Metadata */}
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:w-auto max-w-2xl lg:max-w-3xl animate-fadeIn" style={{ animationDelay: '200ms' }}>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
              {data.status && (
                <span className="px-3 py-1 bg-dark-800/80 backdrop-blur-md text-white border border-dark-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {data.status}
                </span>
              )}
              {data.releaseYear && (
                <span className="px-3 py-1 bg-dark-800/80 backdrop-blur-md text-dark-200 border border-dark-600 rounded-lg text-xs font-bold">
                  {data.releaseYear}
                </span>
              )}
              {data.runtimeStr && (
                <span className="px-3 py-1 bg-dark-800/80 backdrop-blur-md text-dark-200 border border-dark-600 rounded-lg text-xs font-bold">
                  {data.runtimeStr}
                </span>
              )}
              {data.vote_count > 0 && (
                <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-md text-yellow-400 border border-yellow-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <FaStar /> {stars} ({data.vote_count.toLocaleString()})
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-dark-900 dark:text-white leading-tight tracking-tight mb-2">
              {data.title}
            </h1>
            {data.tagline && (
              <p className="text-xl sm:text-2xl text-neon-cyan dark:text-neon-cyan/90 font-medium italic mb-6">
                &quot;{data.tagline}&quot;
              </p>
            )}

            {/* Genres */}
            {data.genres && data.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {data.genres.map(g => (
                  <span key={g.id} className="px-4 py-1.5 bg-dark-100/50 dark:bg-dark-800/50 backdrop-blur-md text-dark-700 dark:text-dark-200 border border-dark-200/50 dark:border-dark-700 rounded-full text-sm font-medium hover:border-neon-pink hover:text-neon-pink transition-colors cursor-default">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-dark-600 dark:text-dark-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              {professionalOverview}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full justify-center lg:justify-start">
              <WatchNowClient title={data.title} videoKey={data.trailerKey} />
              
              <button title="Favorite" className="p-4 rounded-xl bg-dark-100/80 dark:bg-dark-800/80 backdrop-blur-md border border-dark-200 dark:border-dark-700 text-dark-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group">
                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              
              <button title="Share" className="p-4 rounded-xl bg-dark-100/80 dark:bg-dark-800/80 backdrop-blur-md border border-dark-200 dark:border-dark-700 text-dark-400 hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 group">
                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
