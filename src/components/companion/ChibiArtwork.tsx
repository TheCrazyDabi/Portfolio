import React from 'react';
import { ChibiState } from '../../types/chibi';

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
  const isSleeping = state === 'sleeping';
  const isHappy = state === 'happy' || state === 'celebrating';
  const isThinking = state === 'thinking';
  const isGreeting = state === 'greeting';
  const isCoding = state === 'coding';
  const isEngineering = state === 'engineering';
  const isExplaining = state === 'explaining';
  const isCelebrating = state === 'celebrating';

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 select-none ${className}`}
      role="img"
      aria-label={`Vasudev Chibi Companion in ${state} mode`}
    >
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hair Gradient */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1517" />
            <stop offset="50%" stopColor="#2E1C24" />
            <stop offset="100%" stopColor="#120E10" />
          </linearGradient>

          {/* Hair Highlight */}
          <linearGradient id="hairSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#641F36" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1A1517" stopOpacity="0" />
          </linearGradient>

          {/* Skin Tone Gradient */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E6C4A6" />
            <stop offset="100%" stopColor="#D9B18F" />
          </linearGradient>

          {/* Shirt Gradient */}
          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDE3D6" />
          </linearGradient>

          {/* Laptop Screen Glow */}
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Eye Iris Gradient */}
          <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1A100F" />
          </linearGradient>
        </defs>

        {/* Floating Celebration Particles */}
        {isCelebrating && (
          <g className="chibi-sparkle">
            {/* Confetti & stars */}
            <circle cx="35" cy="40" r="3" fill="#C28B9A" />
            <circle cx="165" cy="45" r="3.5" fill="#DFB9BF" />
            <polygon points="40,25 43,32 50,33 45,37 47,44 40,40 34,44 36,37 31,33 38,32" fill="#641F36" />
            <polygon points="155,20 158,27 165,28 160,32 162,39 155,35 149,39 151,32 146,28 153,27" fill="#C28B9A" />
            <rect x="25" y="70" width="4" height="6" fill="#641F36" transform="rotate(25 25 70)" />
            <rect x="170" y="65" width="4" height="6" fill="#C28B9A" transform="rotate(-30 170 65)" />
          </g>
        )}

        {/* Floating Zzz for Sleeping State */}
        {isSleeping && (
          <g>
            <text x="145" y="60" fill="#641F36" fontWeight="bold" fontSize="16" fontFamily="Space Grotesk, sans-serif" className="chibi-zzz-1">Z</text>
            <text x="160" y="45" fill="#C28B9A" fontWeight="bold" fontSize="14" fontFamily="Space Grotesk, sans-serif" className="chibi-zzz-2">z</text>
            <text x="172" y="30" fill="#DFB9BF" fontWeight="bold" fontSize="11" fontFamily="Space Grotesk, sans-serif" className="chibi-zzz-3">z</text>
          </g>
        )}

        {/* Thinking State: Lightbulb / Idea Icon */}
        {isThinking && (
          <g className="animate-subtle-pulse">
            <circle cx="155" cy="50" r="14" fill="#F7F0E7" stroke="#641F36" strokeWidth="1.5" />
            <path d="M 151 46 C 151 42 159 42 159 46 C 159 48 156 49 155 51 L 155 53" stroke="#641F36" strokeWidth="2" strokeLinecap="round" />
            <circle cx="155" cy="57" r="1" fill="#641F36" />
          </g>
        )}

        {/* MAIN CHARACTER BODY GROUP (with bounce or breathing) */}
        <g className={isCelebrating ? 'chibi-celebrate-bounce' : 'chibi-breathe'}>
          {/* Shadow Under Feet */}
          <ellipse cx="100" cy="228" rx="42" ry="7" fill="#641F36" fillOpacity="0.15" />

          {/* LEGS & SHOES */}
          {!isCoding ? (
            <g id="standing-legs">
              {/* Left Leg */}
              <rect x="80" y="180" width="16" height="34" rx="4" fill="#2A1720" />
              {/* Right Leg */}
              <rect x="104" y="180" width="16" height="34" rx="4" fill="#2A1720" />

              {/* Left Sneaker (Burgundy with white sole) */}
              <path d="M 74 212 L 98 212 C 100 212 100 222 96 224 L 72 224 C 70 220 71 214 74 212 Z" fill="#641F36" />
              <rect x="71" y="222" width="28" height="4" rx="2" fill="#FFFFFF" />

              {/* Right Sneaker */}
              <path d="M 102 212 L 126 212 C 129 214 130 220 128 224 L 104 224 C 100 222 100 212 102 212 Z" fill="#641F36" />
              <rect x="101" y="222" width="28" height="4" rx="2" fill="#FFFFFF" />
            </g>
          ) : (
            <g id="sitting-legs">
              {/* Crossed / Sitting Legs for Coding */}
              <path d="M 68 188 C 68 180 132 180 132 188 L 128 206 C 120 214 80 214 72 206 Z" fill="#2A1720" />
              {/* Sneakers tucked */}
              <ellipse cx="78" cy="210" rx="12" ry="6" fill="#641F36" />
              <ellipse cx="78" cy="214" rx="12" ry="2" fill="#FFFFFF" />
              <ellipse cx="122" cy="210" rx="12" ry="6" fill="#641F36" />
              <ellipse cx="122" cy="214" rx="12" ry="2" fill="#FFFFFF" />
            </g>
          )}

          {/* TORSO / SHIRT */}
          <g id="torso">
            {/* White / Cream Rolled-Sleeve Shirt Body */}
            <path
              d="M 72 135 C 72 125 128 125 128 135 L 126 182 C 126 184 74 184 74 182 Z"
              fill="url(#shirtGrad)"
              stroke="#D6C7B6"
              strokeWidth="0.8"
            />
            {/* Collar V-Neck with Burgundy Trim */}
            <path d="M 90 130 L 100 144 L 110 130 Z" fill="#451425" />
            <path d="M 94 130 L 100 140 L 106 130 Z" fill="url(#skinGrad)" />
            {/* Shirt Buttons */}
            <circle cx="100" cy="152" r="1.5" fill="#641F36" />
            <circle cx="100" cy="162" r="1.5" fill="#641F36" />
            <circle cx="100" cy="172" r="1.5" fill="#641F36" />
          </g>

          {/* ARMS & PROPS (Vary based on state) */}

          {/* 1. GREETING: Right arm raised & waving */}
          {isGreeting && (
            <g id="arms-greeting">
              {/* Left arm relaxed at side */}
              <path d="M 72 136 C 64 148 64 165 70 172" stroke="url(#shirtGrad)" strokeWidth="12" strokeLinecap="round" />
              <circle cx="70" cy="174" r="5" fill="url(#skinGrad)" />

              {/* Right arm waving */}
              <g className="chibi-wave">
                <path d="M 126 138 C 136 128 144 112 142 98" stroke="url(#shirtGrad)" strokeWidth="12" strokeLinecap="round" />
                {/* Rolled cuff */}
                <ellipse cx="138" cy="118" rx="6" ry="3" fill="#641F36" transform="rotate(-30 138 118)" />
                {/* Forearm */}
                <path d="M 140 114 L 144 98" stroke="url(#skinGrad)" strokeWidth="9" strokeLinecap="round" />
                {/* Waving Hand */}
                <ellipse cx="146" cy="94" rx="7" ry="6" fill="url(#skinGrad)" />
                {/* Fingers */}
                <circle cx="144" cy="88" r="2.5" fill="url(#skinGrad)" />
                <circle cx="149" cy="89" r="2.5" fill="url(#skinGrad)" />
                <circle cx="153" cy="93" r="2.5" fill="url(#skinGrad)" />
              </g>
            </g>
          )}

          {/* 2. CODING: Sitting with glowing mini laptop */}
          {isCoding && (
            <g id="arms-coding">
              {/* Laptop Base */}
              <polygon points="70,172 130,172 136,186 64,186" fill="#334155" stroke="#475569" strokeWidth="1" />
              {/* Laptop Screen Open */}
              <polygon points="72,138 128,138 130,172 70,172" fill="url(#screenGrad)" stroke="#1E293B" strokeWidth="1.5" />
              {/* Glowing Code Lines on Screen */}
              <line x1="78" y1="145" x2="105" y2="145" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="78" y1="150" x2="118" y2="150" stroke="#DFB9BF" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="84" y1="155" x2="112" y2="155" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="84" y1="160" x2="98" y2="160" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="78" y1="165" x2="122" y2="165" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />

              {/* Arms Typing on Keyboard */}
              <g className="chibi-type-left">
                <path d="M 68 138 C 64 154 74 176 82 178" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
                <circle cx="84" cy="180" r="4.5" fill="url(#skinGrad)" />
              </g>
              <g className="chibi-type-right">
                <path d="M 132 138 C 136 154 126 176 118 178" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
                <circle cx="116" cy="180" r="4.5" fill="url(#skinGrad)" />
              </g>
            </g>
          )}

          {/* 3. ENGINEERING: Holding mini robotic claw / mechanical joint */}
          {isEngineering && (
            <g id="arms-engineering">
              {/* Left Arm holding small blueprint card */}
              <path d="M 72 138 C 64 152 70 168 80 172" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <rect x="74" y="164" width="14" height="18" rx="2" fill="#F7F0E7" stroke="#641F36" strokeWidth="1" transform="rotate(-15 74 164)" />
              <line x1="77" y1="170" x2="85" y2="168" stroke="#641F36" strokeWidth="1" />
              <line x1="77" y1="174" x2="84" y2="172" stroke="#641F36" strokeWidth="1" />
              <circle cx="82" cy="172" r="4.5" fill="url(#skinGrad)" />

              {/* Right Arm holding mini robotic manipulator tool */}
              <path d="M 126 138 C 138 148 138 162 130 168" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="128" cy="168" r="4.5" fill="url(#skinGrad)" />
              {/* Mini Articulated Robotic Gripper */}
              <g transform="translate(130, 160)">
                <line x1="0" y1="8" x2="16" y2="4" stroke="#641F36" strokeWidth="3" strokeLinecap="round" />
                <circle cx="16" cy="4" r="3" fill="#C28B9A" />
                {/* Mini Claw Jaws */}
                <path d="M 16 4 L 24 0 L 26 2" stroke="#451425" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 16 4 L 24 8 L 26 6" stroke="#451425" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Glowing LED on gripper */}
                <circle cx="14" cy="4" r="1.2" fill="#10B981" />
              </g>
            </g>
          )}

          {/* 4. THINKING: Hand on chin */}
          {isThinking && (
            <g id="arms-thinking">
              {/* Left arm crossed under */}
              <path d="M 72 138 C 64 156 82 172 104 170" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              {/* Right hand touching chin */}
              <path d="M 126 138 C 136 150 128 140 114 126" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="112" cy="122" r="5" fill="url(#skinGrad)" />
            </g>
          )}

          {/* 5. EXPLAINING: Gesturing towards portfolio content */}
          {isExplaining && (
            <g id="arms-explaining">
              {/* Left hand relaxed */}
              <path d="M 72 138 C 66 152 66 166 72 172" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="72" cy="174" r="4.5" fill="url(#skinGrad)" />

              {/* Right arm outstretched pointing left/forward */}
              <path d="M 126 138 C 142 142 158 140 168 136" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="170" cy="135" r="5" fill="url(#skinGrad)" />
              {/* Pointing index finger */}
              <path d="M 172 134 L 182 132" stroke="url(#skinGrad)" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* 6. CELEBRATING: Both arms up in air */}
          {isCelebrating && (
            <g id="arms-celebrating">
              {/* Left arm raised */}
              <path d="M 72 138 C 60 122 56 104 60 92" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="60" cy="90" r="5" fill="url(#skinGrad)" />
              {/* Right arm raised */}
              <path d="M 126 138 C 138 122 144 104 140 92" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="140" cy="90" r="5" fill="url(#skinGrad)" />
            </g>
          )}

          {/* 7. IDLE / SLEEPING / DEFAULT ARMS */}
          {(!isGreeting && !isCoding && !isEngineering && !isThinking && !isExplaining && !isCelebrating) && (
            <g id="arms-default">
              {/* Left Arm relaxed */}
              <path d="M 72 138 C 64 150 64 165 70 172" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="70" cy="174" r="4.5" fill="url(#skinGrad)" />
              {/* Right Arm relaxed with rolled cuff */}
              <path d="M 126 138 C 134 150 134 165 128 172" stroke="url(#shirtGrad)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="128" cy="174" r="4.5" fill="url(#skinGrad)" />
            </g>
          )}

          {/* HEAD & FACE GROUP */}
          <g id="head-group" transform={isSleeping ? 'rotate(-6 100 80)' : ''}>
            {/* Neck */}
            <rect x="94" y="116" width="12" height="14" fill="#CF9F7A" />

            {/* Chibi Head (Cute rounded proportions) */}
            <ellipse cx="100" cy="80" rx="38" ry="34" fill="url(#skinGrad)" />

            {/* Cheeks Blush */}
            <ellipse cx="76" cy="88" rx="7" ry="4" fill="#DFB9BF" fillOpacity="0.8" />
            <ellipse cx="124" cy="88" rx="7" ry="4" fill="#DFB9BF" fillOpacity="0.8" />

            {/* Beard / Trimmed Facial Hair / Goatee (Vasudev's recognizable feature) */}
            <g id="facial-hair">
              {/* Soft chin shadow & stubble contour */}
              <path
                d="M 88 102 C 94 108 106 108 112 102 C 108 111 92 111 88 102 Z"
                fill="#2E1C24"
                fillOpacity="0.75"
              />
              {/* Subtle chin goatee tuft */}
              <ellipse cx="100" cy="107" rx="3.5" ry="2" fill="#24141B" />
              {/* Trimmed side jaw shadow */}
              <path d="M 68 88 C 70 98 76 106 88 110" stroke="#2E1C24" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
              <path d="M 132 88 C 130 98 124 106 112 110" stroke="#2E1C24" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
            </g>

            {/* NOSE */}
            <path d="M 99 82 L 100 85 L 102 85" stroke="#B88560" strokeWidth="1.2" strokeLinecap="round" />

            {/* MOUTH (Dynamic by state) */}
            {isHappy ? (
              /* Big open anime smile */
              <path d="M 94 92 C 94 99 106 99 106 92 Z" fill="#641F36" stroke="#451425" strokeWidth="1" />
            ) : isSleeping ? (
              /* Quiet sleeping smile */
              <path d="M 97 94 C 99 96 101 96 103 94" stroke="#451425" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            ) : isThinking ? (
              /* Cute small quizzical 'o' mouth */
              <circle cx="100" cy="94" r="2.5" fill="#451425" />
            ) : (
              /* Natural friendly smirk/smile */
              <path d="M 95 93 C 98 96 103 96 105 93" stroke="#451425" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            )}

            {/* EYES (Expressive anime style) */}
            {isSleeping || isHappy ? (
              /* Joyful / Sleeping Curved Crescent Eyes (^ _ ^) */
              <g id="closed-happy-eyes">
                <path d="M 76 78 C 80 72 88 72 92 78" stroke="#1A1517" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 108 78 C 112 72 120 72 124 78" stroke="#1A1517" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            ) : isThinking ? (
              /* Eyes glancing upwards thoughtfully */
              <g id="thinking-eyes">
                {/* Left Eye */}
                <ellipse cx="84" cy="74" rx="8" ry="9" fill="url(#eyeGrad)" />
                <circle cx="86" cy="72" r="3" fill="#FFFFFF" />
                <circle cx="82" cy="77" r="1.5" fill="#FFFFFF" />
                {/* Right Eye */}
                <ellipse cx="116" cy="74" rx="8" ry="9" fill="url(#eyeGrad)" />
                <circle cx="118" cy="72" r="3" fill="#FFFFFF" />
                <circle cx="114" cy="77" r="1.5" fill="#FFFFFF" />
                {/* Thinking Eyebrows */}
                <path d="M 76 67 C 80 65 88 67 91 70" stroke="#1A1517" strokeWidth="2" strokeLinecap="round" />
                <path d="M 109 68 C 113 65 120 65 124 67" stroke="#1A1517" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              /* Open Expressive Eyes with Glossy Catchlights */
              <g id="open-eyes">
                {/* Left Eye */}
                <ellipse cx="84" cy="76" rx="8" ry="10" fill="url(#eyeGrad)" />
                <circle cx="82" cy="73" r="3.2" fill="#FFFFFF" />
                <circle cx="86" cy="80" r="1.8" fill="#FFFFFF" />
                {/* Eyelash / Upper lid */}
                <path d="M 75 74 C 78 68 90 68 93 74" stroke="#120E10" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                {/* Left Eyebrow */}
                <path d="M 76 66 C 81 63 88 64 92 68" stroke="#1A1517" strokeWidth="2.2" strokeLinecap="round" />

                {/* Right Eye */}
                <ellipse cx="116" cy="76" rx="8" ry="10" fill="url(#eyeGrad)" />
                <circle cx="114" cy="73" r="3.2" fill="#FFFFFF" />
                <circle cx="118" cy="80" r="1.8" fill="#FFFFFF" />
                {/* Eyelash / Upper lid */}
                <path d="M 107 74 C 110 68 122 68 125 74" stroke="#120E10" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                {/* Right Eyebrow */}
                <path d="M 108 68 C 112 64 119 63 124 66" stroke="#1A1517" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            )}

            {/* VOLUMINOUS, MESSY BLACK HAIR */}
            <g id="voluminous-messy-hair">
              {/* Back Hair Mass */}
              <path
                d="M 60 76 C 54 54 68 32 94 28 C 118 24 140 34 144 54 C 148 70 144 88 140 96 C 136 78 134 68 128 62 C 122 58 116 58 108 58 C 96 58 84 62 76 68 C 68 76 64 88 60 76 Z"
                fill="url(#hairGrad)"
              />
              {/* Front Bangs & Messy Spikes */}
              {/* Left Tufts */}
              <path d="M 62 66 C 52 56 62 44 72 40 C 66 48 68 58 72 64 Z" fill="url(#hairGrad)" />
              <path d="M 68 46 C 72 32 86 28 98 28 C 88 34 84 42 82 52 Z" fill="url(#hairGrad)" />
              {/* Center Messy Crests */}
              <path d="M 92 28 C 100 20 114 22 120 28 C 112 32 108 40 106 48 Z" fill="url(#hairGrad)" />
              <path d="M 116 26 C 128 20 142 30 144 42 C 136 38 128 42 124 48 Z" fill="url(#hairGrad)" />
              {/* Right Tufts */}
              <path d="M 136 40 C 148 44 154 58 148 70 C 144 60 138 52 134 48 Z" fill="url(#hairGrad)" />
              <path d="M 142 64 C 150 72 148 86 142 94 C 140 84 138 76 136 72 Z" fill="url(#hairGrad)" />

              {/* Front Forehead Bangs (styled, natural) */}
              <path d="M 74 60 C 80 66 84 74 86 78 C 84 72 82 66 80 60 Z" fill="#1A1517" />
              <path d="M 88 56 C 94 64 96 74 97 80 C 95 72 94 64 92 58 Z" fill="#24141B" />
              <path d="M 104 56 C 108 64 112 72 116 78 C 114 70 112 62 108 56 Z" fill="#1A1517" />
              <path d="M 118 58 C 124 64 128 72 130 76 C 128 70 126 62 122 58 Z" fill="#24141B" />

              {/* Subtle Burgundy Sheen/Gloss across hair crown */}
              <path
                d="M 82 36 C 96 30 116 30 130 36 C 124 38 112 36 100 36 C 92 36 86 38 82 36 Z"
                fill="#641F36"
                fillOpacity="0.4"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
