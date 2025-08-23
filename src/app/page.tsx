import Results from "@/Components/Results";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }: { readonly searchParams: { readonly genre?: string } }) {
  // Check if API key exists
  if (!API_KEY) {
    console.error('API_KEY is not configured');
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
        <p className="text-gray-600">API key is not configured properly.</p>
      </div>
    );
  }

  const genre = searchParams.genre || 'fetchTrending';
  let url = '';
  let mediaType = '';

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
    const apiUrl = `https://api.themoviedb.org/3${url}?api_key=${API_KEY}&language=en-US&page=1`;
    console.log('Fetching from:', apiUrl.replace(API_KEY, 'HIDDEN_API_KEY')); // Log without exposing API key
    
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
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data</div>;
  }
}
