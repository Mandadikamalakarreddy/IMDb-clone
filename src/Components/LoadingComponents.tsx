'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'purple' | 'gray'
}

export function LoadingSpinner({ size = 'md', color = 'blue' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }
  
  const colorClasses = {
    blue: 'border-blue-600',
    purple: 'border-purple-600', 
    gray: 'border-gray-600'
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 ${colorClasses[color]} border-t-transparent`} />
  )
}

export function GenreLoadingSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-2 w-80 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto w-96 animate-pulse"></div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Toggle Skeleton */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow-lg">
            <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse ml-1"></div>
          </div>

          {/* Dropdown Skeleton */}
          <div className="h-14 w-56 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
        </div>

        {/* Quick Pills Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 w-60 animate-pulse"></div>
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" style={{ width: `${Math.random() * 40 + 80}px` }}></div>
            ))}
          </div>
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
        <div className="inline-flex items-center gap-3 bg-gray-200 dark:bg-gray-700 px-8 py-4 rounded-2xl">
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-80 animate-pulse"></div>
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="relative">
        <div className="relative z-10 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
