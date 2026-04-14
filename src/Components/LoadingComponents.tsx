'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'pink' | 'cyan' | 'gray'
}

export function LoadingSpinner({ size = 'md', color = 'pink' }: LoadingSpinnerProps) {
  const sizeClasses = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' }
  const colorClasses = { pink: 'text-neon-pink', cyan: 'text-neon-cyan', gray: 'text-dark-400' }

  return (
    <div className={`font-bold uppercase tracking-widest ${sizeClasses[size]} ${colorClasses[color]}`}>
      Loading...
    </div>
  )
}

export function GenreLoadingSkeleton() {
  return (
    <div className="bg-dark-50 dark:bg-dark-900 border-b border-dark-200/30 dark:border-dark-600/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="h-10 bg-dark-200 dark:bg-dark-700/50 rounded-xl mx-auto mb-3 w-80"></div>
          <div className="h-5 bg-dark-100 dark:bg-dark-700/50 rounded-lg mx-auto w-96"></div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Toggle Skeleton */}
          <div className="flex bg-dark-200 dark:bg-dark-700/50 rounded-full p-1 shadow-lg">
            <div className="h-12 w-32 bg-dark-300 dark:bg-dark-600/50 rounded-full"></div>
            <div className="h-12 w-32 bg-dark-300 dark:bg-dark-600/50 rounded-full ml-1"></div>
          </div>

          {/* Dropdown Skeleton */}
          <div className="h-14 w-56 bg-dark-200 dark:bg-dark-700/50 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}

export function ResultsLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-dark-200 dark:bg-dark-800/80 px-8 py-4 rounded-2xl">
          <div className="w-3 h-3 rounded-full bg-dark-300 dark:bg-dark-600/50"></div>
          <div className="h-6 bg-dark-300 dark:bg-dark-600/50 rounded w-80"></div>
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-dark-100 dark:bg-dark-800/50 rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-[2/3] bg-dark-200 dark:bg-dark-700/50"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
