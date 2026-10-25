import React from 'react';
import { ChibiState } from '../../types/chibi';
import { X, Laptop, Wrench, Lightbulb, Compass, Send, Sparkles, Moon, ArrowRight } from 'lucide-react';

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
        text: 'Zzz... recharging servos and PID controllers. Tap me to wake up!',
        actionText: 'Wake Vasudev Up',
        actionId: 'wake',
      };
    }

    if (state === 'celebrating') {
      return {
        text: '🎉 SECRET PROTOCOL UNLOCKED: Robotics Overdrive! Thanks for exploring every detail of my work!',
        actionText: 'Inspect Kinematics',
        actionId: 'hero',
      };
    }

    if (state === 'coding') {
      return {
        text: 'In the zone! Compiling firmware and Python test suites. Check out my project architectures below.',
        actionText: 'View MediArm & V.E.D.A.',
        actionId: 'projects',
      };
    }

    if (state === 'engineering') {
      return {
        text: 'Checking joint clearances and Ackermann steering linkages in SolidWorks. Precision is everything.',
        actionText: 'Explore Systems Topology',
        actionId: 'skills',
      };
    }

    if (state === 'thinking') {
      return {
        text: 'Contemplating how to optimize closed-loop motor torque and eliminate bump-steer dynamics...',
        actionText: 'Read Lab Experiments',
        actionId: 'experiments',
      };
    }

    // Section-based defaults
    switch (activeSection) {
      case 'about':
        return {
          text: "Here's my engineering background at Saintgits College! Want to see what I build?",
          actionText: 'View Projects',
          actionId: 'projects',
        };
      case 'projects':
        return {
          text: 'Each project case study features verified CAD models, architectures, and lessons learned!',
          actionText: 'Jump to Systems',
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
          text: 'From starting B.Tech at Saintgits to leading Baja SAE steering CAD and building V.E.D.A.!',
          actionText: 'View Credentials',
          actionId: 'credentials',
        };
      case 'credentials':
        return {
          text: 'Verified certifications from Dassault Systèmes, Open Robotics, and IEEE.',
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
          text: "Hey! I'm Vasudev's chibi companion. Welcome to my digital engineering studio!",
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
          <span>VASUDEV.BOT // COMPANION</span>
          {easterEggCount > 0 && easterEggCount < 5 && (
            <span className="text-[9px] text-dusky">({easterEggCount}/5)</span>
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

      {/* Dialogue Message */}
      <p className="text-xs font-sans text-taupe-dark leading-relaxed mb-3">
        {dialogue.text}
      </p>

      {/* Contextual Action Button */}
      {dialogue.actionText && (
        <button
          onClick={() => {
            if (dialogue.actionId === 'wake') {
              onSetState('greeting');
            } else if (dialogue.actionId) {
              onNavigate(dialogue.actionId);
            }
          }}
          className="w-full mb-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-burgundy hover:bg-wine text-cream text-[11px] font-mono font-medium transition-colors shadow-sm"
        >
          <span>{dialogue.actionText}</span>
          <ArrowRight className="w-3 h-3 text-dusky" />
        </button>
      )}

      {/* Mode Switcher Tool Bar */}
      <div className="pt-2 border-t border-burgundy/10 flex items-center justify-between">
        <span className="text-[9px] text-taupe uppercase">Modes:</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              onSetState('coding');
              onNavigate('projects');
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              state === 'coding' ? 'bg-burgundy text-cream' : 'text-taupe hover:text-wine hover:bg-cream'
            }`}
            title="Coding Mode (Go to Projects)"
            aria-label="Switch to coding mode"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              onSetState('engineering');
              onNavigate('skills');
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              state === 'engineering' ? 'bg-burgundy text-cream' : 'text-taupe hover:text-wine hover:bg-cream'
            }`}
            title="Engineering Mode (Inspect Systems)"
            aria-label="Switch to engineering mode"
          >
            <Wrench className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSetState('thinking')}
            className={`p-1.5 rounded-lg transition-colors ${
              state === 'thinking' ? 'bg-burgundy text-cream' : 'text-taupe hover:text-wine hover:bg-cream'
            }`}
            title="Thinking Mode"
            aria-label="Switch to thinking mode"
          >
            <Lightbulb className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSetState(state === 'sleeping' ? 'greeting' : 'sleeping')}
            className={`p-1.5 rounded-lg transition-colors ${
              state === 'sleeping' ? 'bg-burgundy text-cream' : 'text-taupe hover:text-wine hover:bg-cream'
            }`}
            title={state === 'sleeping' ? 'Wake Up' : 'Rest / Sleep Mode'}
            aria-label="Toggle sleeping mode"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
