'use client'

import { Suspense } from 'react'
import Search from './Search'

export default function SearchWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-3xl mx-auto px-4 py-4">
        <div className="animate-pulse bg-dark-100 dark:bg-dark-800 h-12 rounded-2xl"></div>
      </div>
    }>
      <Search />
    </Suspense>
  )
}
