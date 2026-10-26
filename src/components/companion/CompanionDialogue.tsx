import React from 'react';
import { ChibiState } from '../../types/chibi';
import { X, Laptop, Wrench, Lightbulb, Sparkles, ArrowRight, Terminal, Hand } from 'lucide-react';

interface CompanionDialogueProps {
  state: ChibiState;
  activeSection: string;
  onClose: () => void;
  onSetState: (state: ChibiState) => void;
  onNavigate: (sectionId: string) => void;
  easterEggCount: number;
}

export const CompanionDialogue: React.FC<CompanionDialogueProps> = ({
  state,
  activeSection,
  onClose,
  onSetState,
  onNavigate,
  easterEggCount,
}) => {
  // Determine contextual dialogue based on state and section
  const getDialogue = (): { text: string; actionText?: string; actionId?: string } => {
    if (state === 'sleeping') {
      return {
        text: 'Zzz... recharging servos, PID controllers & battery rails. Tap me to wake up!',
        actionText: 'Wake Vasudev Up',
        actionId: 'wake',
      };
    }

    if (state === 'celebrating') {
      return {
        text: '🌸 OVERDRIVE ACTIVATED! You found Dabi\'s secret protocol! Enjoy the cherry blossom & spider lily petals! 🌺',
        actionText: 'Inspect First-Responder',
        actionId: 'projects',
      };
    }

    if (state === 'coding') {
      return {
        text: 'In the zone! Working on Drive-by-Wire CAN bus on Jetson Orin Nano & ROS 2/Nav2 for the emergency rover.',
        actionText: 'View Autonomous Rover',
        actionId: 'projects',
      };
    }

    if (state === 'engineering') {
      return {
        text: 'Analyzing suspension roll-centre migration in Lotus SHARK & Ackermann steering for Equinox aBAJA 2026 buggy!',
        actionText: 'Explore Equinox CAD',
        actionId: 'projects',
      };
    }

    if (state === 'thinking') {
      return {
        text: 'Optimizing acoustic threat heuristics for Silent Guardian & multi-joint inverse kinematics for MediArm...',
        actionText: 'Read Lab Experiments',
        actionId: 'experiments',
      };
    }

    // Section-based defaults
    switch (activeSection) {
      case 'about':
        return {
          text: "Here's my engineering background at Saintgits College (APJ KTU)! Want to explore what I build?",
          actionText: 'View Projects',
          actionId: 'projects',
        };
      case 'projects':
        return {
          text: 'Each project case study features verified CAD models, ROS 2 pipelines, and truthful architecture!',
          actionText: 'Query V.E.D.A. AI',
          actionId: 'veda',
        };
      case 'veda':
        return {
          text: 'You are now interacting with V.E.D.A. AI! Ask any technical question or run commands like "baja" or "robotics".',
          actionText: 'Explore Systems & Skills',
          actionId: 'skills',
        };
      case 'skills':
        return {
          text: 'My skills are organized as connected cyber-physical systems rather than arbitrary percentages.',
          actionText: 'See Journey',
          actionId: 'journey',
        };
      case 'journey':
        return {
          text: 'From starting B.Tech at Saintgits to NIT Calicut automation research & leading Equinox steering CAD!',
          actionText: 'View Credentials',
          actionId: 'credentials',
        };
      case 'credentials':
        return {
          text: 'Verified certifications from NIT Calicut, Techmaghi, Dassault Systèmes, and Open Robotics.',
          actionText: 'Contact Vasudev',
          actionId: 'contact',
        };
      case 'contact':
        return {
          text: 'Looking for a dedicated robotics engineer or embedded firmware developer? Let’s talk!',
          actionText: 'Send Email',
          actionId: 'contact',
        };
      case 'hero':
      default:
        return {
          text: "Hey! I'm Dabi's mini-me chibi companion. Welcome to my studio! You can play the soothing cherry blossom zen ambience at the bottom-left 🌸",
          actionText: 'Explore Case Studies',
          actionId: 'projects',
        };
    }
  };

  const dialogue = getDialogue();

  return (
    <div
      className="w-72 sm:w-80 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-xl p-4 text-xs font-mono text-wine relative animate-in fade-in slide-in-from-bottom-3 duration-200 backdrop-blur-sm"
      role="complementary"
      aria-label="Chibi companion dialogue"
    >
      {/* CAD Pointer arrow towards chibi */}
      <div className="absolute -bottom-2 right-8 w-4 h-4 bg-cream-surface border-r border-b border-burgundy/20 transform rotate-45 pointer-events-none" />

      {/* Header with Title & Dismiss */}
      <div className="flex items-center justify-between pb-2 border-b border-burgundy/10 mb-2.5">
        <div className="flex items-center space-x-1.5 text-[10px] text-taupe uppercase tracking-wider font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>VASUDEV.CHIBI // COMPANION</span>
          {easterEggCount > 0 && easterEggCount < 5 && (
            <span className="text-[9px] text-dusky font-bold">({easterEggCount}/5)</span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-taupe hover:text-wine hover:bg-cream transition-colors"
          title="Dismiss speech bubble"
          aria-label="Close dialogue"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Speech Text Content */}
      <p className="text-wine text-xs leading-relaxed font-sans font-medium mb-3">
        {dialogue.text}
      </p>

      {/* Action Buttons: Primary & VEDA AI Launcher */}
      <div className="space-y-1.5 mb-3">
        {dialogue.actionText && (
          <button
            onClick={() => {
              if (dialogue.actionId === 'wake') {
                onSetState('greeting');
              } else if (dialogue.actionId) {
                onNavigate(dialogue.actionId);
              }
            }}
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-burgundy hover:bg-wine text-cream text-[11px] font-mono font-semibold transition-all shadow-sm active:scale-98"
          >
            <span>{dialogue.actionText}</span>
            <ArrowRight className="w-3 h-3 text-dusky" />
          </button>
        )}

        <button
          onClick={() => onNavigate('veda')}
          className="w-full flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cream-surface hover:bg-cream-darker/60 text-wine border border-emerald-600/30 text-[10px] font-mono font-semibold transition-all shadow-sm active:scale-98"
          title="Launch V.E.D.A. AI Interactive Console"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <Terminal className="w-3 h-3 text-emerald-600" />
          <span>Launch V.E.D.A. AI Terminal</span>
        </button>
      </div>

      {/* Mini Companion Interactive Modes Grid */}
      <div className="pt-2 border-t border-burgundy/10 grid grid-cols-5 gap-1 text-[9px] font-mono">
        <button
          onClick={() => onSetState('greeting')}
          className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-colors ${
            state === 'greeting'
              ? 'bg-burgundy text-cream font-bold shadow-sm'
              : 'hover:bg-cream text-taupe hover:text-wine'
          }`}
          title="Switch to waving greeting mode"
        >
          <Hand className="w-3 h-3 mb-0.5" />
          <span>Wave</span>
        </button>

        <button
          onClick={() => onSetState('coding')}
          className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-colors ${
            state === 'coding'
              ? 'bg-burgundy text-cream font-bold shadow-sm'
              : 'hover:bg-cream text-taupe hover:text-wine'
          }`}
          title="Switch to coding mode"
        >
          <Laptop className="w-3 h-3 mb-0.5" />
          <span>Code</span>
        </button>

        <button
          onClick={() => onSetState('engineering')}
          className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-colors ${
            state === 'engineering'
              ? 'bg-burgundy text-cream font-bold shadow-sm'
              : 'hover:bg-cream text-taupe hover:text-wine'
          }`}
          title="Switch to CAD engineering mode"
        >
          <Wrench className="w-3 h-3 mb-0.5" />
          <span>CAD</span>
        </button>

        <button
          onClick={() => onSetState('thinking')}
          className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-colors ${
            state === 'thinking'
              ? 'bg-burgundy text-cream font-bold shadow-sm'
              : 'hover:bg-cream text-taupe hover:text-wine'
          }`}
          title="Switch to thinking mode"
        >
          <Lightbulb className="w-3 h-3 mb-0.5" />
          <span>Think</span>
        </button>

        <button
          onClick={() => onSetState('celebrating')}
          className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-colors ${
            state === 'celebrating'
              ? 'bg-burgundy text-cream font-bold shadow-sm'
              : 'hover:bg-cream text-taupe hover:text-wine'
          }`}
          title="Trigger petal celebration"
        >
          <Sparkles className="w-3 h-3 mb-0.5 text-amber-500" />
          <span>Party</span>
        </button>
      </div>
    </div>
  );
};
