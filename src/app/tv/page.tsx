import React from 'react';
import { tmdb } from '@/lib/tmdb-api';
import Card from '@/Components/Card';
import Link from 'next/link';

export const revalidate = 3600;

interface SearchParams {
  page?: string;
  sort?: 'popular' | 'top_rated' | 'on_the_air';
}

export const metadata = {
  title: 'TV Shows | IMDb Clone',
  description: 'Browse the latest and greatest TV shows.',
};

export default async function TVPage({ searchParams }: { searchParams: SearchParams }) {
  const rawPage = Number(searchParams.page) || 1;
  const currentPage = Math.max(1, rawPage);
  const sort = searchParams.sort || 'popular';
  
  const data = await tmdb.getTvList(sort as any, currentPage);
  const totalPages = Math.min(data.total_pages, 500); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-pink">
          Explore TV Shows
        </h1>
        
        <div className="flex gap-2 bg-dark-800 p-1 rounded-xl border border-dark-600">
          <Link 
            href="?sort=popular" 
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${sort === 'popular' ? 'bg-neon-cyan text-dark-900' : 'text-dark-300 hover:text-white hover:bg-dark-700'}`}
          >
            Popular
          </Link>
          <Link 
            href="?sort=top_rated" 
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${sort === 'top_rated' ? 'bg-neon-cyan text-dark-900' : 'text-dark-300 hover:text-white hover:bg-dark-700'}`}
          >
            Top Rated
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.results.map((show) => (
          <Card key={show.id} result={{...show, name: show.name, overview: show.overview}} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        {currentPage > 1 ? (
          <Link 
            href={`?sort=${sort}&page=${currentPage - 1}`}
            className="px-6 py-2 bg-dark-800 text-white font-semibold rounded-lg hover:bg-neon-cyan hover:text-dark-900 border border-dark-600"
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
            href={`?sort=${sort}&page=${currentPage + 1}`}
            className="px-6 py-2 bg-dark-800 text-white font-semibold rounded-lg hover:bg-neon-cyan hover:text-dark-900 border border-dark-600"
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
  );
}
