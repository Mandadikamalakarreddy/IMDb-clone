import React from 'react';
import { tmdb } from '@/lib/tmdb-api';
import HeroSection from '@/Components/Details/HeroSection';
import CastList from '@/Components/Details/CastList';
import MediaScroll from '@/Components/Details/MediaScroll';
import ReviewList from '@/Components/Details/ReviewList';

export const revalidate = 86400;

export default async function MoviePage({ params }: { params: { id: string } }) {
  // Master Fetch: Details + Credits + Videos + Similar + Recommendations + Reviews in 1 API call! 
  const detailData = await tmdb.getDetails('movie', params.id);

  if (!detailData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Movie not found or API error.
      </div>
    );
  }

  // Parse extracted data automatically via append_to_response
  const trailerKey = detailData.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')?.key;
  const cast = detailData.credits?.cast;
  const reviews = detailData.reviews?.results;
  const recommendations = detailData.recommendations?.results;
  const similar = detailData.similar?.results;

  // Format runtime
  const runtimeStr = detailData.runtime ? `${Math.floor(detailData.runtime / 60)}h ${detailData.runtime % 60}m` : undefined;
  const releaseYear = detailData.release_date ? new Date(detailData.release_date).getFullYear().toString() : undefined;

  const heroData = {
    title: detailData.title || detailData.original_title,
    backdrop_path: detailData.backdrop_path,
    poster_path: detailData.poster_path,
    overview: detailData.overview,
    vote_average: detailData.vote_average,
    vote_count: detailData.vote_count,
    tagline: detailData.tagline,
    genres: detailData.genres,
    runtimeStr,
    releaseYear,
    status: detailData.status,
    trailerKey
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pb-20">
      <HeroSection data={heroData} />
      
      <div className="max-w-7xl mx-auto px-5 mt-12 flex flex-col gap-12">
        <CastList cast={cast} />
        <ReviewList reviews={reviews} />
        <MediaScroll title="More Like This" items={similar} />
        <MediaScroll title="Recommended For You" items={recommendations} />
      </div>
    </div>
  );
}