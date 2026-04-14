import React from 'react';
import Card from '@/Components/Card';

interface MediaScrollProps {
  title: string;
  items: Array<any>;
}

export default function MediaScroll({ title, items }: MediaScrollProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full mt-16 animate-fadeIn" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-900 to-dark-600 dark:from-white dark:to-dark-300">
          {title}
        </h2>
      </div>
      
      <div className="flex gap-5 overflow-x-auto pb-8 no-scrollbar snap-x">
        {items.slice(0, 15).map((item) => (
          <div key={item.id} className="min-w-[180px] sm:min-w-[220px] max-w-[220px] flex-shrink-0 snap-start">
            <Card result={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
