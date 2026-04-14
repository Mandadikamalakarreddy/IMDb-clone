import Results from "@/Components/Results";
import Link from "next/link";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }: { readonly searchParams: { readonly genre?: string; readonly page?: string } }) {
  // Check if API key exists
  if (!API_KEY) {
    console.error('API_KEY is not configured');
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-400 mb-2">Configuration Error</h1>
        <p className="text-dark-400 dark:text-dark-500">API key is not configured properly.</p>
      </div>
    );
  }

  const genre = searchParams.genre || 'fetchTrending';
  let url = '';
  let mediaType = '';
  const currentPage = Number(searchParams.page) || 1;

  switch (genre) {
    case 'fetchTopRated':
      url = `/movie/top_rated`;
      mediaType = 'movie';
      break;
    case 'fetchTrending':
      url = `/trending/all/week`;
      mediaType = 'mixed'; 
      break;
    case 'movies':
      url = `/discover/movie`;
      mediaType = 'movie';
      break;
    case 'TvSeries':
      url = `/discover/tv`;
      mediaType = 'tv';
      break;
    default:
      url = `/trending/all/week`;
      mediaType = 'mixed';
  }

  try {
    const apiUrl = `https://api.themoviedb.org/3${url}?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
    console.log('Fetching from:', apiUrl.replace(API_KEY, 'HIDDEN_API_KEY'));
    
    const res = await fetch(apiUrl, { 
      next: { revalidate: 10000 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('API request failed:', {
        status: res.status,
        statusText: res.statusText,
        url: apiUrl.replace(API_KEY, 'HIDDEN_API_KEY')
      });
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    let results = data.results;
    const totalPages = Math.min(data.total_pages, 500);
    
    // Add media_type if not already present
    if (mediaType !== 'mixed') {
      results = results.map((item: any) => ({ 
        ...item, 
        media_type: mediaType 
      }));
    }

    return (
      <div>
        <Results results={results} />
        
        {/* Pagination Controls - Only show for movies and TV series filters */}
        {(genre === 'movies' || genre === 'TvSeries') && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-center items-center gap-4">
              {currentPage > 1 ? (
                <Link 
                  href={`/?genre=${genre}&page=${currentPage - 1}`}
                  className={`px-6 py-2 bg-dark-800 text-white font-semibold rounded-lg border border-dark-600 transition-all ${
                    genre === 'movies' 
                      ? 'hover:bg-neon-pink hover:text-white' 
                      : 'hover:bg-neon-cyan hover:text-dark-900'
                  }`}
                >
                  Previous
                </Link>
              ) : (
                <span className="px-6 py-2 bg-dark-800/50 text-dark-500 font-semibold rounded-lg border border-dark-700 cursor-not-allowed">
                  Previous
                </span>
              )}
              
              <span className="text-dark-300 font-medium">Page {currentPage} of {totalPages}</span>

              {currentPage < totalPages ? (
                <Link 
                  href={`/?genre=${genre}&page=${currentPage + 1}`}
                  className={`px-6 py-2 bg-dark-800 text-white font-semibold rounded-lg border border-dark-600 transition-all ${
                    genre === 'movies' 
                      ? 'hover:bg-neon-pink hover:text-white' 
                      : 'hover:bg-neon-cyan hover:text-dark-900'
                  }`}
                >
                  Next
                </Link>
              ) : (
                <span className="px-6 py-2 bg-dark-800/50 text-dark-500 font-semibold rounded-lg border border-dark-700 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Something went wrong</h1>
        <p className="text-dark-400 dark:text-dark-500">Failed to load content. Please try again.</p>
      </div>
    );
  }
}
