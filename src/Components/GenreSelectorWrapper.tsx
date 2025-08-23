'use client'

import { Suspense } from 'react'
import GenreSelector from './GenreSelector'

export default function GenreSelectorWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-12 w-32 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-12 w-48 rounded-lg"></div>
          </div>
        </div>
      </div>
    }>
      <GenreSelector />
    </Suspense>
  )
}
