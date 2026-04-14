const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  genre_ids?: number[];
}

export interface TMDBResponse {
  page: number;
  results: TMDBResult[];
  total_pages: number;
  total_results: number;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

const fetchFromTMDB = async (endpoint: string, params: Record<string, string> = {}, revalidate: number = 3600) => {
  if (!API_KEY) {
    console.warn('TMDB API Key is missing. Returning empty result.');
    return null;
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const res = await fetch(url.toString(), { next: { revalidate } });
    if (!res.ok) {
      console.error(`TMDB API Error: ${res.status} - ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export const tmdb = {
  getMoviesList: async (type: 'popular' | 'top_rated' | 'upcoming', page = 1): Promise<TMDBResponse> => {
    const data = await fetchFromTMDB(`/movie/${type}`, { page: page.toString() });
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  },
  
  getTvList: async (type: 'popular' | 'top_rated' | 'on_the_air', page = 1): Promise<TMDBResponse> => {
    const data = await fetchFromTMDB(`/tv/${type}`, { page: page.toString() });
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  },

  discoverMovies: async (genreId?: string, page = 1): Promise<TMDBResponse> => {
    const params: Record<string, string> = { page: page.toString(), sort_by: 'popularity.desc' };
    if (genreId) params.with_genres = genreId;
    const data = await fetchFromTMDB('/discover/movie', params);
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  },

  discoverTv: async (genreId?: string, page = 1): Promise<TMDBResponse> => {
    const params: Record<string, string> = { page: page.toString(), sort_by: 'popularity.desc' };
    if (genreId) params.with_genres = genreId;
    const data = await fetchFromTMDB('/discover/tv', params);
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  },

  getTrending: async (mediaType: 'movie' | 'tv' | 'all' = 'all', timeWindow: 'day' | 'week' = 'week', page = 1): Promise<TMDBResponse> => {
    const data = await fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`, { page: page.toString() });
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  },

  getDetails: async (mediaType: 'movie' | 'tv', id: string | number) => {
    // 🔥 Advanced API Optimization 🔥
    // Fetch details, trailers, cast/crew, recommendations, similar titles, and reviews in ONE single round trip.!
    const data = await fetchFromTMDB(`/${mediaType}/${id}`, {
      append_to_response: 'videos,credits,recommendations,similar,reviews'
    }, 86400); // Cache deeply for 24h as these rarely change aggressively 
    return data;
  },

  getVideos: async (mediaType: 'movie' | 'tv', id: string | number): Promise<VideoResult[]> => {
    const data = await fetchFromTMDB(`/${mediaType}/${id}/videos`, {}, 86400);
    return data?.results || [];
  },

  search: async (query: string, page = 1): Promise<TMDBResponse> => {
    const data = await fetchFromTMDB('/search/multi', { query, page: page.toString(), include_adult: 'false' });
    return data || { page, results: [], total_pages: 0, total_results: 0 };
  }
};
