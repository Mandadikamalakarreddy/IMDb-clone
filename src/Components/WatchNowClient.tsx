'use client';

import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import PlayerModal from './PlayerModal';

interface WatchNowClientProps {
  title: string;
  videoKey?: string;
}

export default function WatchNowClient({ title, videoKey }: WatchNowClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant="pink" 
        size="lg" 
        type="button"
        className="gap-2 px-8 py-6 text-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        Watch Now
      </Button>

      {isModalOpen && (
        <PlayerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoKey={videoKey}
          title={title}
        />
      )}
    </>
  );
}
