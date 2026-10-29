import React from 'react';

interface LoveStoryBackdropProps {
  className?: string;
}

/** A subtle, adult-proportioned cartoon vignette for the hero background. */
export const LoveStoryBackdrop: React.FC<LoveStoryBackdropProps> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 520 230"
    className={`love-story-backdrop pointer-events-none select-none ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="love-girl-coat" x1="62" y1="92" x2="111" y2="153" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9C5267" />
        <stop offset="1" stopColor="#641F36" />
      </linearGradient>
      <linearGradient id="love-boy-coat" x1="405" y1="90" x2="466" y2="155" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C28B9A" />
        <stop offset="1" stopColor="#641F36" />
      </linearGradient>
    </defs>

    <path d="M20 211H500" stroke="#C28B9A" strokeOpacity=".52" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M38 211c45-10 78-10 118 0m210 0c37-10 74-10 116 0" stroke="#DFB9BF" strokeOpacity=".45" strokeWidth="1" strokeDasharray="3 7" />

    {/* Girl: expressive face, flowing hair, jacket, trousers, and articulated limbs. */}
    <g className="love-story-girl">
      <g className="love-story-girl-body">
        <path d="M65 61c-13 20-12 43-2 57l8-7-1-30 11-11z" fill="#451425" />
        <path d="M66 58c-4-17 6-32 22-32 17 0 26 12 24 29-1 9-5 16-13 21l-4 17-22-3 3-16c-6-3-9-9-10-16z" fill="#F3D4C4" stroke="#451425" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M64 59c-5-20 7-37 26-37 18 0 28 13 25 31-8-2-14-9-16-17-6 10-19 16-34 15" fill="#451425" />
        <path d="M70 34c-6 8-9 16-7 26-7-1-12-8-11-16 1-11 8-18 17-21z" fill="#451425" />
        <path d="M80 58h1m17 0h1" stroke="#451425" strokeWidth="3" strokeLinecap="round" />
        <path d="M82 69q5 4 10 0" stroke="#9C5267" strokeWidth="2" strokeLinecap="round" />
        <path d="M74 62h5m24 0h-5" stroke="#C28B9A" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
        <path d="M77 80l-1 14m18 0-2-14" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
        <path d="M66 93q16-10 32-1l15 48q-22 13-52 4l-5-31q1-15 10-20z" fill="url(#love-girl-coat)" stroke="#451425" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M79 95l8 13 9-14m-8 14-3 33" stroke="#DFB9BF" strokeOpacity=".75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M68 139q22 7 45 0l-2 13q-20 8-39 0z" fill="#451425" opacity=".88" />
        <path d="M67 151l-5 8m42-8 7 8" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g className="love-story-girl-arm-back">
        <path d="M67 101q-14 12-17 29l11 7q8-13 17-20" fill="#641F36" stroke="#451425" strokeWidth="2" strokeLinejoin="round" />
        <path d="M51 129l-4 8" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="love-story-girl-arm-front">
        <path d="M96 98q16 6 20 22l-9 8q-8-10-20-11" fill="#9C5267" stroke="#451425" strokeWidth="2" strokeLinejoin="round" />
        <path d="M108 124l8 4" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g className="love-story-leg love-story-girl-leg-a">
        <path d="M71 150q-5 17-13 35l-3 10" stroke="#451425" strokeWidth="9" strokeLinecap="round" />
        <path d="M57 194q-9 4-12 11 10 4 22 0l2-7" fill="#F3D4C4" stroke="#641F36" strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="love-story-leg love-story-girl-leg-b">
        <path d="M94 151q8 18 10 35l5 9" stroke="#451425" strokeWidth="9" strokeLinecap="round" />
        <path d="M108 193q9 1 15 9-8 7-21 4l-3-7" fill="#F3D4C4" stroke="#641F36" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </g>

    {/* Boy: relaxed stance turns into an open-armed jump. */}
    <g className="love-story-boy">
      <path d="M412 61c-2-19 9-34 27-34 17 0 27 13 24 32-2 12-11 20-25 20-15 0-24-7-26-18z" fill="#F3D4C4" stroke="#451425" strokeWidth="2.5" />
      <path d="M410 57c-4-19 8-35 28-35 17 0 27 10 27 27-7-1-15-7-19-15-6 9-18 15-35 15" fill="#451425" />
      <path d="M421 60h1m18 0h1" stroke="#451425" strokeWidth="3" strokeLinecap="round" />
      <path d="M424 71q6 5 12 0" stroke="#9C5267" strokeWidth="2" strokeLinecap="round" />
      <path d="M416 84l-1 12m27 0-1-13" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      <path d="M408 97q21-13 43-1l15 45q-28 15-64 2l-4-27q0-13 10-19z" fill="url(#love-boy-coat)" stroke="#451425" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M429 98l1 42m-1-34 12-9" stroke="#DFB9BF" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      <path d="M403 142q31 10 64-1l-2 14q-30 9-57 0z" fill="#451425" opacity=".88" />
      <path d="M416 154l-4 40m28-40 6 40" stroke="#451425" strokeWidth="10" strokeLinecap="round" />
      <path d="M411 195q-10 2-13 10 10 6 24 2l1-7m23-5q11 0 16 9-9 7-23 3l-2-7" fill="#F3D4C4" stroke="#641F36" strokeWidth="2" strokeLinejoin="round" />

      <g className="love-story-boy-arm love-story-boy-arm-left">
        <path d="M409 102q-16 9-18 25l13 7q7-12 19-17" fill="#641F36" stroke="#451425" strokeWidth="2" strokeLinejoin="round" />
        <path d="M400 130l-6 6" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="love-story-boy-arm love-story-boy-arm-right">
        <path d="M449 101q17 8 21 24l-12 9q-9-12-20-16" fill="#9C5267" stroke="#451425" strokeWidth="2" strokeLinejoin="round" />
        <path d="M459 130l7 5" stroke="#F3D4C4" strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>

    <g className="love-story-heart" fill="#9C5267">
      <path d="M401 34c-6-8-17 1 0 15 17-14 6-23 0-15z" />
      <path d="M426 57c-4-5-11 1 0 10 11-9 4-15 0-10z" opacity=".7" />
    </g>
    <path className="love-story-sparkle love-story-sparkle-a" d="M378 63v10m-5-5h10" stroke="#C28B9A" strokeWidth="2" strokeLinecap="round" />
    <path className="love-story-sparkle love-story-sparkle-b" d="M432 28v8m-4-4h8" stroke="#DFB9BF" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
