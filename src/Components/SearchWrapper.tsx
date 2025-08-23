'use client'

import { Suspense } from 'react'
import Search from './Search'

export default function SearchWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-6xl mx-auto p-5">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-14 rounded-xl"></div>
      </div>
    }>
      <Search />
    </Suspense>
  )
}
