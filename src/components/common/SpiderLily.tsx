import React from 'react';

interface SpiderLilyProps {
  variant?: 'bloom' | 'curling' | 'icon' | 'petals';
  className?: string;
}

export const SpiderLily: React.FC<SpiderLilyProps> = ({
  variant = 'bloom',
  className = 'w-24 h-24',
}) => {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 40 40"
        className={`inline-block ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Red Spider Lily Icon */}
        <g stroke="#C28B9A" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 20 28 C 19 22 14 16 10 12" />
          <path d="M 20 28 C 17 20 16 12 14 8" />
          <path d="M 20 28 C 20 18 20 12 20 6" />
          <path d="M 20 28 C 23 20 24 12 26 8" />
          <path d="M 20 28 C 21 22 26 16 30 12" />
        </g>
        <g fill="#641F36">
          <circle cx="10" cy="12" r="1.5" fill="#DFB9BF" />
          <circle cx="14" cy="8" r="1.5" fill="#DFB9BF" />
          <circle cx="20" cy="6" r="1.5" fill="#DFB9BF" />
          <circle cx="26" cy="8" r="1.5" fill="#DFB9BF" />
          <circle cx="30" cy="12" r="1.5" fill="#DFB9BF" />
        </g>
        {/* Central Petals */}
        <path
          d="M 18 28 C 16 25 15 22 17 20 C 19 22 19 26 18 28 Z"
          fill="#8A2244"
        />
        <path
          d="M 22 28 C 24 25 25 22 23 20 C 21 22 21 26 22 28 Z"
          fill="#8A2244"
        />
        <path d="M 20 28 L 20 38" stroke="#451425" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'petals') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {/* Floating Drifting Spider Lily Petals */}
        <div className="absolute top-12 right-1/4 petal-drift-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M 12 2 C 16 6 18 14 12 22 C 8 16 10 8 12 2 Z"
              fill="#8A2244"
              fillOpacity="0.75"
            />
          </svg>
        </div>
        <div className="absolute top-28 right-12 petal-drift-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M 10 2 C 14 6 15 12 10 18 C 6 14 8 7 10 2 Z"
              fill="#C28B9A"
              fillOpacity="0.6"
            />
          </svg>
        </div>
        <div className="absolute top-1/2 right-1/3 petal-drift-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M 9 1 C 13 5 14 11 9 17 C 5 13 7 6 9 1 Z"
              fill="#641F36"
              fillOpacity="0.7"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'curling') {
    return (
      <svg
        viewBox="0 0 180 200"
        className={`${className} spider-lily-sway`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="petalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#451425" />
            <stop offset="60%" stopColor="#8A2244" />
            <stop offset="100%" stopColor="#C28B9A" />
          </linearGradient>
        </defs>

        {/* Long, Graceful Recurved Filaments (Stamens) */}
        <g stroke="#C28B9A" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
          <path d="M 80 140 C 70 100 30 70 15 45 C 5 28 15 10 32 15" />
          <path d="M 80 140 C 75 90 45 50 35 25 C 28 8 45 0 55 10" />
          <path d="M 80 140 C 80 80 65 40 60 15 C 56 -2 76 -2 82 12" />
          <path d="M 80 140 C 85 80 105 40 115 15 C 122 -2 140 2 135 18" />
          <path d="M 80 140 C 95 90 125 50 145 28 C 158 14 172 26 162 38" />
          <path d="M 80 140 C 105 100 140 75 165 60 C 180 50 185 68 172 78" />
        </g>

        {/* Golden / Dusky Anthers at tips */}
        <g fill="#DFB9BF">
          <ellipse cx="32" cy="15" rx="3.5" ry="2" transform="rotate(30 32 15)" />
          <ellipse cx="55" cy="10" rx="3.5" ry="2" transform="rotate(15 55 10)" />
          <ellipse cx="82" cy="12" rx="3.5" ry="2" />
          <ellipse cx="135" cy="18" rx="3.5" ry="2" transform="rotate(-20 135 18)" />
          <ellipse cx="162" cy="38" rx="3.5" ry="2" transform="rotate(-40 162 38)" />
          <ellipse cx="172" cy="78" rx="3.5" ry="2" transform="rotate(-60 172 78)" />
        </g>

        {/* Radiating Curved Petals */}
        <g fill="url(#petalGrad)">
          <path d="M 80 140 C 60 125 45 105 48 85 C 56 100 68 120 80 140 Z" />
          <path d="M 80 140 C 70 120 65 95 72 78 C 78 95 82 118 80 140 Z" />
          <path d="M 80 140 C 85 118 90 92 88 74 C 94 92 92 118 80 140 Z" />
          <path d="M 80 140 C 92 118 106 95 115 82 C 110 102 98 122 80 140 Z" />
          <path d="M 80 140 C 98 122 120 105 132 95 C 122 112 104 128 80 140 Z" />
        </g>

        {/* Stem & Calyx */}
        <path d="M 80 140 L 78 195" stroke="#330D1B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="140" r="5" fill="#451425" />
      </svg>
    );
  }

  // Default: Full Blooming Red Spider Lily
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} spider-lily-sway filter drop-shadow-md`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bloomCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8A2244" />
          <stop offset="100%" stopColor="#451425" />
        </radialGradient>

        <linearGradient id="spiderPetal" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#451425" />
          <stop offset="70%" stopColor="#8A2244" />
          <stop offset="100%" stopColor="#C28B9A" />
        </linearGradient>
      </defs>

      {/* Radiating Curved Filaments */}
      <g stroke="#C28B9A" strokeWidth="1.5" strokeLinecap="round">
        <path d="M 100 130 C 85 90 40 60 20 30 C 10 12 25 5 40 12" />
        <path d="M 100 130 C 90 80 55 40 45 15 C 38 -2 55 -5 68 8" />
        <path d="M 100 130 C 96 70 80 30 78 5 C 75 -10 95 -10 100 6" />
        <path d="M 100 130 C 104 70 120 30 122 5 C 125 -10 145 -10 142 6" />
        <path d="M 100 130 C 110 80 145 40 155 15 C 162 -2 179 -5 172 8" />
        <path d="M 100 130 C 115 90 160 60 180 30 C 190 12 175 5 160 12" />
      </g>

      {/* Delicate Anthers */}
      <g fill="#DFB9BF">
        <circle cx="40" cy="12" r="3" />
        <circle cx="68" cy="8" r="3" />
        <circle cx="100" cy="6" r="3" />
        <circle cx="142" cy="6" r="3" />
        <circle cx="172" cy="8" r="3" />
        <circle cx="160" cy="12" r="3" />
      </g>

      {/* Recurved Ribbon-like Petals */}
      <g fill="url(#spiderPetal)">
        <path d="M 100 130 C 80 115 62 90 65 65 C 75 85 88 110 100 130 Z" />
        <path d="M 100 130 C 90 105 82 80 88 58 C 96 78 98 105 100 130 Z" />
        <path d="M 100 130 C 98 105 102 78 100 52 C 106 75 104 105 100 130 Z" />
        <path d="M 100 130 C 108 105 116 80 112 58 C 106 78 102 105 100 130 Z" />
        <path d="M 100 130 C 120 115 138 90 135 65 C 125 85 112 110 100 130 Z" />
      </g>

      {/* Flower Core & Stem */}
      <circle cx="100" cy="130" r="7" fill="url(#bloomCenter)" />
      <path d="M 100 130 L 100 190" stroke="#330D1B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};
