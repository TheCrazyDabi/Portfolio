import React, { useState } from 'react';
import { ChibiState } from '../../types/chibi';
import { getAssetUrl } from '../../utils/assets';

interface ChibiArtworkProps {
  state: ChibiState;
  className?: string;
  onClick?: () => void;
  isOverdrive?: boolean;
}

export const ChibiArtwork: React.FC<ChibiArtworkProps> = ({
  state,
  className = 'w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28',
  onClick,
  isOverdrive = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const isSleeping = state === 'sleeping';
  const isCelebrating = state === 'celebrating';
  const isCoding = state === 'coding';
  const isEngineering = state === 'engineering';
  const isThinking = state === 'thinking';

  // Map state to the authentic illustrated chibi poses
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
      className={`relative cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 select-none ${className} ${
        isOverdrive ? 'chibi-overdrive-aura rounded-full p-1' : ''
      }`}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } } : undefined}
      aria-label={`Vasudev Chibi Companion in ${state} mode`}
    >
      {/* Animated Prop 1: Floating Zzz Bubbles for Sleeping State */}
      {isSleeping && (
        <div className="absolute -top-3 right-2 pointer-events-none z-20 flex flex-col items-center">
          <span className="text-burgundy font-mono font-bold text-sm chibi-zzz-1">Z</span>
          <span className="text-dusky font-mono font-bold text-xs chibi-zzz-2">z</span>
          <span className="text-blush font-mono font-bold text-[10px] chibi-zzz-3">z</span>
        </div>
      )}

      {/* Animated Prop 2: Celebration Stars & Petals for Celebrating State */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-20 chibi-sparkle">
          <div className="absolute -top-2 left-2 text-burgundy text-xs">🌸</div>
          <div className="absolute -top-1 right-2 text-dusky text-xs">🌺</div>
          <div className="absolute bottom-6 left-0 text-burgundy text-xs">✨</div>
          <div className="absolute top-6 right-0 text-dusky text-xs">⭐</div>
          <div className="absolute -top-4 right-1/2 text-blush text-sm font-bold">🎉</div>
        </div>
      )}

      {/* Animated Prop 3: Floating Binary Sparks for Coding Mode */}
      {isCoding && (
        <div className="absolute -top-2 right-1 pointer-events-none z-20 flex flex-col font-mono text-[9px] font-bold">
          <span className="text-emerald-600 chibi-code-spark-1">0101</span>
          <span className="text-burgundy chibi-code-spark-2">ROS2</span>
          <span className="text-dusky chibi-code-spark-3">&lt;/&gt;</span>
        </div>
      )}

      {/* Animated Prop 4: Rotating Technical Gear for Engineering Mode */}
      {isEngineering && (
        <div className="absolute -top-1 left-1 pointer-events-none z-20">
          <svg className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="14" fill="none" stroke="#C28B9A" strokeWidth="6" strokeDasharray="6 3" />
            <circle cx="20" cy="20" r="6" fill="#641F36" />
          </svg>
        </div>
      )}

      {/* Animated Prop 5: Lightbulb Sparkle for Thinking Mode */}
      {isThinking && (
        <div className="absolute -top-3 right-4 pointer-events-none z-20 animate-bounce">
          <span className="text-sm">💡</span>
        </div>
      )}

      {/* Overdrive Flame Aura indicator */}
      {isOverdrive && (
        <div className="absolute -bottom-1 inset-x-0 text-center pointer-events-none z-20">
          <span className="inline-block px-1.5 py-0.5 rounded-full bg-burgundy text-[8px] font-mono font-bold text-cream tracking-widest shadow">
            OVERDRIVE
          </span>
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
          <path
            d="M 62 82 C 60 40 140 40 138 82 C 145 68 140 30 115 22 C 90 18 68 30 62 82 Z"
            fill="#1E1418"
          />
        </svg>
      )}
    </div>
  );
};
