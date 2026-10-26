import React, { useState, useEffect, useRef } from 'react';
import { ambientSound } from '../../services/ambientSoundService';
import { Volume2, VolumeX, Music, Sparkles, Sliders } from 'lucide-react';

interface AmbientSoundControllerProps {
  variant?: 'floating' | 'navbar';
}

export const AmbientSoundController: React.FC<AmbientSoundControllerProps> = ({ variant = 'floating' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = ambientSound.subscribe((playing, vol) => {
      setIsPlaying(playing);
      setVolume(vol);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    ambientSound.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    ambientSound.setVolume(val);
  };

  const handleMouseEnter = () => {
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    setShowVolumePopup(true);
  };

  const handleMouseLeave = () => {
    popupTimeoutRef.current = setTimeout(() => {
      setShowVolumePopup(false);
    }, 1200);
  };

  // If embedded directly inside the top Navigation bar
  if (variant === 'navbar') {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleToggle}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
            isPlaying
              ? 'bg-rose-500/15 text-rose-900 dark:text-rose-200 border border-rose-400/40 shadow-sm'
              : 'bg-burgundy/5 hover:bg-burgundy/10 text-taupe hover:text-wine border border-burgundy/15'
          }`}
          title={isPlaying ? 'Mute Sakura Zen Ambience' : 'Play Soothing Cherry Blossom Ambience'}
          aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        >
          <span className="text-xs select-none">🌸</span>
          <span className="hidden sm:inline font-medium">
            {isPlaying ? 'Zen Ambience' : 'Ambience'}
          </span>

          {/* Equalizer Wave Bars when active */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 px-0.5">
              <span className="w-0.5 bg-rose-500 rounded-full animate-pulse h-full" style={{ animationDuration: '0.6s' }} />
              <span className="w-0.5 bg-rose-600 rounded-full animate-pulse h-2/3" style={{ animationDuration: '0.9s' }} />
              <span className="w-0.5 bg-rose-500 rounded-full animate-pulse h-4/5" style={{ animationDuration: '0.7s' }} />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-taupe" />
          )}
        </button>

        {/* Volume Flyout Popup */}
        {showVolumePopup && (
          <div className="absolute right-0 top-full mt-2 p-3 rounded-xl bg-cream-surface dark:bg-[#1E0913] border border-burgundy/20 dark:border-white/20 shadow-xl z-50 w-44 flex flex-col gap-2 font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between text-[10px] text-taupe uppercase font-semibold">
              <span>🌸 Ambience Vol</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-burgundy cursor-pointer h-1.5 bg-burgundy/20 rounded-lg"
            />
            <p className="text-[9px] text-taupe/70 font-sans italic">
              Gentle spring wind &amp; Japanese koto chimes
            </p>
          </div>
        )}
      </div>
    );
  }

  // Floating ambient pill at bottom-left
  return (
    <div
      className="fixed bottom-5 left-5 z-40 select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center">
        <button
          onClick={handleToggle}
          className={`group flex items-center space-x-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg text-xs font-mono ${
            isPlaying
              ? 'bg-cream-surface/95 dark:bg-[#1A0610]/95 text-wine dark:text-cream border border-rose-400/40 hover:scale-105 ring-2 ring-rose-300/30'
              : 'bg-cream-surface/90 dark:bg-[#1A0610]/90 text-taupe hover:text-wine border border-burgundy/20 hover:scale-105'
          }`}
          title={isPlaying ? 'Pause Soothing Ambience' : 'Play Soothing Cherry Blossom Zen Ambience'}
          aria-label={isPlaying ? 'Pause ambient sound' : 'Play soothing cherry blossom background sound'}
        >
          <span className="text-sm">🌸</span>
          
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-taupe uppercase tracking-wider font-semibold leading-none">
              {isPlaying ? 'ZEN SOUNDSCAPE' : 'SOOTHING SOUND'}
            </span>
            <span className="text-xs font-bold font-sans text-wine dark:text-cream mt-0.5">
              {isPlaying ? 'Cherry Blossom Wind' : 'Play Ambience'}
            </span>
          </div>

          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-4 pl-1">
              <span className="w-1 bg-burgundy dark:bg-dusky rounded-full animate-bounce h-full" style={{ animationDuration: '0.8s' }} />
              <span className="w-1 bg-rose-500 rounded-full animate-bounce h-2/3" style={{ animationDuration: '1.1s' }} />
              <span className="w-1 bg-burgundy dark:bg-dusky rounded-full animate-bounce h-4/5" style={{ animationDuration: '0.9s' }} />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-taupe group-hover:text-burgundy transition-colors" />
          )}
        </button>

        {/* Floating Volume Slider Popover */}
        {showVolumePopup && isPlaying && (
          <div className="absolute left-0 bottom-full mb-2 p-3 rounded-2xl bg-cream-surface/95 dark:bg-[#1C0712]/95 backdrop-blur-md border border-burgundy/20 dark:border-white/20 shadow-2xl w-48 flex flex-col gap-2 font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between text-[10px] text-taupe uppercase font-semibold">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-burgundy" />
                <span>Volume</span>
              </span>
              <span className="font-bold text-wine dark:text-cream">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-burgundy cursor-pointer h-1.5 bg-burgundy/20 rounded-lg"
            />
            <p className="text-[9px] text-taupe/80 font-sans italic leading-tight">
              Procedural breeze &amp; Japanese pentatonic koto tones (Insen scale).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
