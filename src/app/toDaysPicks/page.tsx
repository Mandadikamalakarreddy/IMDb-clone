"use client"
import React, { useState, useEffect } from 'react'
import Card from '@/Components/Card'

interface MovieItem {
  id: number
  title: string
  type: 'movie'
  year: string
  poster_path: string | null
  overview: string
  vote_average: number
  backdrop_path: string | null
}

interface TVShowItem {
  id: number
  title: string
  type: 'tv'
  year: string
  poster_path: string | null
  overview: string
  vote_average: number
  backdrop_path: string | null
}

interface TodaysPicksData {
  movies: MovieItem[]
  tvShows: TVShowItem[]
}

const convertToCardFormat = (item: MovieItem | TVShowItem) => ({
  id: item.id,
  poster_path: item.poster_path || undefined,
  title: item.type === 'movie' ? item.title : undefined,
  name: item.type === 'tv' ? item.title : undefined,
  overview: item.overview,
  release_date: item.type === 'movie' ? `${item.year}-01-01` : undefined,
  first_air_date: item.type === 'tv' ? `${item.year}-01-01` : undefined,
  vote_average: item.vote_average
})

const TodaysPicksPage = () => {
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies')
  const [data, setData] = useState<TodaysPicksData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodaysPicks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/todays-pick')
        if (!response.ok) {
          throw new Error('Failed to fetch today\'s picks')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTodaysPicks()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-64 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse">
                <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const currentItems = activeTab === 'movies' ? data?.movies : data?.tvShows
  const currentCount = currentItems?.length || 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎬 Today's Picks For You
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover today's handpicked selection of trending movies and TV shows, curated just for you. 
            New picks every day!
          </p>
        </div>

        <div className="flex justify-center mb-12 ">
          <div className="relative bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
            <div className="flex">
              <button
                onClick={() => setActiveTab('movies')}
                className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'movies'
                    ? 'text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
                  </svg>
                  <span>Movies ({data?.movies?.length || 0})</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'tv'
                    ? 'text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>TV Shows ({data?.tvShows?.length || 0})</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeTab === 'movies' ? '🍿 Top Movies Today' : '📺 Top TV Shows Today'}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentCount} {activeTab === 'movies' ? 'movies' : 'shows'} selected
            </div>
          </div>

          {currentItems && currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {currentItems.map((item) => (
                <Card key={`${item.type}-${item.id}`} result={convertToCardFormat(item)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No {activeTab === 'movies' ? 'movies' : 'TV shows'} found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try refreshing the page or check back later for new picks.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ✨ Picks are updated daily at midnight • Powered by The Movie Database (TMDB)
          </p>
        </div>
      </div>
    </div>
  )
}

export default TodaysPicksPage