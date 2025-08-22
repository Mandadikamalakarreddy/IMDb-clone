

import Image from 'next/image';
import React from 'react';
import { MdDateRange } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";

interface MoviePageProps {
  params: {
    id: string;
  };
}

interface Movie {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  title: string;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  genres: Array<{ id: number; name: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = params;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const movie: Movie = await res.json();

  const image = movie.backdrop_path || movie.poster_path;
  const title = movie.original_title || movie.title;
  const stars = movie.vote_average?.toFixed(1) ?? 'N/A';

  // Fetch trailer video with better selection logic
  const videoEndpoint = `movie/${movieId}/videos`;
  const video = await fetch(`https://api.themoviedb.org/3/${videoEndpoint}?api_key=${process.env.API_KEY}&language=en-US`);
  const videosData = await video.json();
  
  let TrailerVideo;
  if (videosData && videosData.results && videosData.results.length > 0) {
    // Priority order: Official Trailer > Trailer > Teaser > Any video
    TrailerVideo = 
      videosData.results.find((video: any) => video.type === "Trailer" && video.official) ||
      videosData.results.find((video: any) => video.type === "Trailer") ||
      videosData.results.find((video: any) => video.type === "Teaser" && video.official) ||
      videosData.results.find((video: any) => video.type === "Teaser") ||
      videosData.results[0]; // Fallback to first available video
  }

  return (
    <div className="min-h-screen bg-cover bg-center">
      <section className="text-gray-800 dark:text-gray-200 body-font mx-auto max-w-screen-xl px-5 py-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center lg:items-start">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              src={`https://image.tmdb.org/t/p/original${image}`}
              className="object-cover object-center rounded-xl shadow-lg"
              alt={title}
              width={500}
              height={300}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="mb-4">
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.slice(0, 3).map((genre) => (
                    <span key={genre.id} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                movie.status === 'Released' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                movie.status === 'Post Production' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {movie.status || 'Released'}
              </span>
            </div>
            
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {title}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-6">
                <FaStar className="text-yellow-400 mr-1" />
                <span className={`text-xl font-bold ${
                  parseFloat(stars) >= 8 ? 'text-green-500' :
                  parseFloat(stars) >= 6 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {stars}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            
            <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
              {movie.overview}
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <MdDateRange className="text-2xl text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Release Date</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {new Date(movie.release_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <PiTimerFill className="text-2xl text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Runtime</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <AiTwotoneLike className="text-2xl text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Votes</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {movie.vote_count.toLocaleString()}
                </p>
              </div>
              
              {movie.budget > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                  <BiSolidMoviePlay className="text-2xl text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Budget</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                  <BiSolidMoviePlay className="text-2xl text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Revenue</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    ${(movie.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 w-full">
              {TrailerVideo?.key ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {TrailerVideo.name || 'Trailer'}
                  </h3>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${TrailerVideo.key}?rel=0&modestbranding=1&playsinline=1`}
                      title={TrailerVideo.name || 'Movie Trailer'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
                    {TrailerVideo.type} • Published {new Date(TrailerVideo.published_at).getFullYear()}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">No trailer available</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Check back later for updates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}