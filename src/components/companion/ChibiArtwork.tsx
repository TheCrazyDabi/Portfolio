import React, { useState } from 'react';
import { ChibiState } from '../../types/chibi';
import { getAssetUrl } from '../../utils/assets';

interface ChibiArtworkProps {
  state: ChibiState;
  className?: string;
  onClick?: () => void;
}

export const ChibiArtwork: React.FC<ChibiArtworkProps> = ({
  state,
  className = 'w-36 h-44 sm:w-40 sm:h-48',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const isSleeping = state === 'sleeping';
  const isCelebrating = state === 'celebrating';

  // Map state to the user's authentic illustrated chibi poses
  const getPoseImage = (s: ChibiState): string => {
    switch (s) {
      case 'greeting':
        return getAssetUrl('assets/companion/poses/hello.png');
      case 'coding':
        return getAssetUrl('assets/companion/poses/working.png');
      case 'engineering':
        return getAssetUrl('assets/companion/poses/engineering.png');
      case 'thinking':
        return getAssetUrl('assets/companion/poses/thinking.png');
      case 'explaining':
        return getAssetUrl('assets/companion/poses/sectionguide.png');
      case 'happy':
        return getAssetUrl('assets/companion/poses/happy.png');
      case 'sleeping':
        return getAssetUrl('assets/companion/poses/sleeping.png');
      case 'celebrating':
        return getAssetUrl('assets/companion/poses/excited.png');
      case 'idle':
      default:
        return getAssetUrl('assets/companion/poses/cool.png');
    }
  };

  const poseSrc = getPoseImage(state);

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 select-none ${className}`}
      role="img"
      aria-label={`Vasudev Chibi Companion in ${state} mode`}
    >
      {/* Floating Animated Zzz Bubbles for Sleeping State */}
      {isSleeping && (
        <div className="absolute -top-3 right-2 pointer-events-none z-10 flex flex-col items-center">
          <span className="text-burgundy font-mono font-bold text-sm chibi-zzz-1">Z</span>
          <span className="text-dusky font-mono font-bold text-xs chibi-zzz-2">z</span>
          <span className="text-blush font-mono font-bold text-[10px] chibi-zzz-3">z</span>
        </div>
      )}

      {/* Floating Celebration Stars & Confetti for Celebrating State */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-10 chibi-sparkle">
          <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-dusky" />
          <div className="absolute top-1 right-4 w-2.5 h-2.5 rounded-full bg-blush" />
          <div className="absolute bottom-6 left-1 text-burgundy text-xs">✨</div>
          <div className="absolute top-6 right-2 text-dusky text-xs">⭐</div>
        </div>
      )}

      {/* Primary Character Image / Fallback */}
      {!imageError ? (
        <div
          className={`w-full h-full flex items-center justify-center filter drop-shadow-md transition-all duration-300 ${
            isCelebrating
              ? 'chibi-celebrate-bounce'
              : state === 'greeting'
              ? 'chibi-wave'
              : 'chibi-breathe'
          }`}
        >
          <img
            src={poseSrc}
            alt={`Vasudev Chibi - ${state}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
          />
        </div>
      ) : (
        /* Vector SVG Fallback in case of asset loading failure */
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="100" cy="228" rx="42" ry="7" fill="#641F36" fillOpacity="0.15" />
          <rect x="80" y="180" width="16" height="34" rx="4" fill="#2A1720" />
          <rect x="104" y="180" width="16" height="34" rx="4" fill="#2A1720" />
          <path d="M 74 212 L 98 212 C 100 212 100 222 96 224 L 72 224 Z" fill="#641F36" />
          <path d="M 102 212 L 126 212 C 129 214 130 220 128 224 L 104 224 Z" fill="#641F36" />
          <path d="M 72 135 C 72 125 128 125 128 135 L 126 182 L 74 182 Z" fill="#FFFFFF" stroke="#D6C7B6" />
          <path d="M 90 130 L 100 144 L 110 130 Z" fill="#451425" />
          <ellipse cx="100" cy="80" rx="38" ry="34" fill="#E6C4A6" />
          <ellipse cx="76" cy="88" rx="7" ry="4" fill="#DFB9BF" fillOpacity="0.8" />
          <ellipse cx="124" cy="88" rx="7" ry="4" fill="#DFB9BF" fillOpacity="0.8" />
          <path d="M 88 102 C 94 108 106 108 112 102 Z" fill="#2E1C24" fillOpacity="0.75" />
          <ellipse cx="100" cy="107" rx="3.5" ry="2" fill="#24141B" />
          <ellipse cx="84" cy="76" rx="8" ry="10" fill="#3E2723" />
          <circle cx="82" cy="73" r="3.2" fill="#FFFFFF" />
          <ellipse cx="116" cy="76" rx="8" ry="10" fill="#3E2723" />
          <circle cx="114" cy="73" r="3.2" fill="#FFFFFF" />
          <path
            d="M 60 76 C 54 54 68 32 94 28 C 118 24 140 34 144 54 C 148 70 144 88 140 96 C 136 78 134 68 128 62 C 122 58 116 58 108 58 C 96 58 84 62 76 68 C 68 76 64 88 60 76 Z"
            fill="#1A1517"
          />
        </svg>
      )}
    </div>
  );
};
