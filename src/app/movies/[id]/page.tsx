import Image from 'next/image';
import React from 'react';
import { MdDateRange } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import Link from 'next/link';

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

  // const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
  const title = movie.original_title || movie.title;
  const stars = movie.vote_average?.toFixed(1) ?? 'N/A';

  const videoEndpoint = `movie/${movieId}/videos`;
  const video = await fetch(`https://api.themoviedb.org/3/${videoEndpoint}?api_key=${process.env.API_KEY}&language=en-US`);
  const videosData = await video.json();
  
  let TrailerVideo;
  if (videosData && videosData.results && videosData.results.length > 0) {
    TrailerVideo = 
      videosData.results.find((video: any) => video.type === "Trailer" && video.official) ||
      videosData.results.find((video: any) => video.type === "Trailer") ||
      videosData.results.find((video: any) => video.type === "Teaser" && video.official) ||
      videosData.results.find((video: any) => video.type === "Teaser") ||
      videosData.results[0]; 
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
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {movie.genres.slice(0, 4).map((genre) => (
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
                  movie.status === 'Released' ? 'bg-gradient-to-r from-green-600 to-green-800 text-white' :
                  movie.status === 'Post Production' ? 'bg-gradient-to-r from-orange-600 to-orange-800 text-white' :
                  'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
                }`}
              >
                {movie.status || 'Released'}
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
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-gray-300 text-xl font-medium">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            
            <p className="mb-10 leading-relaxed text-gray-300 text-xl max-w-2xl">
              {movie.overview}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
              <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-5 rounded-2xl shadow-xl text-center">
                <MdDateRange className="text-3xl text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Release Date</p>
                <p className="font-bold text-white text-lg">
                  {new Date(movie.release_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-5 rounded-2xl shadow-xl text-center  ">
                <PiTimerFill className="text-3xl text-orange-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Runtime</p>
                <p className="font-bold text-white text-lg">
                  {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-5 rounded-2xl shadow-xl text-center">
                <AiTwotoneLike className="text-3xl text-red-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 uppercase font-semibold">Votes</p>
                <p className="font-bold text-white text-lg">
                  {movie.vote_count.toLocaleString()}
                </p>
              </div>
              
              {movie.budget > 0 && (
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-5 rounded-2xl shadow-xl text-center">
                  <BiSolidMoviePlay className="text-3xl text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 uppercase font-semibold">Budget</p>
                  <p className="font-bold text-white text-lg">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-5 rounded-2xl shadow-xl text-center">
                  <BiSolidMoviePlay className="text-3xl text-purple-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 uppercase font-semibold">Revenue</p>
                  <p className="font-bold text-white text-lg">
                    ${(movie.revenue / 1000000).toFixed(1)}M
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
                      title={TrailerVideo.name || 'Movie Trailer'}
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