import React from 'react';
import Image from 'next/image';

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function CastList({ cast }: { cast?: CastMember[] }) {
  if (!cast || cast.length === 0) return null;

  const topCast = cast.slice(0, 15); // Show up to 15 major cast members

  return (
    <div className="w-full animate-fadeIn" style={{ animationDelay: '300ms' }}>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-900 to-dark-600 dark:from-white dark:to-dark-300">
          Top Cast
        </h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
        {topCast.map((person) => (
          <div key={person.id} className="min-w-[140px] max-w-[140px] flex-shrink-0 snap-start group cursor-pointer">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-dark-200 dark:bg-dark-800 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-neon-pink/10 group-hover:-translate-y-1">
              {person.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w276_and_h350_face${person.profile_path}`}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dark-400">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
                </div>
              )}
            </div>
            <h3 className="font-bold text-dark-900 dark:text-white text-sm line-clamp-1 group-hover:text-neon-pink transition-colors">
              {person.name}
            </h3>
            <p className="text-dark-500 dark:text-dark-400 text-xs mt-1 line-clamp-2">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
