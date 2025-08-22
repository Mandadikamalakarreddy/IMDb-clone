"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  result: {
    id: number
    poster_path?: string
    title?: string
    name?: string
    overview: string
    release_date?: string
    first_air_date?: string
    vote_average: number
  }
}

export default function Card({ result }: CardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500'
    if (rating >= 6.5) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-500/20'
    if (rating >= 6.5) return 'bg-yellow-500/20'
    return 'bg-red-500/20'
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
      <Link href={`/${result.title ? 'movies' : 'tv'}/${result.id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl">
          {result.poster_path && !imageError ? (
            <>
              {/* Loading Skeleton */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center h-80">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-amber-500 rounded-full animate-spin"></div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading...</div>
                  </div>
                </div>
              )}
              
              <Image
                src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                width={500}
                height={750}
                className={`w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                alt={result.title || result.name || 'Movie poster'}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true)
                  setImageLoading(false)
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Rating Badge */}
              {!imageLoading && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm ${getRatingBg(result.vote_average)} border border-white/20`}>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-semibold text-sm">
                      {result.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Play Button Overlay */}
              {/* {!imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )} */}
            </>
          ) : (
            <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500 dark:text-gray-400 font-medium">No Image Available</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {result.title || result.name}
          </h2>

          {/* Overview */}
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {result.overview}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            {/* Release Date */}
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">
                {new Date(result.release_date || result.first_air_date || '').getFullYear() || 'TBA'}
              </span>
            </div>

            {/* Media Type Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                result.title 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>
                {result.title ? 'Movie' : 'TV Show'}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-300 pointer-events-none" /> */}
      </Link>
    </div>
  )
}
