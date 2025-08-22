import Image from 'next/image';
import React from 'react';
import { MdDateRange } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import Link from 'next/link';

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
  genres: Array<{ id: number; name: string }>;
}

export default async function TVPage({ params }: TVPageProps) {
  const { id: series_id } = params;

  const res = await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch TV series data');
  }

  const tvSeries: TVSeries = await res.json();

  // const backdrop = tvSeries.backdrop_path ? `https://image.tmdb.org/t/p/original${tvSeries.backdrop_path}` : '';
  const poster = tvSeries.poster_path ? `https://image.tmdb.org/t/p/w500${tvSeries.poster_path}` : '';
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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      // style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      <section className="text-gray-200 body-font mx-auto max-w-screen-xl px-5 py-24 relative z-10">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <IoArrowBack className="mr-2 text-xl" />
            Back to Home
          </Link>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center lg:items-start gap-8">
          <div className="lg:max-w-md lg:w-full md:w-1/2 w-full mb-10 md:mb-0">
            <Image
              src={poster}
              // src={poster || backdrop}
              className="object-cover object-center rounded-2xl shadow-2xl"
              alt={title}
              width={500}
              height={750}
              priority
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="mb-6">
              {tvSeries.genres && tvSeries.genres.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {tvSeries.genres.slice(0, 4).map((genre) => (
                    <span 
                      key={genre.id} 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <span 
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-md transition-shadow duration-300 ${
                  tvSeries.status === 'Ended' ? 'bg-gradient-to-r from-red-600 to-red-800 text-white' :
                  tvSeries.status === 'Returning Series' ? 'bg-gradient-to-r from-green-600 to-green-800 text-white' :
                  'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
                }`}
              >
                {tvSeries.status}
              </span>
            </div>
            
            <h1 className="title-font sm:text-5xl text-4xl mb-6 font-extrabold text-white leading-tight drop-shadow-lg">
              {title}
            </h1>
            
            <div className="flex items-center mb-8 space-x-6">
              <div className="flex items-center ">
                <div className='bg-slate-600 bg-opacity-50 p-2 rounded-lg flex items-center flex-row'>
                  <FaStar className="text-yellow-400 text-2xl mr-2" />
                <span className={`text-2xl font-extrabold ${
                  parseFloat(stars) >= 8 ? 'text-green-400' :
                  parseFloat(stars) >= 6 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {stars}
                </span>
                </div>
                <span className="text-gray-300 text-base ml-2">
                  ({tvSeries.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-gray-300 text-xl font-medium">
                {new Date(tvSeries.first_air_date).getFullYear()}
              </span>
            </div>
            
            <p className="mb-10 leading-relaxed text-gray-300 text-xl max-w-2xl">
              {tvSeries.overview}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-10">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                <MdDateRange className="text-3xl text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">First Aired</p>
                <p className="font-bold text-white text-lg">
                  {new Date(tvSeries.first_air_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                <BiSolidCameraMovie className="text-3xl text-purple-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Seasons</p>
                <p className="font-bold text-white text-lg">
                  {tvSeries.number_of_seasons}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                <BiSolidCameraMovie className="text-3xl text-green-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Episodes</p>
                <p className="font-bold text-white text-lg">
                  {tvSeries.number_of_episodes}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                <PiTimerFill className="text-3xl text-orange-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Runtime</p>
                <p className="font-bold text-white text-lg">
                  {runtime !== 'N/A' ? `${runtime} min` : 'Varies'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                <AiTwotoneLike className="text-3xl text-red-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Votes</p>
                <p className="font-bold text-white text-lg">
                  {tvSeries.vote_count.toLocaleString()}
                </p>
              </div>
              
              {tvSeries.last_air_date && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-xl text-center ">
                  <MdDateRange className="text-3xl text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 uppercase font-semibold">Last Aired</p>
                  <p className="font-bold text-white text-lg">
                    {new Date(tvSeries.last_air_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-10 w-full max-w-4xl">
              {TrailerVideo?.key ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {TrailerVideo.name || 'Trailer'}
                  </h3>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${TrailerVideo.key}?rel=0&modestbranding=1&playsinline=1`}
                      title={TrailerVideo.name || 'TV Series Trailer'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3 capitalize">
                    {TrailerVideo.type} • Published {new Date(TrailerVideo.published_at).getFullYear()}
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center shadow-2xl">
                  <div className="text-gray-500 mb-3">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">No trailer available</p>
                  <p className="text-sm text-gray-400 mt-2">Check back later for updates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}