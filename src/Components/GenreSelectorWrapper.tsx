'use client'

import { Suspense } from 'react'
import GenreSelector from './GenreSelector'

export default function GenreSelectorWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full bg-dark-50 dark:bg-dark-900 border-b border-dark-200/30 dark:border-dark-600/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-pulse bg-dark-200 dark:bg-dark-700 h-12 w-32 rounded-full"></div>
            <div className="animate-pulse bg-dark-200 dark:bg-dark-700 h-12 w-48 rounded-xl"></div>
          </div>
        </div>
      </div>
    }>
      <GenreSelector />
    </Suspense>
  )
}
