import React, { useState, useEffect, useRef } from 'react';
import { ChibiState } from '../../types/chibi';
import { ChibiArtwork } from './ChibiArtwork';
import { VedaGuidePanel } from './VedaGuidePanel';
import { Bot, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ChibiCompanionProps {
  activeSection: string;
}

export const ChibiCompanion: React.FC<ChibiCompanionProps> = ({ activeSection }) => {
  const [chibiState, setChibiState] = useState<ChibiState>('greeting');
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hasUnlockedEasterEgg, setHasUnlockedEasterEgg] = useState(false);
  const [guideInitialMode, setGuideInitialMode] = useState<'chat' | 'tour'>('chat');

  const inactivityTimerRef = useRef<number | null>(null);
  const userOverrideRef = useRef<boolean>(false);
  const clickTimerRef = useRef<number | null>(null);

  // Listen for global custom open event (e.g. from Hero CTA buttons or navigation)
  useEffect(() => {
    const handleOpenGuide = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'chat' | 'tour' }>;
      setIsMinimized(false);
      setIsDialogueOpen(true);
      if (customEvent.detail?.mode) {
        setGuideInitialMode(customEvent.detail.mode);
      }
    };

    window.addEventListener('open-veda-guide', handleOpenGuide);
    return () => window.removeEventListener('open-veda-guide', handleOpenGuide);
  }, []);

  // Section-aware automatic state updates (subtle and debounced)
  useEffect(() => {
    if (userOverrideRef.current || chibiState === 'sleeping' || chibiState === 'celebrating') {
      return;
    }

    const timer = setTimeout(() => {
      switch (activeSection) {
        case 'hero':
          setChibiState('greeting');
          break;
        case 'about':
          setChibiState('explaining');
          break;
        case 'projects':
          setChibiState('coding');
          break;
        case 'veda':
          setChibiState('thinking');
          break;
        case 'skills':
          setChibiState('engineering');
          break;
        case 'journey':
          setChibiState('happy');
          break;
        case 'credentials':
          setChibiState('explaining');
          break;
        case 'experiments':
          setChibiState('engineering');
          break;
        case 'contact':
          setChibiState('greeting');
          break;
        default:
          setChibiState('idle');
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [activeSection]);

  // Inactivity Detection: Sleep after 45 seconds of no activity
  const resetInactivityTimer = () => {
    if (chibiState === 'sleeping') {
      setChibiState('greeting');
      userOverrideRef.current = false;
    }

    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      setChibiState('sleeping');
    }, 45000);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(evt => window.addEventListener(evt, resetInactivityTimer, { passive: true }));
    resetInactivityTimer();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, resetInactivityTimer));
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    };
  }, [chibiState]);

  // Handle clicking on the Chibi character
  const handleChibiClick = () => {
    resetInactivityTimer();

    if (chibiState === 'sleeping') {
      setChibiState('greeting');
      setIsDialogueOpen(true);
      return;
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      setClickCount(0);
    }, 3000);

    if (newCount >= 5) {
      setChibiState('celebrating');
      setHasUnlockedEasterEgg(true);
      setIsDialogueOpen(true);
      setClickCount(0);
      userOverrideRef.current = true;

      setTimeout(() => {
        setChibiState('happy');
        userOverrideRef.current = false;
      }, 7000);
      return;
    }

    // Toggle guide panel
    setIsDialogueOpen(!isDialogueOpen);

    const states: ChibiState[] = ['happy', 'thinking', 'coding', 'engineering', 'explaining'];
    const next = states[Math.floor(Math.random() * states.length)];
    setChibiState(next);
    userOverrideRef.current = true;

    setTimeout(() => {
      userOverrideRef.current = false;
    }, 4000);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If minimized to compact floating button
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 select-none">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsDialogueOpen(true);
          }}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-cream-surface/95 dark:bg-[#2A0E1A]/95 hover:bg-burgundy text-wine dark:text-cream hover:text-cream border border-burgundy/25 dark:border-white/20 shadow-xl backdrop-blur-md text-xs font-mono transition-transform hover:scale-105 active:scale-95"
          title="Restore V.E.D.A. Guide Companion"
          aria-label="Expand V.E.D.A. companion"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-semibold">V.E.D.A. Guide</span>
          <ChevronUp className="w-3.5 h-3.5 text-dusky" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="chibi-companion fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex flex-col items-end pointer-events-none select-none"
      aria-label="Interactive V.E.D.A. portfolio companion"
    >
      {/* V.E.D.A. Guide Conversation & Walkthrough Panel */}
      {isDialogueOpen && (
        <div className="pointer-events-auto mb-2 mr-1 sm:mr-2">
          <VedaGuidePanel
            activeSection={activeSection}
            initialMode={guideInitialMode}
            onClose={() => setIsDialogueOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Floating Modern V.E.D.A. Guide Pill */}
      {!isDialogueOpen && (
        <button
          onClick={() => setIsDialogueOpen(true)}
          className="pointer-events-auto mb-1.5 px-3 py-1.5 rounded-full bg-cream-surface/95 dark:bg-[#2A0E1A]/95 hover:bg-burgundy text-wine dark:text-cream hover:text-cream border border-burgundy/20 dark:border-white/15 shadow-md text-xs font-mono flex items-center gap-1.5 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 active:scale-95 group"
          title="Open V.E.D.A. Portfolio Guide"
          aria-label="Open V.E.D.A. Portfolio Guide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:text-cream transition-colors" />
          <span className="font-semibold">Ask V.E.D.A. for guides</span>
          <Sparkles className="w-3 h-3 text-dusky group-hover:text-amber-300" />
        </button>
      )}

      {/* Chibi Character in Small, Subtle Companion Footprint */}
      <div className="pointer-events-auto relative flex flex-col items-end">
        {/* Subtle Dock minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="mb-1 px-2 py-0.5 rounded-full bg-cream-surface/90 dark:bg-[#2A0E1A]/90 hover:bg-cream-darker dark:hover:bg-wine text-taupe dark:text-dusky border border-burgundy/15 dark:border-white/10 shadow-sm text-[10px] flex items-center gap-1 font-mono transition-colors"
          title="Minimize companion"
          aria-label="Minimize companion"
        >
          <ChevronDown className="w-3 h-3" />
          <span className="text-[9px]">Dock</span>
        </button>

        {/* Chibi Character Artwork (Sized to stay subtle, authentic, and unobtrusive) */}
        <div className="outline-none rounded-2xl cursor-pointer">
          <ChibiArtwork
            state={chibiState}
            onClick={handleChibiClick}
            isOverdrive={hasUnlockedEasterEgg}
          />
        </div>

        {/* Unlocked Easter Egg Badge */}
        {hasUnlockedEasterEgg && chibiState === 'celebrating' && (
          <div className="mt-1 px-2 py-0.5 rounded-full bg-burgundy text-cream text-[9px] font-mono font-bold flex items-center gap-1 shadow-md animate-bounce">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Robotics Overdrive!</span>
          </div>
        )}
      </div>
    </aside>
  );
};
