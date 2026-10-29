import React from 'react';
import { getAssetUrl } from '../../utils/assets';

interface VSMonogramProps {
  className?: string;
}

export const VSMonogram: React.FC<VSMonogramProps> = ({ className = 'h-10 w-10' }) => (
  <span
    aria-hidden="true"
    className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dusky/40 bg-[#240A17] shadow-sm ${className}`}
  >
    <img
      src={getAssetUrl('assets/brand/vasudev-vs-logo.png')}
      alt=""
      className="absolute left-[-37%] top-[-38%] h-[210%] w-[180%] max-w-none select-none object-fill"
      draggable={false}
    />
  </span>
);
