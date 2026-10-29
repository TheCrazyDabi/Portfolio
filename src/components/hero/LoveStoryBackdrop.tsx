import React from 'react';

interface LoveStoryBackdropProps {
  className?: string;
}

/** Decorative, theme-colored couple vignette for the hero background. */
export const LoveStoryBackdrop: React.FC<LoveStoryBackdropProps> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 360 150"
    className={`love-story-backdrop pointer-events-none select-none ${className}`}
    fill="none"
  >
    <path d="M18 128H342" stroke="#C28B9A" strokeOpacity=".48" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M47 128c20-7 38-7 58 0m152 0c18-7 37-7 56 0" stroke="#DFB9BF" strokeOpacity=".35" strokeWidth="1" strokeDasharray="3 6" />

    {/* Girl: runs in, makes a small jump, and wraps her arms around the boy. */}
    <g className="love-story-girl">
      <path d="M32 36c-9-7-6-18 2-18 6 0 7 8 2 12" fill="#641F36" stroke="#451425" strokeWidth="2" />
      <circle cx="41" cy="36" r="13" fill="#F3D4C4" stroke="#451425" strokeWidth="2" />
      <path d="M29 36c-2-12 4-19 14-18 8 1 12 7 11 15-4-1-7-5-8-9-4 6-10 9-17 9" fill="#451425" />
      <path d="M38 38h.5m8 0h.5" stroke="#451425" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 44q3 3 6 0" stroke="#9C5267" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M31 54q10-5 20 1l5 29q-13 8-29 0z" fill="#9C5267" stroke="#641F36" strokeWidth="2" />
      <path d="M32 58q-9 9-3 17" stroke="#F3D4C4" strokeWidth="4.5" strokeLinecap="round" />
      <path className="love-story-girl-hug-arm" d="M49 58q12 5 15 17" stroke="#F3D4C4" strokeWidth="4.5" strokeLinecap="round" />
      <g className="love-story-leg love-story-girl-leg-a">
        <path d="M36 83l-3 20" stroke="#451425" strokeWidth="5" strokeLinecap="round" />
        <path d="M32 104h9" stroke="#641F36" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="love-story-leg love-story-girl-leg-b">
        <path d="M48 83l5 20" stroke="#451425" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 104h9" stroke="#641F36" strokeWidth="4" strokeLinecap="round" />
      </g>
    </g>

    {/* Boy: waits with open arms as the girl reaches him. */}
    <g className="love-story-boy">
      <circle cx="255" cy="37" r="14" fill="#F3D4C4" stroke="#451425" strokeWidth="2" />
      <path d="M241 36c-1-10 4-17 14-17 9 0 15 6 14 17-4-1-8-4-10-9-4 5-10 8-18 9" fill="#451425" />
      <path d="M250 39h.5m8 0h.5" stroke="#451425" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M251 45q4 3 8 0" stroke="#9C5267" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M242 56q13-8 26 0l7 29q-20 9-40 0z" fill="#641F36" stroke="#451425" strokeWidth="2" />
      <g className="love-story-boy-arm love-story-boy-arm-left">
        <path d="M243 60q-9 8-11 18" stroke="#F3D4C4" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className="love-story-boy-arm love-story-boy-arm-right">
        <path d="M267 60q10 8 12 18" stroke="#F3D4C4" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M244 84l-4 20m20-20 5 20" stroke="#451425" strokeWidth="5" strokeLinecap="round" />
      <path d="M235 105h10m16 0h10" stroke="#641F36" strokeWidth="4" strokeLinecap="round" />
    </g>

    <g className="love-story-heart" fill="#9C5267">
      <path d="M201 23c-5-6-14 1 0 12 14-11 5-18 0-12z" />
      <path d="M218 42c-3-4-9 1 0 8 9-7 3-12 0-8z" opacity=".68" />
    </g>
    <circle className="love-story-sparkle love-story-sparkle-a" cx="184" cy="49" r="2.4" fill="#C28B9A" />
    <circle className="love-story-sparkle love-story-sparkle-b" cx="221" cy="19" r="1.8" fill="#DFB9BF" />
  </svg>
);
