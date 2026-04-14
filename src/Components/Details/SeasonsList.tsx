import React from 'react';
import Image from 'next/image';

interface Season {
  id: number;
  name: string;
  episode_count: number;
  season_number: number;
  air_date: string | null;
  poster_path: string | null;
  overview: string;
}

export default function SeasonsList({ seasons }: { seasons?: Season[] }) {
  if (!seasons || seasons.length === 0) return null;

  // Render valid seasons usually omitting specials if needed, but here we just render all cleanly.
  return (
    <div className="w-full mt-16 animate-fadeIn" style={{ animationDelay: '600ms' }}>
      <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-900 to-dark-600 dark:from-white dark:to-dark-300 mb-8">
        Seasons
      </h2>
      
      <div className="flex flex-col gap-4">
        {seasons.map((season) => (
          <div key={season.id} className="flex flex-col sm:flex-row gap-5 bg-dark-50 dark:bg-dark-800/50 p-4 rounded-3xl border border-dark-200/50 dark:border-dark-700/50 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors duration-300">
            {/* Season Poster */}
            <div className="relative w-32 sm:w-40 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0 bg-dark-200 dark:bg-dark-700 shadow-md">
              {season.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                  alt={season.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-dark-400 p-2 text-center">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  <span className="text-xs font-semibold uppercase">{season.name}</span>
                </div>
              )}
            </div>

            {/* Season Info */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                  {season.name}
                </h3>
                <span className="px-2.5 py-1 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-md text-xs font-bold uppercase">
                  {season.episode_count} Episodes
                </span>
              </div>
              
              {season.air_date && (
                <p className="text-sm text-dark-500 font-medium mb-3">
                  Premiered {new Date(season.air_date).getFullYear()}
                </p>
              )}

              {season.overview ? (
                <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed line-clamp-3">
                  {season.overview}
                </p>
              ) : (
                <p className="text-dark-400 italic text-sm">
                  Season overview not available.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
