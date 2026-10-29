import React from 'react';

interface VSMonogramProps {
  className?: string;
}

export const VSMonogram: React.FC<VSMonogramProps> = ({ className = 'h-10 w-10' }) => (
  <span
    aria-hidden="true"
    className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dusky/40 bg-[#240A17] shadow-sm ${className}`}
  >
    <span className="-ml-0.5 font-display text-[17px] font-black leading-none tracking-[-0.13em] text-[#F0C7D0]">
      VS
    </span>
    <span className="absolute bottom-[18%] left-[24%] right-[24%] h-px bg-dusky/90" />
  </span>
);
