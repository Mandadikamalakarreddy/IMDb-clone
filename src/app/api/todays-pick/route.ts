import { NextResponse } from 'next/server';

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  backdrop_path: string | null;
}

interface TMDBTVShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  backdrop_path: string | null;
}

interface TodaysPickResult {
  movies: Array<{
    id: number;
    title: string;
    type: 'movie';
    year: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
    backdrop_path: string | null;
  }>;
  tvShows: Array<{
    id: number;
    title: string;
    type: 'tv';
    year: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
    backdrop_path: string | null;
  }>;
}

function getDailySeed(): number {
  // Create a seed based on current date to ensure daily changes
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed + dateString.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(seed);
}

function getTopFiveFromArray<T>(array: T[], seed: number): T[] {
  // Use seeded random to shuffle array and pick top 5
  const shuffled = [...array];
  let currentSeed = seed;
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate seeded random number
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const randomIndex = Math.floor((currentSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  return shuffled.slice(0, 5);
}

export async function GET() {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error('TMDB API key not found');
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    const seed = getDailySeed();
    
    // Fetch trending movies and TV shows
    const [movieRes, tvRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`,
        { next: { revalidate: 86400 } } // Cache for 24 hours (daily refresh)
      ),
      fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US`,
        { next: { revalidate: 86400 } } // Cache for 24 hours (daily refresh)
      )
    ]);

    if (!movieRes.ok || !tvRes.ok) {
      throw new Error('Failed to fetch data from TMDB');
    }

    const movieData = await movieRes.json();
    const tvData = await tvRes.json();

    if (!movieData.results?.length || !tvData.results?.length) {
      throw new Error('No trending content found');
    }

    // Pick top 5 movies and TV shows for today using seeded random
    const selectedMovies: TMDBMovie[] = getTopFiveFromArray(movieData.results, seed);
    const selectedTVShows: TMDBTVShow[] = getTopFiveFromArray(tvData.results, seed + 1000); // Different seed for TV

    const result: TodaysPickResult = {
      movies: selectedMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        type: 'movie' as const,
        year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        backdrop_path: movie.backdrop_path
      })),
      tvShows: selectedTVShows.map((show) => ({
        id: show.id,
        title: show.name,
        type: 'tv' as const,
        year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : '',
        poster_path: show.poster_path,
        overview: show.overview,
        vote_average: show.vote_average,
        backdrop_path: show.backdrop_path
      }))
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching today\'s picks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch today\'s picks' },
      { status: 500 }
    );
  }
}
