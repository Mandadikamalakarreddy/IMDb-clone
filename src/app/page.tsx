import Results from "@/Components/Results";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }: { readonly searchParams: { readonly genre?: string } }) {
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
    const res = await fetch(`https://api.themoviedb.org/3${url}?api_key=${API_KEY}&language=en-US&page=1`, { next: { revalidate: 10000 } });
    const data = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch data:', res.statusText);
      throw new Error('Failed to fetch data');
    }

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
