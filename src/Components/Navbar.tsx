'use client'

import React from 'react'
import NavItems from './NavItems'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {

  const pathName = usePathname()

  return (
    <div className="flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6">
      <NavItems title="Trending" param="fetchTrending" />
      <NavItems title="Top Rated" param="fetchTopRated" />
      <NavItems title="Movies" param="movies" />
      <NavItems title="Tv Shows" param="TvSeries" />
      <Link className={`hover:text-amber-600 font-semibold ${
          pathName === '/genres'
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`} href="/genres">
        Genres
      </Link>
      <Link className={`hover:text-amber-600 font-semibold ${
          pathName === '/toDaysPicks'
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`} href="/toDaysPicks">
        Today&apos;s Picks
      </Link>
    </div>
  )
}
