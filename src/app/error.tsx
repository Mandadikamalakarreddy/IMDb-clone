'use client'
import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.log(error);
  }, [error])

  return (
    <div className='text-center mt-10'>
      <h1>Something went wrong please try again</h1>
      <button className='hover:text-amber-600' onClick={reset}>Try Again</button>
    </div>
  )
}
