import React from 'react';

interface SamuraiBackdropProps {
  className?: string;
}

/** Decorative anime-inspired samurai vignette for the portfolio hero. */
export const SamuraiBackdrop: React.FC<SamuraiBackdropProps> = ({ className = '' }) => (
  <svg
    className={`samurai-scene pointer-events-none select-none ${className}`}
    viewBox="0 0 420 280"
    fill="none"
    role="img"
    aria-label="An animated samurai practicing a controlled katana slash"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="samurai-robe" x1="153" y1="105" x2="268" y2="247" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DFB9BF" /><stop offset="1" stopColor="#641F36" />
      </linearGradient>
      <linearGradient id="samurai-blade" x1="205" y1="125" x2="365" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F7F0E7" /><stop offset="1" stopColor="#DFB9BF" />
      </linearGradient>
      <filter id="samurai-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <ellipse cx="211" cy="255" rx="127" ry="12" fill="#451425" opacity=".18" />
    <path d="M82 255H344" stroke="#C28B9A" strokeOpacity=".4" strokeWidth="1.5" />

    <g className="samurai-character">
      {/* Wind-swept ponytail and loose locks */}
      <g className="samurai-hair-flow" fill="#451425" stroke="#2D0B1B" strokeWidth="3" strokeLinejoin="round">
        <path d="M185 72c-31-19-57-17-77-3 27-4 42 7 53 21-25-7-43-2-59 12 30-7 49 2 62 18l39-19-18-29Z" />
        <path d="M179 75c-16-21-27-38-26-58 12 14 20 21 31 27" />
        <path d="M160 82c-25-5-44-3-63 4 17-1 28 1 40 7" fill="none" />
      </g>

      {/* Hakama, layered robe, and planted stance */}
      <g className="samurai-body">
        <path d="m171 156-42 73 45 21 33-55 20 55 48-16-29-86-75 8Z" fill="#451425" stroke="#2D0B1B" strokeWidth="4" strokeLinejoin="round" />
        <path d="m143 226-22 17 9 11 47 2 7-8-29-17-12-5Zm93 13 14 15 45-5 5-11-24-12-23 8-17 5Z" fill="#F7F0E7" stroke="#451425" strokeWidth="3" strokeLinejoin="round" />
        <path d="m177 105-25 16-9 40 18 25 27-24 26 34 35-26-14-45-23-20-35 0Z" fill="url(#samurai-robe)" stroke="#451425" strokeWidth="4" strokeLinejoin="round" />
        <path d="m179 111 20 31 18-29 21 7-27 49-24-28-27 29-13-15 19-41 13-3Z" fill="#F7F0E7" stroke="#641F36" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M180 163h40l-4 13h-38l2-13Z" fill="#451425" />
        <path d="m194 164 10 7-10 8-10-8 10-7Z" fill="#DFB9BF" />
      </g>

      {/* Face, headband, and expressive anime eyes */}
      <g className="samurai-head">
        <path d="M168 55c4-24 42-30 58-5l-4 33c-4 19-23 29-39 18-14-10-20-28-15-46Z" fill="#F0C8B6" stroke="#451425" strokeWidth="3" />
        <path d="M166 69c-8-23 4-43 27-47 20-4 39 8 43 26l-12 8-9-17-25 8-13 18-11 4Z" fill="#451425" stroke="#2D0B1B" strokeWidth="3" strokeLinejoin="round" />
        <path d="M164 58c22 12 46 9 66-3l5 10c-21 15-48 20-70 5l-1-12Z" fill="#641F36" stroke="#DFB9BF" strokeWidth="2" />
        <path d="m176 75 11-3-3 5-8 1Zm25-3 11 2-7 4-6-2Z" fill="#2D0B1B" />
        <path d="m180 73 5-1m21 0 5 1" stroke="#451425" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M189 88c5 3 10 3 15 0" stroke="#9E5368" strokeWidth="2" strokeLinecap="round" />
        <path d="m169 55-14-8 7 14m64-8 12-10-4 17" fill="#451425" stroke="#2D0B1B" strokeWidth="2" />
      </g>

      {/* Guarded arm and katana arm */}
      <g className="samurai-off-arm">
        <path d="m160 124-30 25 15 15 34-22" fill="#F0C8B6" stroke="#451425" strokeWidth="4" strokeLinejoin="round" />
        <path d="m145 164-11 8-10-12 14-13 12 8-5 9Z" fill="#641F36" stroke="#451425" strokeWidth="3" />
      </g>
      <g className="samurai-sword-arm">
        <path d="m221 122 30-21 14 13-29 29" fill="#F0C8B6" stroke="#451425" strokeWidth="4" strokeLinejoin="round" />
        <path d="m253 106 12-10 13 12-12 13-12-15Z" fill="#641F36" stroke="#451425" strokeWidth="3" />
        <g className="samurai-katana">
          <path d="m265 105 83-66 5 5-77 75-11-14Z" fill="url(#samurai-blade)" stroke="#451425" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="m264 103-9 8 17 19 9-9" fill="#451425" stroke="#2D0B1B" strokeWidth="2" />
          <path d="m259 103-12 10m20-17 8 9" stroke="#DFB9BF" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </g>

    <g className="samurai-slash" filter="url(#samurai-glow)">
      <path d="M175 117c48-63 123-91 196-83" stroke="#F7F0E7" strokeWidth="3" strokeLinecap="round" />
      <path d="M191 126c47-45 101-65 153-66" stroke="#C28B9A" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g className="samurai-petal" fill="#DFB9BF">
      <path d="M92 111c7-11 17-12 22-4-6 10-14 14-22 4Z" />
      <path d="M321 160c8-8 17-7 19 2-8 8-15 9-19-2Z" />
      <path d="M113 192c7-9 14-8 17 0-6 8-12 9-17 0Z" />
    </g>
    <path className="samurai-spark" d="m330 95 4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9Z" fill="#F7F0E7" />
  </svg>
);
