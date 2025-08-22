"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { MdDateRange } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

interface TVPageProps {
  params: {
    id: string;
  };
}

interface TVSeries {
  backdrop_path: string;
  poster_path: string;
  original_name: string;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  vote_count: number;
  vote_average: number;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  status: string;
}

export default async function TVPage({ params }: TVPageProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const { id: series_id } = params;

  const res = await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch TV series data');
  }

  const tvSeries: TVSeries = await res.json();

  const image = tvSeries.backdrop_path || tvSeries.poster_path;
  const title = tvSeries.original_name || tvSeries.name;
  const stars = tvSeries.vote_average?.toFixed(1) ?? 'N/A';
  const runtime = tvSeries.episode_run_time?.[0] || 'N/A';

  // Fetch trailer video with better selection logic
  const videoEndpoint = `tv/${series_id}/videos`;
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
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                tvSeries.status === 'Ended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                tvSeries.status === 'Returning Series' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {tvSeries.status}
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
                  ({tvSeries.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(tvSeries.first_air_date).getFullYear()}
              </span>
            </div>
            
            <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
              {tvSeries.overview}
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <MdDateRange className="text-2xl text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">First Aired</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {new Date(tvSeries.first_air_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <BiSolidCameraMovie className="text-2xl text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Seasons</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {tvSeries.number_of_seasons}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <BiSolidCameraMovie className="text-2xl text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Episodes</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {tvSeries.number_of_episodes}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <PiTimerFill className="text-2xl text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Runtime</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {runtime !== 'N/A' ? `${runtime} min` : 'Varies'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                <AiTwotoneLike className="text-2xl text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Votes</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {tvSeries.vote_count.toLocaleString()}
                </p>
              </div>
              
              {tvSeries.last_air_date && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                  <MdDateRange className="text-2xl text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">Last Aired</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {new Date(tvSeries.last_air_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
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
                      title={TrailerVideo.name || 'TV Series Trailer'}
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
