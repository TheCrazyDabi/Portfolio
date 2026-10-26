import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Compass,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Shield,
  Bot,
  MapPin,
  ExternalLink,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  GuideMessage,
  GuideAction,
  TourStep,
  TOUR_STEPS,
  SUGGESTED_QUESTIONS,
  VedaGuideService
} from '../../services/vedaGuideService';
import { VedaBackendAdapter } from '../../services/vedaBackendAdapter';

interface VedaGuidePanelProps {
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  initialMode?: 'chat' | 'tour';
}

export const VedaGuidePanel: React.FC<VedaGuidePanelProps> = ({
  onClose,
  onNavigate,
  activeSection,
  initialMode = 'chat',
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'tour'>(initialMode);
  const [messages, setMessages] = useState<GuideMessage[]>([
    {
      id: 'welcome-1',
      sender: 'veda',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Hello! I'm V.E.D.A., Vasudev's portfolio guide. Ask me about his robotics projects, aBAJA SAE CAD work, embedded firmware, or let me guide you through his work!",
      pose: 'greeting',
      actions: [
        { label: 'Start Guided Tour', type: 'tour', target: 'start' },
        { label: 'View Equinox aBAJA', type: 'navigate', target: 'projects' },
        { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Guided Tour State
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const currentStep = TOUR_STEPS[currentTourIndex];

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat internally to bottom without moving the browser viewport/window
  useEffect(() => {
    if (activeTab === 'chat' && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeTab]);

  // Handle sending a question
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: GuideMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: trimmed
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await VedaBackendAdapter.query(trimmed, activeSection);
      setMessages((prev) => [...prev, botResponse]);
      if (botResponse.navigationTarget) {
        onNavigate(botResponse.navigationTarget);
      }
    } catch {
      const fallback = await VedaGuideService.answerQuestion(trimmed, activeSection);
      setMessages((prev) => [...prev, fallback]);
      if (fallback.navigationTarget) {
        onNavigate(fallback.navigationTarget);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const handleActionClick = (action: { label: string; type: string; target: string }) => {
    if (action.type === 'navigate') {
      onNavigate(action.target);
    } else if (action.type === 'tour') {
      setActiveTab('tour');
      setCurrentTourIndex(0);
      onNavigate(TOUR_STEPS[0].sectionId);
    } else if (action.type === 'external') {
      window.open(action.target, '_blank');
    }
  };

  // Tour Handlers
  const handleNextTourStep = () => {
    if (currentTourIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentTourIndex + 1;
      setCurrentTourIndex(nextIdx);
      onNavigate(TOUR_STEPS[nextIdx].sectionId);
    } else {
      // Completed tour!
      setActiveTab('chat');
      setMessages((prev) => [
        ...prev,
        {
          id: `tour-complete-${Date.now()}`,
          sender: 'veda',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "🎉 You have completed the guided tour of Vasudev's engineering studio! Feel free to ask any deeper technical questions or inspect his credentials below.",
          pose: 'celebrating',
          actions: [
            { label: 'Explore Credentials', type: 'navigate', target: 'credentials' },
            { label: 'Get in Touch', type: 'navigate', target: 'contact' }
          ]
        }
      ]);
    }
  };

  const handlePrevTourStep = () => {
    if (currentTourIndex > 0) {
      const prevIdx = currentTourIndex - 1;
      setCurrentTourIndex(prevIdx);
      onNavigate(TOUR_STEPS[prevIdx].sectionId);
    }
  };

  const handleSkipTour = () => {
    setActiveTab('chat');
  };

  return (
    <div
      className="veda-guide-panel w-[min(24rem,calc(100vw-1.5rem))] sm:w-96 max-h-[min(540px,calc(100vh-6.5rem))] rounded-2xl bg-cream-surface/98 dark:bg-[#2A0E1A]/98 border border-burgundy/25 dark:border-white/20 shadow-2xl backdrop-blur-md flex flex-col overflow-hidden text-wine dark:text-cream animate-in fade-in slide-in-from-bottom-4 duration-250 select-text"
      role="region"
      aria-label="V.E.D.A. AI Portfolio Walkthrough Guide"
    >
      {/* Chrome Header with Branding and Tab Switcher */}
      <div className="p-3 bg-cream dark:bg-[#200A13] border-b border-burgundy/15 dark:border-white/10 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-burgundy flex items-center justify-center text-cream shadow-sm">
              <Bot className="w-3.5 h-3.5 text-dusky" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-bold text-xs tracking-tight text-wine dark:text-cream">
                  V.E.D.A.
                </span>
                <span className="text-[10px] font-mono text-taupe dark:text-dusky uppercase tracking-wider">
                  // Portfolio Guide
                </span>
              </div>
              <div className="flex items-center space-x-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Local Deterministic Engine</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-taupe hover:text-wine dark:hover:text-cream hover:bg-cream-darker/60 dark:hover:bg-white/10 transition-colors"
            title="Close guide panel"
            aria-label="Close guide panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 p-0.5 rounded-xl bg-burgundy/5 dark:bg-white/5 border border-burgundy/10 dark:border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-burgundy text-cream font-semibold shadow-sm'
                : 'text-taupe dark:text-dusky hover:text-wine dark:hover:text-cream'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask V.E.D.A.</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tour');
              onNavigate(currentStep.sectionId);
            }}
            className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'tour'
                ? 'bg-burgundy text-cream font-semibold shadow-sm'
                : 'text-taupe dark:text-dusky hover:text-wine dark:hover:text-cream'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>
        </div>
      </div>

      {/* Mode A: Conversational Chat */}
      {activeTab === 'chat' && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Chat Area */}
          <div ref={chatScrollRef} className="flex-1 p-3.5 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-burgundy text-cream rounded-tr-sm'
                      : 'bg-cream dark:bg-[#341221] border border-burgundy/15 dark:border-white/10 text-wine dark:text-cream rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Contextual Action Buttons in Bot Messages */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-burgundy/10 dark:border-white/10 flex flex-wrap gap-1.5">
                      {msg.actions.map((act: GuideAction, i: number) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-burgundy/10 dark:bg-white/10 hover:bg-burgundy hover:text-cream text-burgundy dark:text-blush text-[10px] font-mono font-medium transition-colors"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-taupe dark:text-dusky/80 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-cream dark:bg-[#341221] border border-burgundy/15 text-taupe text-xs font-mono max-w-[120px]">
                <span className="w-1.5 h-1.5 rounded-full bg-dusky animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-dusky animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-dusky animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] pl-1">V.E.D.A. ...</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-3 py-2 border-t border-burgundy/10 dark:border-white/10 bg-cream/50 dark:bg-[#200A13]/50 shrink-0">
            <div className="text-[10px] font-mono text-taupe dark:text-dusky mb-1.5 flex items-center justify-between">
              <span>SUGGESTED INQUIRIES:</span>
              <Sparkles className="w-2.5 h-2.5 text-dusky" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-cream-surface dark:bg-[#341221] hover:bg-burgundy hover:text-cream text-wine dark:text-cream border border-burgundy/15 dark:border-white/10 text-[10px] font-mono transition-colors shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Footer */}
          <div className="p-3 bg-cream dark:bg-[#200A13] border-t border-burgundy/15 dark:border-white/10 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about robotics, Baja, CAD, skills..."
              className="flex-1 bg-cream-surface dark:bg-[#341221] border border-burgundy/20 dark:border-white/15 rounded-xl px-3 py-2 text-xs text-wine dark:text-cream placeholder:text-taupe focus:outline-none focus:ring-1 focus:ring-burgundy font-sans"
              maxLength={200}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="p-2 rounded-xl bg-burgundy hover:bg-wine disabled:opacity-40 text-cream transition-colors shadow-sm"
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5 text-dusky" />
            </button>
          </div>
        </div>
      )}

      {/* Mode B: Guided Tour */}
      {activeTab === 'tour' && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-cream/40 dark:bg-[#220B14]/40">
          {/* Scrollable Tour Content Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5">
            {/* Step Counter & Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-burgundy dark:text-blush">
                  STEP {currentTourIndex + 1} OF {TOUR_STEPS.length}
                </span>
                <span className="text-taupe dark:text-dusky uppercase tracking-wider text-[10px]">
                  {currentStep.sectionId}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-burgundy/15 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-burgundy dark:bg-blush transition-all duration-300"
                  style={{
                    width: `${((currentTourIndex + 1) / TOUR_STEPS.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Current Step Card */}
            <div className="p-3.5 rounded-xl bg-cream-surface dark:bg-[#341221] border border-burgundy/20 dark:border-white/10 shadow-sm space-y-2.5">
              <div>
                <h3 className="font-display font-bold text-wine dark:text-cream text-base">
                  {currentStep.title}
                </h3>
                <p className="text-[11px] font-mono text-burgundy dark:text-dusky font-medium">
                  {currentStep.subtitle}
                </p>
              </div>

              <p className="text-xs text-taupe-dark dark:text-cream/90 font-sans leading-relaxed">
                {currentStep.description}
              </p>

              {/* Highlight Bullet Tips */}
              <div className="pt-2 border-t border-burgundy/10 dark:border-white/10 space-y-1">
                <span className="text-[9px] font-mono text-taupe uppercase tracking-wider font-semibold">
                  KEY HIGHLIGHTS:
                </span>
                <ul className="space-y-1 text-[11px] text-wine dark:text-cream/80 font-sans">
                  {currentStep.highlightTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-burgundy dark:text-blush font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Section Action */}
              <button
                onClick={() => onNavigate(currentStep.sectionId)}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-burgundy/10 dark:bg-white/10 hover:bg-burgundy hover:text-cream text-burgundy dark:text-blush text-xs font-mono font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-dusky" />
                <span>Scroll to {currentStep.title.split(' ')[0]} Section</span>
              </button>
            </div>
          </div>

          {/* Tour Navigation Controls Bar (Cleanly pinned above footer, NEVER overlapping) */}
          <div className="p-2.5 sm:p-3 bg-cream dark:bg-[#200A13] border-t border-burgundy/15 dark:border-white/10 flex items-center justify-between gap-2 shrink-0 z-10 shadow-sm">
            <button
              onClick={handlePrevTourStep}
              disabled={currentTourIndex === 0}
              className="px-3.5 py-1.5 rounded-xl border border-burgundy/20 dark:border-white/20 text-xs font-mono text-wine dark:text-cream hover:bg-cream-darker/60 disabled:opacity-30 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSkipTour}
              className="text-[11px] font-mono text-taupe hover:text-wine dark:hover:text-cream underline transition-colors px-2 py-1"
            >
              Exit Tour
            </button>

            <button
              onClick={handleNextTourStep}
              className="px-4 py-1.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>{currentTourIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-dusky" />
            </button>
          </div>
        </div>
      )}

      {/* Footer Privacy Stamp */}
      <div className="px-3.5 py-1.5 bg-cream-darker/80 dark:bg-[#18050E] text-[9px] font-mono text-taupe dark:text-dusky/80 flex items-center justify-between border-t border-burgundy/10 dark:border-white/10 select-none shrink-0">
        <span className="flex items-center gap-1">
          <Shield className="w-2.5 h-2.5 text-emerald-600" />
          <span>Strict In-Browser Memory · 0 Cloud Tracking</span>
        </span>
        <span>v2.4</span>
      </div>
    </div>
  );
};
