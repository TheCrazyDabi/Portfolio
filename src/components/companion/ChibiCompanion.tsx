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

  // Listen for global custom open event (e.g. from hero button)
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
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsDialogueOpen(true);
          }}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-burgundy hover:bg-wine text-cream shadow-xl border border-dusky/40 text-xs font-mono transition-transform hover:scale-105 active:scale-95"
          title="Restore V.E.D.A. Guide Companion"
          aria-label="Expand V.E.D.A. companion"
        >
          <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold">V.E.D.A. // Guide</span>
          <ChevronUp className="w-3.5 h-3.5 text-dusky" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="chibi-companion fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end pointer-events-none select-none"
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

      {/* Floating "Ask V.E.D.A." pill */}
      {!isDialogueOpen && (
        <button
          onClick={() => setIsDialogueOpen(true)}
          className="pointer-events-auto mb-1.5 px-3 py-1.5 rounded-full bg-cream-surface/95 dark:bg-[#2A0E1A]/95 hover:bg-burgundy text-wine dark:text-cream hover:text-cream border border-burgundy/20 shadow-md text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
          title="Open V.E.D.A. Portfolio Guide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="w-3.5 h-3.5 text-emerald-600 group-hover:text-cream" />
          <span className="font-semibold">Ask V.E.D.A. for guides</span>
        </button>
      )}

      {/* Chibi Character in Small, Subtle Companion Footprint */}
      <div className="pointer-events-auto relative flex flex-col items-end">
        {/* Dock button pill */}
        <button
          onClick={() => setIsMinimized(true)}
          className="mb-1 p-1 rounded-full bg-cream/90 hover:bg-cream-darker text-taupe border border-burgundy/15 shadow-sm text-[10px] flex items-center gap-1 px-2 font-mono transition-colors"
          title="Minimize companion"
          aria-label="Minimize companion"
        >
          <ChevronDown className="w-3 h-3" />
          <span className="text-[9px]">Dock</span>
        </button>

        {/* Chibi Character Artwork (Sized to stay subtle and unobtrusive) */}
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
