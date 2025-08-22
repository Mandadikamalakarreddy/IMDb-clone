'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    setSelectedIndex(-1) // Reset selection when typing
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
    <div className="relative w-full max-w-6xl mx-auto p-5">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-300 ease-in-out ${
          isFocused || search 
            ? 'bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-amber-500/50' 
            : 'bg-white/5 dark:bg-gray-800/30 border-2 border-transparent hover:border-gray-300/30'
        } rounded-xl shadow-lg hover:shadow-xl`}>
          
          {/* Search Icon */}
          <div className="pl-4 pr-3">
            <svg 
              className="w-5 h-5 text-gray-400 dark:text-gray-500" 
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
            placeholder="Search movies, TV shows, actors..."
            className="w-full h-14 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
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
              className="p-2 mr-2 hover:bg-gray-200/20 dark:hover:bg-gray-700/30 rounded-full transition-colors duration-200"
            >
              <svg 
                className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" 
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
            className={`px-6 py-3 mr-2 rounded-lg font-semibold transition-all duration-200 ${
              search.trim()
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300/50 dark:bg-gray-600/50 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Search
          </button>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50 max-h-96 overflow-y-auto custom-scrollbar animate-slide-up"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-4 py-3 text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0 focus:outline-none ${
                      selectedIndex === index
                        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:bg-amber-50 dark:focus:bg-amber-900/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {suggestion.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                          alt={suggestion.title}
                          className="w-10 h-14 object-cover rounded-md shadow-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <div className={`flex items-center justify-center w-10 h-14 bg-gray-100 dark:bg-gray-700 rounded-md ${suggestion.poster_path ? 'hidden' : ''}`}>
                        <span className="text-2xl">{getTypeIcon(suggestion.type)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {suggestion.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {suggestion.type} 
                          {suggestion.year && ` • ${suggestion.year}`}
                        </div>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400" 
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
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  No results found for "{search}"
                </div>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-200"
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 px-4 py-3">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Type at least 2 characters to see suggestions
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
