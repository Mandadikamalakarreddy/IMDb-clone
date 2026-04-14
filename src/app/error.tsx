'use client'
import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.log(error);
  }, [error])

  return (
    <div className='min-h-[50vh] flex items-center justify-center'>
      <div className='text-center'>
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className='text-xl font-bold text-dark-900 dark:text-white mb-2'>Something went wrong</h1>
        <p className='text-dark-400 dark:text-dark-500 mb-6 text-sm'>Please try again</p>
        <button className='px-6 py-2.5 bg-neon-pink hover:bg-neon-pink-light text-white rounded-xl font-semibold transition-all duration-300 text-sm' onClick={reset}>Try Again</button>
      </div>
    </div>
  )
}
