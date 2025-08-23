import Results from "@/Components/Results";
import GenreSelectorWrapper from "@/Components/GenreSelectorWrapper";

const API_KEY = process.env.API_KEY;

interface Genre {
  id: number;
  name: string;
}

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
];

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
];

// Fetch genres from TMDB API
async function fetchGenres(type: 'movie' | 'tv' = 'movie'): Promise<Genre[]> {
  try {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url, { 
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }
    
    const data = await res.json();
    return data.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    // Return fallback genres based on type
    return type === 'movie' ? movieGenres : tvGenres;
  }
}

export default async function GenresPage({ 
  searchParams 
}: { 
  readonly searchParams: { readonly genre?: string; readonly type?: string } 
}) {
  // Check if API key exists
  if (!API_KEY) {
    console.error('API_KEY is not configured');
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <GenreSelectorWrapper />
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-600">API key is not configured properly.</p>
        </div>
      </div>
    );
  }

  const selectedGenreId = searchParams.genre || '28'; 
  const contentType = searchParams.type || 'movie'; 
  
  // Get the appropriate genre list
  const genres = contentType === 'movie' ? movieGenres : tvGenres;
  const selectedGenre = genres.find(g => g.id.toString() === selectedGenreId);
  const genreName = selectedGenre ? selectedGenre.name : (contentType === 'movie' ? 'Action' : 'Action & Adventure');

  let url = '';
  if (contentType === 'tv') {
    url = `/discover/tv?with_genres=${selectedGenreId}&sort_by=popularity.desc`;
  } else {
    url = `/discover/movie?with_genres=${selectedGenreId}&sort_by=popularity.desc`;
  }

  try {
    const res = await fetch(`https://api.themoviedb.org/3${url}&api_key=${API_KEY}&language=en-US&page=1`, { 
      next: { revalidate: 3600 } 
    });
    const data = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch data:', res.statusText);
      throw new Error('Failed to fetch data');
    }

    // Add media_type to results based on contentType
    const results = data.results.map((item: any) => ({ 
      ...item, 
      media_type: contentType 
    }));

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <GenreSelectorWrapper />
        
        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-8 py-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className={`w-3 h-3 rounded-full ${contentType === 'movie' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {results.length} Popular {genreName} {contentType === 'tv' ? 'TV Shows' : 'Movies'}
              </h2>
            </div>
          </div>
          
          {/* Results Grid */}
          <div className="relative">
            {/* Decorative gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${
              contentType === 'movie' 
                ? 'from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10' 
                : 'from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10'
            } rounded-3xl`}></div>
            
            <div className="relative z-10 p-6">
              <Results results={results} />
            </div>
          </div>
          
          {/* Load More Section */}
          {results.length > 0 && (
            <div className="text-center mt-12">
              <div className="bg-white dark:bg-gray-800 inline-block px-8 py-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Showing the most popular results
                </p>
                <div className={`text-sm font-medium ${
                  contentType === 'movie' ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {contentType === 'movie' ? '🎬' : '📺'} {genreName} Collection
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <GenreSelectorWrapper />
        
        {/* Error Section */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12">
            <div className="text-6xl mb-6">😞</div>
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We couldn&apos;t load the {contentType === 'tv' ? 'TV shows' : 'movies'} right now.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <p className="text-red-500 dark:text-red-300 font-medium">
                Please check your internet connection and try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}