import React, { useState, useEffect } from 'react';
import { VedaGuidePanel } from './VedaGuidePanel';
import { Bot, ChevronUp, Sparkles, X } from 'lucide-react';

interface ChibiCompanionProps {
  activeSection: string;
}

/**
 * V.E.D.A. AI Floating Guide Controller
 * Clean, modern interface without chibi avatar rendering.
 */
export const ChibiCompanion: React.FC<ChibiCompanionProps> = ({ activeSection }) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [guideInitialMode, setGuideInitialMode] = useState<'chat' | 'tour'>('chat');

  // Listen for global custom open events (from Hero CTA buttons or navigation)
  useEffect(() => {
    const handleOpenGuide = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'chat' | 'tour' }>;
      setIsMinimized(false);
      setIsGuideOpen(true);
      if (customEvent.detail?.mode) {
        setGuideInitialMode(customEvent.detail.mode);
      }
    };

    window.addEventListener('open-veda-guide', handleOpenGuide);
    return () => window.removeEventListener('open-veda-guide', handleOpenGuide);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If minimized to compact round icon
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsGuideOpen(true);
          }}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-burgundy hover:bg-wine text-cream shadow-2xl border border-dusky/40 text-xs font-mono transition-transform hover:scale-105 active:scale-95"
          title="Open V.E.D.A. AI Guide"
          aria-label="Open V.E.D.A. Guide"
        >
          <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold">V.E.D.A.</span>
          <ChevronUp className="w-3.5 h-3.5 text-dusky" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end pointer-events-none select-none"
      aria-label="V.E.D.A. AI Portfolio Guide"
    >
      {/* V.E.D.A. Guide Conversation & Tour Panel */}
      {isGuideOpen && (
        <div className="pointer-events-auto mb-2 mr-1">
          <VedaGuidePanel
            activeSection={activeSection}
            initialMode={guideInitialMode}
            onClose={() => setIsGuideOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Floating Modern Pill Trigger (When panel is closed) */}
      {!isGuideOpen && (
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-cream-surface/95 dark:bg-[#2A0E1A]/95 hover:bg-burgundy text-wine dark:text-cream hover:text-cream border border-burgundy/25 dark:border-white/20 shadow-cad hover:shadow-xl backdrop-blur-md text-xs font-mono font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 group"
            title="Open V.E.D.A. Interactive Engineering Guide"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Bot className="w-4 h-4 text-emerald-600 group-hover:text-cream transition-colors" />
            <span>Ask V.E.D.A. for guides</span>
            <Sparkles className="w-3 h-3 text-dusky group-hover:text-amber-300" />
          </button>
        </div>
      )}
    </aside>
  );
};
