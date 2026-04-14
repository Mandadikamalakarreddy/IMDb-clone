'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon, FilmIcon, TvIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Movie genres
const movieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

// TV genres
const tvGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
]

export default function GenreSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [contentType, setContentType] = useState<'movie' | 'tv'>('movie')
  const [selectedGenre, setSelectedGenre] = useState<number>(28)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const type = searchParams.get('type') || 'movie'
    const genre = parseInt(searchParams.get('genre') || '28')
    
    setContentType(type as 'movie' | 'tv')
    setSelectedGenre(genre)
  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentGenres = contentType === 'movie' ? movieGenres : tvGenres
  const filteredGenres = currentGenres.filter(genre => 
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const currentGenreName = currentGenres.find(g => g.id === selectedGenre)?.name || 'Action'

  const handleContentTypeChange = (type: 'movie' | 'tv') => {
    setContentType(type)
    const firstGenre = type === 'movie' ? movieGenres[0].id : tvGenres[0].id
    setSelectedGenre(firstGenre)
    router.push(`/genres?type=${type}&genre=${firstGenre}`)
  }

  const handleGenreChange = (genreId: number) => {
    setSelectedGenre(genreId)
    setIsDropdownOpen(false)
    setSearchTerm('')
    router.push(`/genres?type=${contentType}&genre=${genreId}`)
  }

  return (
    <div className="border-b border-dark-200/30 dark:border-dark-600/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-2">
            Discover Content
          </h1>
          <p className="text-base text-dark-400 dark:text-dark-300">
            Browse movies and TV shows by your favorite genres
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          
          {/* Content Type Toggle */}
          <div className="flex bg-dark-100 dark:bg-dark-800 rounded-full p-1.5 shadow-lg border border-dark-200/30 dark:border-dark-600/50">
            <button
              onClick={() => handleContentTypeChange('movie')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                contentType === 'movie'
                  ? 'bg-neon-pink text-white shadow-md'
                  : 'text-dark-400 dark:text-dark-300 hover:text-neon-pink'
              }`}
            >
              <FilmIcon className="w-4 h-4" />
              Movies
            </button>
            <button
              onClick={() => handleContentTypeChange('tv')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                contentType === 'tv'
                  ? 'bg-neon-pink text-white shadow-md'
                  : 'text-dark-400 dark:text-dark-300 hover:text-neon-pink'
              }`}
            >
              <TvIcon className="w-4 h-4" />
              TV Shows
            </button>
          </div>

          {/* Genre Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-3 bg-white dark:bg-dark-800 border-2 border-dark-200/50 dark:border-dark-600/50 rounded-xl px-6 py-3.5 min-w-[260px] text-left font-semibold text-dark-900 dark:text-white hover:border-neon-pink dark:hover:border-neon-pink transition-all duration-300 shadow-md focus:outline-none focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20"
            >
              <span className="truncate text-sm">{currentGenreName}</span>
              <ChevronDownIcon 
                className={`w-4 h-4 text-dark-400 transition-transform duration-300 ${
                  isDropdownOpen ? 'transform rotate-180 text-neon-pink' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-dark-800 border border-dark-200/50 dark:border-dark-600/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                {/* Search Input */}
                <div className="p-3 border-b border-dark-200/30 dark:border-dark-700">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input
                      type="text"
                      placeholder="Search genres..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-dark-50 dark:bg-dark-700 border border-dark-200/30 dark:border-dark-600 rounded-lg text-sm placeholder-dark-400 dark:placeholder-dark-500 text-dark-900 dark:text-white focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/20"
                    />
                  </div>
                </div>
                
                {/* Genre List */}
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  <div className="py-1">
                    {filteredGenres.length > 0 ? (
                      filteredGenres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => handleGenreChange(genre.id)}
                          className={`w-full text-left px-5 py-2.5 transition-all duration-200 flex items-center justify-between text-sm ${
                            genre.id === selectedGenre
                              ? 'bg-neon-pink/10 dark:bg-neon-pink/10 text-neon-pink border-r-3 border-neon-pink'
                              : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100/50 dark:hover:bg-dark-700/50'
                          }`}
                        >
                          <span className="font-medium">{genre.name}</span>
                          {genre.id === selectedGenre && (
                            <div className="w-2 h-2 rounded-full bg-neon-pink" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-dark-400 dark:text-dark-500">
                        <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No genres found matching &quot;{searchTerm}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
