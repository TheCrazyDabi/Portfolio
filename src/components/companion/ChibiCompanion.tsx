import React, { useState, useEffect, useRef } from 'react';
import { ChibiState } from '../../types/chibi';
import { ChibiArtwork } from './ChibiArtwork';
import { CompanionDialogue } from './CompanionDialogue';
import { Sparkles, ChevronDown, ChevronUp, Bot } from 'lucide-react';

interface ChibiCompanionProps {
  activeSection: string;
}

export const ChibiCompanion: React.FC<ChibiCompanionProps> = ({ activeSection }) => {
  const [chibiState, setChibiState] = useState<ChibiState>('greeting');
  const [isDialogueOpen, setIsDialogueOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hasUnlockedEasterEgg, setHasUnlockedEasterEgg] = useState(false);

  const inactivityTimerRef = useRef<number | null>(null);
  const userOverrideRef = useRef<boolean>(false);
  const clickTimerRef = useRef<number | null>(null);

  // Section-aware automatic state updates (unless user explicitly overrode state recently)
  useEffect(() => {
    if (userOverrideRef.current || chibiState === 'sleeping' || chibiState === 'celebrating') {
      return;
    }

    // Debounced section reaction
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

  // Inactivity Detection: Fall asleep after 45 seconds of no activity
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

    // If sleeping, wake up immediately
    if (chibiState === 'sleeping') {
      setChibiState('greeting');
      setIsDialogueOpen(true);
      return;
    }

    // Easter egg progression (5 clicks in short succession)
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      setClickCount(0);
    }, 3000);

    if (newCount >= 5) {
      // Trigger Easter Egg Celebration!
      setChibiState('celebrating');
      setHasUnlockedEasterEgg(true);
      setIsDialogueOpen(true);
      setClickCount(0);
      userOverrideRef.current = true;

      // Return to happy/idle after 7 seconds
      setTimeout(() => {
        setChibiState('happy');
        userOverrideRef.current = false;
      }, 7000);
      return;
    }

    // Toggle dialogue or rotate playful reaction
    setIsDialogueOpen(!isDialogueOpen);

    // Alternate friendly states
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

  const handleManualSetState = (newState: ChibiState) => {
    setChibiState(newState);
    userOverrideRef.current = true;
    setTimeout(() => {
      userOverrideRef.current = false;
    }, 8000);
  };

  // If minimized to floating badge
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsDialogueOpen(true);
          }}
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-burgundy hover:bg-wine text-cream shadow-xl border border-dusky/40 text-xs font-mono transition-transform hover:scale-105 active:scale-95"
          title="Restore Chibi Companion"
          aria-label="Expand chibi companion"
        >
          <Bot className="w-4 h-4 text-dusky animate-pulse" />
          <span className="font-semibold">Vasudev.Chibi</span>
          <ChevronUp className="w-3.5 h-3.5 text-dusky" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none"
      aria-label="Interactive portfolio companion"
    >
      {/* Dialogue Speech Bubble */}
      {isDialogueOpen && (
        <div className="pointer-events-auto mb-2 mr-2">
          <CompanionDialogue
            state={chibiState}
            activeSection={activeSection}
            onClose={() => setIsDialogueOpen(false)}
            onSetState={handleManualSetState}
            onNavigate={handleNavigate}
            easterEggCount={clickCount}
          />
        </div>
      )}

      {/* Chibi Character & Floating Control Strip */}
      <div className="pointer-events-auto relative flex flex-col items-end">
        {/* Minimize button pill */}
        <button
          onClick={() => setIsMinimized(true)}
          className="mb-1 p-1 rounded-full bg-cream/90 hover:bg-cream-darker text-taupe border border-burgundy/15 shadow-sm text-[10px] flex items-center gap-1 px-2 font-mono transition-colors"
          title="Minimize companion"
          aria-label="Minimize companion"
        >
          <ChevronDown className="w-3 h-3" />
          <span className="text-[9px]">Dock</span>
        </button>

        {/* Chibi Vector Artwork */}
        <div
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleChibiClick();
            }
          }}
          aria-label="Click to interact with Vasudev Chibi"
          className="outline-none focus:ring-2 focus:ring-burgundy/40 rounded-2xl"
        >
          <ChibiArtwork
            state={chibiState}
            onClick={handleChibiClick}
          />
        </div>

        {/* Unlocked Easter Egg Badge Notification */}
        {hasUnlockedEasterEgg && chibiState === 'celebrating' && (
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-burgundy text-cream text-[10px] font-mono font-bold flex items-center gap-1 shadow-md animate-bounce">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Robotics Overdrive!</span>
          </div>
        )}
      </div>
    </aside>
  );
};
