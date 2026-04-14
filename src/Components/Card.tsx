"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  result: {
    id: number
    poster_path?: string | null
    title?: string
    name?: string
    overview: string
    release_date?: string
    first_air_date?: string
    vote_average: number
    media_type?: string
  }
}

export default function Card({ result }: CardProps) {
  const [imageError, setImageError] = useState(false)

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (rating >= 6.5) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const year = new Date(result.release_date || result.first_air_date || '').getFullYear() || 'TBA'
  
  // Predict media type safely.
  const isMovie = result.media_type === 'movie' || (result.title && !result.name && result.media_type !== 'tv');
  const mediaRoute = isMovie ? 'movies' : 'tv'
  const displayType = isMovie ? 'movie' : 'tv'

  return (
    <div className="relative overflow-hidden rounded-2xl bg-dark-800 shadow-lg border border-dark-600/50 hover:border-neon-pink">
      {/* Deterministic Link enveloping the entire card for accessibility / strict behavior */}
      <Link href={`/${mediaRoute}/${result.id}`} className="block focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-neon-pink" aria-label={`More info about ${result.title || result.name}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[2/3] bg-dark-700">
          {result.poster_path && !imageError ? (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                width={500}
                height={750}
                className="w-full h-full object-cover"
                alt={result.title || result.name || 'Movie poster'}
                onError={() => setImageError(true)}
              />
              
              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Rating Badge */}
              <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md ${getRatingBg(result.vote_average)} border`}>
                <div className="flex items-center space-x-1">
                  <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-xs text-white">
                    {result.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-white font-bold text-base line-clamp-2 mb-1.5">
                  {result.title || result.name}
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-dark-200 font-medium capitalize">{displayType}</span>
                  <span className="text-dark-400">•</span>
                  <span className="text-dark-200 font-medium">{year}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-dark-700 flex items-center justify-center p-4">
              <div className="text-center">
                <svg className="w-12 h-12 text-dark-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-dark-400 font-medium text-sm line-clamp-2">{result.title || result.name}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
