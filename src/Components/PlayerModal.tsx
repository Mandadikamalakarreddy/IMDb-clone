'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey?: string;
  title: string;
}

export default function PlayerModal({ isOpen, onClose, videoKey, title }: PlayerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      // Focus the modal automatically for accessibility
      setTimeout(() => modalRef.current?.focus(), 10);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-modal-title"
      tabIndex={-1}
      ref={modalRef}
    >
      {/* Click outside to close modal */}
      <div className="absolute inset-0 z-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-5xl aspect-video bg-dark-900 rounded-xl overflow-hidden border border-dark-700 shadow-2xl">
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none">
          <h2 id="player-modal-title" className="text-white font-bold text-lg pointer-events-auto">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto text-white hover:text-neon-pink bg-black/50 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-neon-pink"
            aria-label="Close player"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        {videoKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
            title={`Trailer for ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-dark-800 text-white p-6 text-center">
            <svg className="w-16 h-16 text-dark-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-bold mb-2">Video Unavailable</p>
            <p className="text-dark-300">We couldn&apos;t find a playable video or trailer for this title.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
