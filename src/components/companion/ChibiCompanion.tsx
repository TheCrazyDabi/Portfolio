import React, { useState, useEffect } from 'react';
import { VedaGuidePanel } from './VedaGuidePanel';
import { Bot, Sparkles, ChevronUp } from 'lucide-react';

interface ChibiCompanionProps {
  activeSection: string;
}

export const ChibiCompanion: React.FC<ChibiCompanionProps> = ({ activeSection }) => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [guideInitialMode, setGuideInitialMode] = useState<'chat' | 'tour'>('chat');

  // Listen for global custom open event (e.g. from Hero CTA buttons or navigation)
  useEffect(() => {
    const handleOpenGuide = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'chat' | 'tour' }>;
      setIsDialogueOpen(true);
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

  return (
    <aside
      className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end pointer-events-none select-none"
      aria-label="V.E.D.A. AI Portfolio Guide"
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

      {/* Floating Modern V.E.D.A. Guide Pill (No Chibi, No Character Sticker) */}
      {!isDialogueOpen && (
        <button
          onClick={() => setIsDialogueOpen(true)}
          className="pointer-events-auto px-4 py-2.5 rounded-full bg-cream-surface/95 dark:bg-[#2A0E1A]/95 hover:bg-burgundy text-wine dark:text-cream hover:text-cream border border-burgundy/25 dark:border-white/20 shadow-cad hover:shadow-xl backdrop-blur-md text-xs font-mono font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
          title="Open V.E.D.A. Portfolio Guide"
          aria-label="Open V.E.D.A. Portfolio Guide"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Bot className="w-4 h-4 text-emerald-600 group-hover:text-cream transition-colors" />
          <span>Ask V.E.D.A. for guides</span>
          <Sparkles className="w-3 h-3 text-dusky group-hover:text-amber-300" />
        </button>
      )}
    </aside>
  );
};
