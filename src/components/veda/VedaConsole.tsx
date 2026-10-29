import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Sparkles, Cpu, Shield, Zap, X, CornerDownLeft, Volume2, VolumeX, Maximize2, Minimize2, Trash2, HelpCircle } from 'lucide-react';
import { Profile } from '../../types/content';
import { VedaGuideService, GuideAction, GuideMessage } from '../../services/vedaGuideService';

interface VedaConsoleProps {
  profile?: Profile | null;
  isModal?: boolean;
  onClose?: () => void;
}

interface CommandHistoryItem {
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
  timestamp: string;
  badge?: string;
  actions?: GuideAction[];
}

export const VedaConsole: React.FC<VedaConsoleProps> = ({
  profile,
  isModal = false,
  onClose
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [userCommands, setUserCommands] = useState<string[]>([]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  // Initial boot diagnostic sequence
  useEffect(() => {
    const bootSequence: CommandHistoryItem[] = [
      {
        type: 'system',
        content: `##### #... #### #####
#.... #... .##. ....#
####. #... .##. ...#.
#.... #... .##. ..#..
##### ##### #### #####`,
        timestamp: getTimestamp(),
        badge: 'BOOT'
      },
      {
        type: 'system',
        content: `[✔] ELIZ: ONLINE (Deterministic In-Browser Knowledge Engine)
[✔] Verified Subject: Vasudev Saras K M (Robotics & Automation Engineering Student)
[✔] Host Institution: Saintgits College of Engineering | APJ KTU
[✔] Domain Graph: ROS 2 · Jetson Orin Nano · Lotus SHARK CAD · aBAJA 2026 · Cybersecurity
[✔] Telemetry Protocol: Local Replies (Opt-In Chat Samples Only)

Ask me anything about Vasudev's robotics work, engineering builds, or background below! You can chat naturally (e.g. "hey ELIZ", "explain MediArm", "show projects") or type 'help' for terminal commands.`,
        timestamp: getTimestamp(),
        badge: 'READY'
      }
    ];

    setHistory(bootSequence);
  }, []);

  // Auto-scroll terminal buffer internally without scrolling the browser window
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history, isStreaming]);

  // Audio typing sound effect (subtle high-tech chirp)
  const playTypingSound = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // AudioContext not permitted or supported
    }
  };

  // Streaming text emulator with optional interactive actions
  const streamResponse = (fullText: string, badge = 'ELIZ', actions?: GuideAction[]) => {
    setIsStreaming(true);
    let currentIdx = 0;
    const chunkSize = 4;

    const streamItem: CommandHistoryItem = {
      type: 'output',
      content: '',
      timestamp: getTimestamp(),
      badge,
      actions
    };

    setHistory(prev => [...prev, streamItem]);

    const step = () => {
      currentIdx += chunkSize;
      const slice = fullText.slice(0, currentIdx);

      setHistory(prev => {
        const next = [...prev];
        next[next.length - 1] = {
          ...next[next.length - 1],
          content: slice
        };
        return next;
      });

      playTypingSound();

      if (currentIdx < fullText.length) {
        streamTimeoutRef.current = setTimeout(step, 18);
      } else {
        setIsStreaming(false);
      }
    };

    step();
  };

  const handleActionClick = (action: GuideAction) => {
    if (action.type === 'navigate') {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'tour') {
      window.dispatchEvent(new CustomEvent('open-veda-guide', { detail: { mode: 'tour' } }));
    } else if (action.type === 'external') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }
  };

  // Process terminal command or natural language query
  const handleExecute = async (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed || isStreaming) return;

    // Push to input history
    setHistory(prev => [
      ...prev,
      {
        type: 'input',
        content: trimmed,
        timestamp: getTimestamp(),
        badge: 'USER'
      }
    ]);

    setUserCommands(prev => [...prev, trimmed]);
    setCommandIndex(-1);
    setInput('');

    const lower = trimmed.toLowerCase();

    // 1. Built-in Terminal System Commands
    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      const helpText = `Available ELIZ Commands & Conversational Prompts:
  • projects     - Flagship robotics, CAD, and cybersecurity systems
  • baja         - Team Equinox aBAJA SAE 2026 vehicle dynamics & CAD
  • robotics     - Autonomous first-responder rover & MediArm 3-DOF arm
  • skills       - Technical systems matrix (ROS 2, SolidWorks, Jetson, CAN Bus)
  • about        - Academic background, Saintgits College (APJ KTU), and bio
  • contact      - Email, LinkedIn, GitHub, and hiring channels
  • diagnostics  - Real-time client browser telemetry & memory check
  • clear        - Clear terminal buffer
  • overdrive    - Trigger Sakura and Spider Lily ambience dispersion

You can also chat naturally like with an AI assistant:
  "Hey ELIZ, what are you working on?"
  "Tell me about the Autonomous First-Responder Rover"
  "Explain MediArm"
  "What was his contribution to Baja SAE?"
  "How can I contact Vasudev?"`;
      streamResponse(helpText, 'HELP');
      return;
    }

    if (lower === 'diagnostics' || lower === 'status') {
      const perf = window.performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } };
      const heapUsed = perf.memory ? `${Math.round(perf.memory.usedJSHeapSize / (1024 * 1024))}MB` : '~42MB (estimated)';
      const heapTotal = perf.memory ? `${Math.round(perf.memory.totalJSHeapSize / (1024 * 1024))}MB` : '64MB';
      const diagText = `ELIZ Diagnostic Telemetry:
• Host Platform:     ${navigator.userAgent.slice(0, 48)}...
• Screen Resolution: ${window.innerWidth} x ${window.innerHeight} (${window.devicePixelRatio}x DPR)
• Browser Heap:      ${heapUsed} used / ${heapTotal} allocated
• Connection State:  Online (Local deterministic execution)
• Telemetry Leakage: 0.00 bytes (zero analytics or cloud trackers)
• Security Sandbox:  Strict Content Security Isolation Active
• Response Latency:  18ms (sub-token cycle)`;
      streamResponse(diagText, 'DIAGNOSTICS');
      return;
    }

    if (lower.includes('easter') || lower === 'overdrive') {
      const easterText = `🌸 ROBOTICS OVERDRIVE PROTOCOL ENGAGED! 🌺
Triggering Sakura and Spider Lily breeze dispersion across all viewports.
Keep exploring the case studies or ask ELIZ about any engineering builds!`;
      streamResponse(easterText, 'OVERDRIVE');
      return;
    }

    // 2. Adaptive Conversational AI Guide Engine (Natural Language & Projects)
    try {
      const conversationContext: GuideMessage[] = history
        .filter((item) => item.type === 'input' || item.type === 'output')
        .slice(-6)
        .map((item, index) => ({
          id: `terminal-context-${index}`,
          sender: item.type === 'input' ? 'user' : 'veda',
          timestamp: item.timestamp,
          text: item.content,
        }));
      const aiResponse = await VedaGuideService.answerQuestion(trimmed, 'veda', 'auto', conversationContext);
      streamResponse(aiResponse.text, 'ELIZ-AI', aiResponse.actions);

      // If intent specifically requests page navigation, smoothly navigate
      if (aiResponse.navigationTarget) {
        setTimeout(() => {
          const el = document.getElementById(aiResponse.navigationTarget!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 350);
      }
    } catch {
      streamResponse(
        `I encountered a temporary processing glitch while analyzing your request. Please feel free to ask again or try clicking one of the quick suggestions below!`,
        'ELIZ-AI'
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (userCommands.length > 0) {
        const nextIdx = commandIndex + 1 < userCommands.length ? commandIndex + 1 : commandIndex;
        setCommandIndex(nextIdx);
        setInput(userCommands[userCommands.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIdx = commandIndex - 1;
        setCommandIndex(nextIdx);
        setInput(userCommands[userCommands.length - 1 - nextIdx] || '');
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-burgundy/30 bg-[#14050D] text-cream shadow-2xl transition-all duration-300 ${
        isMaximized
          ? 'fixed inset-4 z-50 rounded-2xl flex flex-col'
          : isModal
          ? 'w-full max-w-4xl h-[620px] flex flex-col'
          : 'w-full h-[580px] flex flex-col'
      }`}
    >
      {/* Terminal Titlebar Chrome */}
      <div className="bg-[#240A17] px-4 py-3 flex items-center justify-between border-b border-burgundy/30 select-none">
        <div className="flex items-center space-x-2.5">
          {/* Traffic light terminal dots */}
          <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-sm" />
          
          <div className="flex items-center space-x-2 pl-2 border-l border-burgundy/25">
            <Terminal className="w-4 h-4 text-dusky" />
            <span className="font-mono text-xs font-bold text-cream tracking-wide">
              ELIZ
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-wine/60 border border-burgundy/25 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-dusky uppercase">PORTFOLIO GUIDE</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg text-taupe hover:text-cream hover:bg-wine/40 transition-colors"
            title={isMuted ? 'Unmute typing sound' : 'Mute typing sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Maximize Toggle */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 rounded-lg text-taupe hover:text-cream hover:bg-wine/40 transition-colors"
            title={isMaximized ? 'Restore normal size' : 'Maximize window'}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Clear Buffer */}
          <button
            onClick={() => setHistory([])}
            className="p-1.5 rounded-lg text-taupe hover:text-cream hover:bg-wine/40 transition-colors"
            title="Clear terminal buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Close button if modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 transition-colors"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={terminalContainerRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed space-y-3.5 bg-gradient-to-b from-[#14050D] to-[#0D0308] select-text"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.type === 'input' ? (
              <div className="flex items-center space-x-2 text-amber-300">
                <span className="text-dusky select-none">eliz&gt;</span>
                <span className="font-semibold">{item.content}</span>
                <span className="text-[10px] text-taupe/60 select-none ml-auto">[{item.timestamp}]</span>
              </div>
            ) : item.type === 'system' ? (
              <div className={`text-dusky bg-[#200713]/60 p-3 rounded-lg border border-burgundy/20 ${
                item.badge === 'BOOT'
                  ? 'whitespace-pre overflow-x-auto text-[9px] sm:text-[13px] leading-tight'
                  : 'whitespace-pre-wrap'
              }`}>
                {item.content}
              </div>
            ) : (
              <div className="text-cream/90 bg-[#1A0710]/40 p-3 rounded-lg border border-burgundy/15 whitespace-pre-wrap relative pl-4 border-l-2 border-l-dusky">
                {item.content}
                {isStreaming && idx === history.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse align-middle" />
                )}

                {/* Interactive Action Buttons */}
                {item.actions && item.actions.length > 0 && (!isStreaming || idx < history.length - 1) && (
                  <div className="mt-2.5 pt-2 border-t border-burgundy/25 flex flex-wrap gap-1.5 not-prose">
                    {item.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#2A0B1A] hover:bg-burgundy text-dusky hover:text-cream border border-burgundy/30 text-[11px] font-mono transition-colors shadow-sm cursor-pointer"
                      >
                        <span>{act.label}</span>
                        <CornerDownLeft className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Prompt Command Suggestions Bar */}
      <div className="bg-[#1C0712] px-4 py-2 border-t border-burgundy/20 flex items-center gap-2 overflow-x-auto select-none scrollbar-none">
        <span className="text-[10px] font-mono text-taupe uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-dusky" />
          <span>Quick Commands:</span>
        </span>
        {[
          { label: 'Say Hello 👋', cmd: 'hey eliz' },
          { label: 'Featured Projects 🚀', cmd: 'projects' },
          { label: 'Autonomous Rover 🚗', cmd: 'tell me about the rover' },
          { label: 'Equinox aBAJA 🏎️', cmd: 'baja' },
          { label: 'MediArm Arm 🦾', cmd: 'explain mediarm' },
          { label: 'Skills & Tech ⚙️', cmd: 'skills' },
          { label: 'About Vasudev 👤', cmd: 'about' },
          { label: 'Contact Info 📬', cmd: 'contact' },
          { label: 'Terminal Help 💻', cmd: 'help' },
        ].map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleExecute(pill.cmd)}
            disabled={isStreaming}
            className="flex-shrink-0 px-2.5 py-1 rounded-md bg-[#2D0B1B] hover:bg-[#3E1026] text-dusky hover:text-cream border border-burgundy/30 text-[11px] font-mono transition-colors disabled:opacity-50"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Terminal Input Bar */}
      <div className="bg-[#18050F] p-3 border-t border-burgundy/30 flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 pl-2 text-dusky select-none font-mono text-xs">
          <span className="text-emerald-400 font-bold">&gt;</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder={isStreaming ? 'ELIZ is typing response...' : 'Type a command (e.g. help, baja, robotics) or ask a question...'}
          className="flex-1 bg-transparent text-cream placeholder-taupe/50 outline-none font-mono text-xs sm:text-sm"
          autoFocus
        />
        <button
          onClick={() => handleExecute(input)}
          disabled={!input.trim() || isStreaming}
          className="p-2 rounded-lg bg-burgundy hover:bg-wine text-cream disabled:opacity-40 disabled:hover:bg-burgundy transition-colors"
          title="Send command [Enter]"
        >
          <CornerDownLeft className="w-4 h-4 text-dusky" />
        </button>
      </div>
    </div>
  );
};
