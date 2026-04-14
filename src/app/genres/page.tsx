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

export default async function GenresPage({ 
  searchParams 
}: { 
  readonly searchParams: { readonly genre?: string; readonly type?: string } 
}) {
  // Check if API key exists
  if (!API_KEY) {
    return (
      <div className="min-h-screen">
        <GenreSelectorWrapper />
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-dark-400 dark:text-dark-500">API key is not configured properly.</p>
        </div>
      </div>
    );
  }

  const selectedGenreId = searchParams.genre || '28'; 
  const contentType = searchParams.type || 'movie'; 
  
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
      throw new Error('Failed to fetch data');
    }

    const results = data.results.map((item: any) => ({ 
      ...item, 
      media_type: contentType 
    }));

    return (
      <div className="min-h-screen">
        <GenreSelectorWrapper />
        
        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-dark-100/50 dark:bg-dark-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-dark-200/30 dark:border-dark-600/50">
              <div className={`w-2.5 h-2.5 rounded-full ${contentType === 'movie' ? 'bg-neon-pink' : 'bg-neon-cyan'}`}></div>
              <h2 className="text-lg font-bold text-dark-900 dark:text-white">
                {results.length} Popular {genreName} {contentType === 'tv' ? 'TV Shows' : 'Movies'}
              </h2>
            </div>
          </div>
          
          {/* Results Grid */}
          <Results results={results} />
          
          {/* Footer */}
          {results.length > 0 && (
            <div className="text-center mt-10">
              <div className="inline-block px-6 py-3 bg-dark-100/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-200/30 dark:border-dark-600/50">
                <p className="text-dark-400 dark:text-dark-500 text-sm">
                  Showing the most popular results
                </p>
                <div className={`text-xs font-semibold mt-1 ${
                  contentType === 'movie' ? 'text-neon-pink' : 'text-neon-cyan'
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
    return (
      <div className="min-h-screen">
        <GenreSelectorWrapper />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-dark-100/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-3xl border border-dark-200/30 dark:border-dark-600/50 p-12">
            <div className="text-5xl mb-6">😞</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-dark-400 dark:text-dark-300 mb-6">
              We couldn&apos;t load the {contentType === 'tv' ? 'TV shows' : 'movies'} right now.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
              <p className="text-red-400 text-sm font-medium">
                Please check your internet connection and try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}