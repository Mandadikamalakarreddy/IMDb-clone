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
      <div className="min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8 text-center">
            <div className="h-10 bg-dark-200 dark:bg-dark-700 rounded-xl w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 bg-dark-100 dark:bg-dark-700 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="h-12 bg-dark-200 dark:bg-dark-700 rounded-full w-64 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-dark-100 dark:bg-dark-800 rounded-2xl animate-pulse">
                <div className="aspect-[2/3] bg-dark-200 dark:bg-dark-700 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-dark-400 dark:text-dark-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2.5 bg-neon-pink hover:bg-neon-pink-light text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
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
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-3">
            🎬 Today&apos;s Picks For You
          </h1>
          <p className="text-base text-dark-400 dark:text-dark-300 max-w-2xl mx-auto">
            Discover today&apos;s handpicked selection of trending movies and TV shows. 
            New picks every day!
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative bg-dark-100 dark:bg-dark-800 p-1.5 rounded-full shadow-lg border border-dark-200/30 dark:border-dark-600/50">
            <div className="flex">
              <button
                onClick={() => setActiveTab('movies')}
                className={`relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'movies'
                    ? 'text-white bg-neon-pink shadow-lg'
                    : 'text-dark-400 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>🎬 Movies ({data?.movies?.length || 0})</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                className={`relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'tv'
                    ? 'text-white bg-neon-pink shadow-lg'
                    : 'text-dark-400 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>📺 TV Shows ({data?.tvShows?.length || 0})</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white">
              {activeTab === 'movies' ? '🍿 Top Movies Today' : '📺 Top TV Shows Today'}
            </h2>
            <div className="text-sm text-dark-400 dark:text-dark-500">
              {currentCount} {activeTab === 'movies' ? 'movies' : 'shows'} selected
            </div>
          </div>

          {currentItems && currentItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentItems.map((item) => (
                <Card key={`${item.type}-${item.id}`} result={convertToCardFormat(item)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-dark-200/50 dark:bg-dark-700/50 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-dark-400 dark:text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                No {activeTab === 'movies' ? 'movies' : 'TV shows'} found
              </h3>
              <p className="text-dark-400 dark:text-dark-500 text-sm">
                Try refreshing the page or check back later for new picks.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 py-6 border-t border-dark-200/30 dark:border-dark-600/50">
          <p className="text-dark-400 dark:text-dark-500 text-xs">
            ✨ Picks are updated daily at midnight • Powered by TMDB
          </p>
        </div>
      </div>
    </div>
  )
}

export default TodaysPicksPage