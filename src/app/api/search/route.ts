import { NextRequest, NextResponse } from 'next/server'

interface TMDBMovie {
  id: number
  title: string
  release_date: string
  poster_path: string | null
  overview: string
}

interface TMDBTVShow {
  id: number
  name: string
  first_air_date: string
  poster_path: string | null
  overview: string
}

interface SearchResult {
  id: string
  title: string
  type: 'movie' | 'tv'
  year?: string
  poster_path?: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }

  const API_KEY = process.env.API_KEY
  if (!API_KEY) {
    console.error('TMDB API key not found in environment variables')
    return NextResponse.json({ 
      error: 'API configuration error',
      results: [] 
    }, { status: 500 })
  }

  try {
    // Search for movies and TV shows in parallel
    const [movieRes, tvRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      )
    ])

    const results: SearchResult[] = []

    // Process movie results
    if (movieRes.ok) {
      const movieData = await movieRes.json()
      const movies: SearchResult[] = movieData.results
        .slice(0, 4) // Limit to 4 movies
        .map((movie: TMDBMovie) => ({
          id: movie.id.toString(),
          title: movie.title,
          type: 'movie' as const,
          year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : undefined,
          poster_path: movie.poster_path
        }))
      results.push(...movies)
    }

    // Process TV show results
    if (tvRes.ok) {
      const tvData = await tvRes.json()
      const tvShows: SearchResult[] = tvData.results
        .slice(0, 4) // Limit to 4 TV shows
        .map((show: TMDBTVShow) => ({
          id: show.id.toString(),
          title: show.name,
          type: 'tv' as const,
          year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : undefined,
          poster_path: show.poster_path
        }))
      results.push(...tvShows)
    }

    // Sort results by relevance (you can customize this logic)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      const searchTerm = query.toLowerCase()
      
      // Prioritize exact matches
      if (aTitle === searchTerm && bTitle !== searchTerm) return -1
      if (bTitle === searchTerm && aTitle !== searchTerm) return 1
      
      // Then prioritize titles that start with the search term
      if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1
      if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm)) return 1
      
      return 0
    })

    return NextResponse.json({
      results: sortedResults.slice(0, 8) // Limit to 8 total results
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ 
      results: [],
      error: 'Search failed'
    })
  }
}
