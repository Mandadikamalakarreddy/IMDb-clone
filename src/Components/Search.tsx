'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface SearchSuggestion {
  id: string
  title: string
  type: 'movie' | 'tv'
  year?: string
  poster_path?: string
}

export default function Search() {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const searchSuggestions = async (query: string) => {
    if (query.trim().length < 2) { 
      setSuggestions([])
      setIsDropdownOpen(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }
      const data = await response.json()
      setSuggestions(data.results || [])
      setIsDropdownOpen(data.results?.length > 0)
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
      setIsDropdownOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = debounce(searchSuggestions, 300)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setSelectedIndex(-1)
    debouncedSearch(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else if (search.trim()) {
          handleSubmit(e as any)
        }
        break
      case 'Escape':
        setIsDropdownOpen(false)
        setSelectedIndex(-1)
        searchRef.current?.blur()
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`)
      setIsDropdownOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearch(suggestion.title)
    setIsDropdownOpen(false)
    if (suggestion.type === 'movie') {
      router.push(`/movies/${suggestion.id}`)
    } else if (suggestion.type === 'tv') {
      router.push(`/tv/${suggestion.id}`)
    } else {
      router.push(`/search/${encodeURIComponent(suggestion.title)}`)
    }
  }

  const clearSearch = () => {
    setSearch('')
    setSuggestions([])
    setIsDropdownOpen(false)
    setSelectedIndex(-1)
    searchRef.current?.focus()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return '🎬'
      case 'tv':
        return '📺'
      default:
        return '🔍'
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center ${
          isFocused || search 
            ? 'bg-white dark:bg-dark-700 border-2 border-neon-pink/50 shadow-lg' 
            : 'bg-dark-100/80 dark:bg-dark-800/80 border-2 border-transparent hover:border-dark-200 dark:hover:border-dark-600'
        } rounded-2xl`}>
          
          {/* Search Icon */}
          <div className="pl-4 pr-3">
            <svg 
              className={`w-5 h-5 ${isFocused ? 'text-neon-pink' : 'text-dark-400 dark:text-dark-500'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          <input
            ref={searchRef}
            type="text"
            placeholder="Search movies, actors, moods..."
            className="w-full h-12 bg-transparent outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 font-medium text-sm"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true)
              if (search.trim().length >= 2) {
                setIsDropdownOpen(suggestions.length > 0)
              }
            }}
            onBlur={() => setIsFocused(false)}
          />

          {/* Clear Button */}
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 mr-1 hover:bg-dark-200/50 dark:hover:bg-dark-600/50 rounded-full"
            >
              <svg 
                className="w-4 h-4 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}

          <button
            type="submit"
            disabled={!search.trim()}
            className={`px-5 py-2.5 mr-1.5 rounded-xl font-semibold text-sm ${
              search.trim()
                ? 'bg-neon-pink hover:bg-neon-pink-light text-white shadow-md hover:shadow-lg'
                : 'bg-dark-200/50 dark:bg-dark-600/50 text-dark-400 dark:text-dark-500 cursor-not-allowed'
            }`}
          >
            Search
          </button>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 border border-dark-200/50 dark:border-dark-600/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto w-full custom-scrollbar"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-dark-400 dark:text-dark-500 text-sm font-bold tracking-widest uppercase">
                Loading...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-dark-400 dark:text-dark-500 uppercase tracking-wider border-b border-dark-100 dark:border-dark-700">
                  Results
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-4 py-3 text-left border-b border-dark-100/50 dark:border-dark-700/50 last:border-b-0 focus:outline-none ${
                      selectedIndex === index
                        ? 'bg-neon-pink/10 dark:bg-neon-pink/10'
                        : 'hover:bg-dark-100/50 dark:hover:bg-dark-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {suggestion.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                          alt={suggestion.title}
                          width={40}
                          height={56}
                          className="w-10 h-14 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <div className={`flex items-center justify-center w-10 h-14 bg-dark-100 dark:bg-dark-700 rounded-lg ${suggestion.poster_path ? 'hidden' : ''}`}>
                        <span className="text-xl">{getTypeIcon(suggestion.type)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-dark-900 dark:text-white text-sm">
                          {suggestion.title}
                        </div>
                        <div className="text-xs text-dark-400 dark:text-dark-500 capitalize mt-0.5">
                          {suggestion.type} 
                          {suggestion.year && ` • ${suggestion.year}`}
                        </div>
                      </div>
                      <svg 
                        className="w-4 h-4 text-dark-300 dark:text-dark-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            ) : search.trim().length >= 2 ? (
              <div className="py-8 text-center">
                <div className="text-dark-400 dark:text-dark-500 mb-4">
                  <svg className="w-10 h-10 mx-auto mb-3 text-dark-300 dark:text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm">No results found for &quot;{search}&quot;</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 bg-neon-pink hover:bg-neon-pink-light text-white rounded-xl font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search anyway
                </button>
              </div>
            ) : null}
          </div>
        )}

        {isFocused && search.trim().length > 0 && search.trim().length < 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 border border-dark-200/50 dark:border-dark-600/50 rounded-xl shadow-lg z-50 px-4 py-3">
            <div className="text-sm text-dark-400 dark:text-dark-500 text-center">
              Type at least 2 characters to see suggestions
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
