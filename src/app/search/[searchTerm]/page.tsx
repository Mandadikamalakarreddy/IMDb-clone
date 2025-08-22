import Results from "@/Components/Results";
import React from "react";

interface SearchPageProps {
  params: {
    searchTerm: string;
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchTerm = decodeURIComponent(params.searchTerm);

  try {
    // Search for movies
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${encodeURIComponent(searchTerm)}&language=en-US&page=1&include_adult=false`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    // Search for TV shows  
    const tvRes = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${encodeURIComponent(searchTerm)}&language=en-US&page=1&include_adult=false`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!movieRes.ok && !tvRes.ok) {
      throw new Error('Failed to fetch search results');
    }

    const movieData = movieRes.ok ? await movieRes.json() : { results: [] };
    const tvData = tvRes.ok ? await tvRes.json() : { results: [] };

    // Combine results
    const results = [
      ...movieData.results.map((item: any) => ({ ...item, media_type: 'movie' })),
      ...tvData.results.map((item: any) => ({ ...item, media_type: 'tv' }))
    ];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="px-3">
          <h1 className="text-2xl font-bold mb-6 text-amber-600">
            Search Results for &ldquo;{searchTerm}&rdquo;
          </h1>
          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No results found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <Results results={results} />
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="max-w-6xl mx-auto px-3 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Search Error</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Something went wrong while searching for &ldquo;{searchTerm}&rdquo;.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
