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
    // Reset to first genre of the selected type
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
    <div className=" border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Content
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse movies and TV shows by your favorite genres
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          
          {/* Content Type Toggle */}
          <div className="flex bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleContentTypeChange('movie')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                contentType === 'movie'
                  ? 'bg-amber-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              <FilmIcon className="w-5 h-5" />
              Movies
            </button>
            <button
              onClick={() => handleContentTypeChange('tv')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                contentType === 'tv'
                  ? 'bg-amber-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              <TvIcon className="w-5 h-5" />
              TV Shows
            </button>
          </div>

          {/* Genre Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl px-6 py-4 min-w-[260px] text-left font-semibold text-gray-900 dark:text-white hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            >
              <span className="truncate">{currentGenreName}</span>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  isDropdownOpen ? 'transform rotate-180 text-amber-500' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search genres..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
                
                {/* Genre List */}
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  <div className="py-2">
                    {filteredGenres.length > 0 ? (
                      filteredGenres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => handleGenreChange(genre.id)}
                          className={`w-full text-left px-6 py-3 transition-all duration-200 flex items-center justify-between group ${
                            genre.id === selectedGenre
                              ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-r-4 border-amber-600'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <span className="font-medium">{genre.name}</span>
                          {genre.id === selectedGenre && (
                            <div className="w-2 h-2 rounded-full bg-amber-600" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
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

        {/* Quick Genre Pills */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Popular {contentType === 'movie' ? 'Movie' : 'TV Show'} Genres
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {currentGenres.slice(0, 8).map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  genre.id === selectedGenre
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div> */}

        {/* Current Selection Indicator */}
        {/* <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
            {contentType === 'movie' ? (
              <FilmIcon className="w-5 h-5 text-amber-600" />
            ) : (
              <TvIcon className="w-5 h-5 text-amber-600" />
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Browsing <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">{currentGenreName}</span> {contentType === 'movie' ? 'Movies' : 'TV Shows'}
            </span>
          </div>
        </div> */}

        {/* Statistics */}
        {/* <div className="mt-6 flex justify-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {currentGenres.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Available Genres
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                2024
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Latest Content
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
