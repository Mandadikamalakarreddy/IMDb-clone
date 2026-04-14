'use client'

import React from 'react'
import NavItemsWrapper from './NavItemsWrapper'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {

  const pathName = usePathname()

  return (
    <div className="flex items-center bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-dark-200/30 dark:border-dark-600/50 p-3 lg:text-base justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
      <NavItemsWrapper title="Trending" param="fetchTrending" />
      <NavItemsWrapper title="Top Rated" param="fetchTopRated" />
      <NavItemsWrapper title="Movies" param="movies" />
      <NavItemsWrapper title="Tv Shows" param="TvSeries" />
      <Link className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
          pathName === '/genres'
            ? 'bg-neon-cyan text-dark-900 shadow-md'
            : 'text-dark-400 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-900 dark:hover:text-white'
        }`} href="/genres">
        Genres
      </Link>
      <Link className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
          pathName === '/todays-picks'
            ? 'bg-neon-cyan text-dark-900 shadow-md'
            : 'text-dark-400 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-900 dark:hover:text-white'
        }`} href="/todays-picks">
        Today&apos;s Picks
      </Link>
    </div>
  )
}
