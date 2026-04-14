'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface NavItemsProps {
  title: string
  param: string
}

export default function NavItems({ title, param }: NavItemsProps) {
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre')
  
  return (
    <div>
      <Link
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
          genre === param
            ? 'bg-neon-cyan text-dark-900 shadow-md'
            : 'text-dark-400 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-900 dark:hover:text-white'
        }`}
        href={`/?genre=${param}`}
      >
        {title}
      </Link>
    </div>
  )
}
