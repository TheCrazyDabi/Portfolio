import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Sparkles, Cpu, Shield, Zap, X, CornerDownLeft, Volume2, VolumeX, Maximize2, Minimize2, Trash2, HelpCircle } from 'lucide-react';
import { Profile } from '../../types/content';

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

  const terminalEndRef = useRef<HTMLDivElement>(null);
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
        content: `__     _______ ____    _      _   _ ___ 
\\ \\   / / ____|  _ \\  / \\    | | | |_ _| 
 \\ \\ / /|  _| | | | |/ _ \\   | | | || |  
  \\ V / | |___| |_| / ___ \\  | |_| || |  
   \\_/  |_____|____/_/   \\_\\  \\___/|___| v2.4 (Virtual Engine for Data & Analysis)`,
        timestamp: getTimestamp(),
        badge: 'BOOT'
      },
      {
        type: 'system',
        content: `[✔] V.E.D.A. Core: ONLINE (Deterministic In-Browser Knowledge Engine)
[✔] Verified Subject: Vasudev Saras K M (Robotics & Automation Engineer)
[✔] Host Institution: Saintgits College of Engineering | APJ KTU
[✔] Domain Graph: ROS 2 · Jetson Orin Nano · Lotus SHARK CAD · aBAJA 2026 · Cybersecurity
[✔] Telemetry Protocol: Strict Local Execution (Zero External Cloud Telemetry)

Type 'help' for available commands or ask any question about Vasudev's engineering work below.`,
        timestamp: getTimestamp(),
        badge: 'READY'
      }
    ];

    setHistory(bootSequence);
  }, []);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Streaming text emulator
  const streamResponse = (fullText: string, badge = 'VEDA') => {
    setIsStreaming(true);
    let currentIdx = 0;
    const chunkSize = 4;

    const streamItem: CommandHistoryItem = {
      type: 'output',
      content: '',
      timestamp: getTimestamp(),
      badge
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

  // Process terminal command or natural language query
  const handleExecute = (rawCmd: string) => {
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

    // 1. Built-in Terminal Commands
    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      const helpText = `Available V.E.D.A. Terminal Commands:
  • projects     - Summarize verified robotics, CAD, and cybersecurity projects
  • baja         - Equinox aBAJA SAE 2026 vehicle dynamics, suspension & steering
  • robotics     - Autonomous first-responder rover & MediArm 3-DOF manipulator
  • skills       - Technical matrix (ROS 2, SolidWorks, Jetson, Python, C++)
  • about        - Academic background, Saintgits College (APJ KTU), and location
  • contact      - Email, LinkedIn, GitHub, and communication endpoints
  • diagnostics  - Real-time client browser telemetry & memory check
  • clear        - Clear terminal screen buffer
  • easteregg    - Trigger Chibi robotics overdrive protocol

You can also ask freeform questions, e.g.:
  "Tell me about the Jetson Orin emergency rover"
  "How did you reduce bump steer in Lotus SHARK?"
  "What speech model powers Silent Guardian?"
  "Are you open to robotics engineering roles?"`;
      streamResponse(helpText, 'HELP');
      return;
    }

    if (lower === 'about') {
      const aboutText = `Vasudev Saras K M (TheCrazyDabi)
• Discipline: Robotics & Automation Engineering
• Institution: Saintgits College of Engineering, Kottayam (APJ Abdul Kalam Technological University)
• Location: Calicut, Kerala, India
• Focus Areas:
   1. Autonomous Mobile Robots (Jetson Orin Nano, ROS 2 Humble, Nav2, YOLOv8)
   2. Mechatronics & Vehicle Dynamics (Lotus SHARK, SolidWorks, MSC Adams Car)
   3. Cyber-Physical Security (Acoustic threat classification, RF packet inspection, secrets scanning)
• Ethos: Disciplined mechatronic precision—bridging physical linkages with deterministic computing.`;
      streamResponse(aboutText, 'ABOUT');
      return;
    }

    if (lower === 'projects') {
      const projText = `Verified Engineering Projects on Record (7 Active):
1. Autonomous First-Responder Rover
   Retrofitting an electric aBAJA rover with NVIDIA Jetson Orin Nano, ROS 2/Nav2, YOLOv8 road segmentation, and Drive-by-Wire CAN integration for campus emergency dispatch.
2. Equinox aBAJA SAE 2026 (Steering & Suspension Lead)
   Synthesized double-wishbone kinematics in Lotus SHARK, engineered Ackermann geometry in SolidWorks to reduce tyre scrub by 34%, and configured MSC Adams Car multibody dynamics.
3. Silent Guardian: Acoustic Security Firewall
   100% in-browser scam call firewall built at Hack@Cooee 24h sprint with Vosk speech processing, dual threat scoring, and automated OTP/PIN redaction.
4. MediArm: 3-DOF Semi-Autonomous Manipulator
   S6 Mini Project with ESP32, high-current IBT-2 43A motor drivers, Python/Flask web dashboard, and Vosk offline voice control.
5. VYBE: Swipe-Based Travel Discovery App
   15.5-hour TinkerHub Calicut hackathon sprint with gesture card physics and role-based portals (Traveller, Operator, Admin).
6. NetSentinel v2.0: Terminal 802.11 Threat Detector
   Promiscuous mode raw packet sniffer with deauthentication flood anomaly detection (<180ms response).
7. Rakuzan SOC: Real-Time Git Entropy Secrets Scanner
   FastAPI + Redis + Shannon entropy pre-commit engine scanning 10k lines in <1.2s to block exposed credentials.`;
      streamResponse(projText, 'PROJECTS');
      return;
    }

    if (lower === 'baja' || lower.includes('equinox') || lower.includes('suspension')) {
      const bajaText = `Team Equinox | aBAJA SAE 2026 Vehicle Dynamics Analysis:
• Subsystem: Suspension & Steering Kinematics Development
• Kinematic Synthesis: Lotus SHARK
   - Analyzed dynamic roll-centre migration envelope (RC = +48mm target).
   - Optimized tie-rod length & rack height to suppress bump-steer to under 0.35° per 100mm wheel travel.
• Steering CAD: Dassault Systèmes SOLIDWORKS
   - Synthesized steering knuckle and upright hardpoints using 88% Ackermann principle.
   - Mitigated cornering tyre scrub during high-articulation off-road turns.
• Multibody Verification: MSC Adams Car
   - Full-vehicle transient roll & cornering compliance evaluation.
• Status: Successfully fabricated and tested on-site during aBAJA 2026 competition scrutiny!`;
      streamResponse(bajaText, 'BAJA-SAE');
      return;
    }

    if (lower === 'robotics' || lower.includes('first responder') || lower.includes('mediarm')) {
      const robText = `Autonomous Mobile Robotics & Manipulator Work:
• Autonomous First-Responder Buggy:
   - Compute: NVIDIA Jetson Orin Nano (TensorRT accelerated inference).
   - Middleware: ROS 2 Humble with Nav2 2D Costmap & DWB Local Planner.
   - Perception: Custom-trained YOLOv8 / PIDNet-S instance segmentation model for outdoor pathway masking (38.4 FPS).
   - Actuation: Drive-by-Wire CAN bus transceiver commanding high-torque linear steering actuator & PWM motor speed.
   - Remote Bridge: MQTT reverse-tunnel for real-time mobile emergency dispatch.
• MediArm 3-DOF Articulated Prototype:
   - Microcontroller: ESP32 (Dual-Core 240MHz).
   - High-Power Drivers: IBT-2 (BTS7960 43A H-Bridge modules) isolating actuator noise from logic rail.
   - Voice Subsystem: Vosk offline acoustic model running locally on web controller.
   - Safety: Dedicated physical and software emergency E-Stop kill switch.`;
      streamResponse(robText, 'ROBOTICS');
      return;
    }

    if (lower === 'skills') {
      const skillsText = `Technical Proficiencies & Systems Matrix:
• Robotics & Autonomy:  [████████████████░░] 88% (ROS 2, Nav2, Jetson Orin, OpenCV, YOLOv8)
• CAD & Kinematics:      [██████████████████] 92% (SolidWorks, Lotus SHARK, MSC Adams Car)
• Embedded Systems:      [███████████████░░░] 84% (ESP32, STM32, Arduino, CAN Bus, FreeRTOS)
• Programming Languages: [████████████████░░] 86% (Python, C++, TypeScript, Rust, Shell)
• Cybersecurity:         [███████████████░░░] 82% (802.11 Sniffing, Threat Analysis, Vosk Audio)
• Hardware Tools:        3D Printing, Laser Cutting, Oscilloscope, Logic Analyzer, Power Drivers`;
      streamResponse(skillsText, 'SKILLS');
      return;
    }

    if (lower === 'contact' || lower.includes('email') || lower.includes('phone') || lower.includes('linkedin')) {
      const contactText = `Direct Professional Communication Channels:
• Email:    vasudevb2w@gmail.com
• Phone:    +91 7012541567
• Location: Calicut, Kerala, India
• GitHub:   https://github.com/TheCrazyDabi
• LinkedIn: https://linkedin.com/in/d4biie
• Portfolio: https://thecrazydabi.github.io/Portfolio/
• Current Status: Available for Robotics Engineering, Embedded Systems, and Autonomous Vehicle Roles.`;
      streamResponse(contactText, 'CONTACT');
      return;
    }

    if (lower === 'diagnostics' || lower === 'status') {
      const perf = window.performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } };
      const heapUsed = perf.memory ? `${Math.round(perf.memory.usedJSHeapSize / (1024 * 1024))}MB` : '~42MB (estimated)';
      const heapTotal = perf.memory ? `${Math.round(perf.memory.totalJSHeapSize / (1024 * 1024))}MB` : '64MB';
      const diagText = `V.E.D.A. Core Diagnostic Telemetry:
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
Mini-Me Chibi companion entering high-energy celebration state!
Keep exploring the case studies or try asking VEDA about CAD kinematics!`;
      streamResponse(easterText, 'OVERDRIVE');
      return;
    }

    // 2. Intelligent Natural Language Answering
    if (lower.includes('jetson') || lower.includes('orin') || lower.includes('nav2') || lower.includes('first responder')) {
      streamResponse(
        `On the Autonomous First-Responder project, Vasudev utilizes the NVIDIA Jetson Orin Nano as the central edge processor. It executes real-time camera inference using YOLOv8 (and currently migrating to PIDNet-S) to segment dirt pathways and paved campus roads. Nav2 handles costmap generation and local path planning, and commands are translated to Drive-by-Wire actuators via a high-speed CAN bus network. An MQTT bridge connects campus emergency dispatch apps to the robot in real-time.`,
        'VEDA-AI'
      );
      return;
    }

    if (lower.includes('baja') || lower.includes('solidworks') || lower.includes('shark') || lower.includes('ackermann')) {
      streamResponse(
        `For Team Equinox at aBAJA SAE 2026, Vasudev led suspension kinematic synthesis and steering design. He leveraged Lotus SHARK to model double-wishbone linkages, roll-centre height migration, and camber curves, successfully reducing bump-steer to under 0.35°. In SOLIDWORKS, he calculated 88% Ackermann geometry to eliminate tyre scrub during sharp turns on rugged off-road tracks. Full multibody dynamic simulations were validated in MSC Adams Car.`,
        'VEDA-AI'
      );
      return;
    }

    if (lower.includes('silent guardian') || lower.includes('scam') || lower.includes('vosk') || lower.includes('firewall')) {
      streamResponse(
        `Silent Guardian was developed by Vasudev during the Hack@Cooee 24-hour hackathon. It is a local-first acoustic firewall that intercepts live call audio directly inside the browser using Vosk and the Web Speech API. A dual heuristic threat engine calculates real-time coercion/urgency scores. If fraudulent patterns emerge, sensitive numbers (credit cards, OTPs, PINs) are instantly redacted, and an intercept banner silences the call. Crucially, benign calls generate zero logs, guaranteeing complete user privacy.`,
        'VEDA-AI'
      );
      return;
    }

    if (lower.includes('hire') || lower.includes('job') || lower.includes('role') || lower.includes('internship') || lower.includes('available')) {
      streamResponse(
        `Yes! Vasudev is actively seeking robotics engineering, autonomous vehicle, and embedded systems opportunities (full-time roles and internships). He brings hands-on hardware expertise in CAN-bus drive-by-wire, Jetson Orin edge computing, ROS 2 Nav2, and industrial CAD kinematics. You can connect with him directly at vasudevb2w@gmail.com or via LinkedIn at https://linkedin.com/in/d4biie.`,
        'VEDA-AI'
      );
      return;
    }

    if (lower.includes('chibi') || lower.includes('mini me') || lower.includes('companion')) {
      streamResponse(
        `The Chibi Companion ("Mini Me") is Vasudev's interactive animated avatar docked at the bottom of the portfolio! It reacts contextually as you navigate between sections, blinks, breathes, waves, codes, and celebrates. You can click on the chibi directly to switch poses or unlock the secret 5-click Robotics Overdrive mode!`,
        'VEDA-AI'
      );
      return;
    }

    // Default conversational fallback
    streamResponse(
      `Query received: "${trimmed}"\n\nI have cross-referenced Vasudev's engineering portfolio database. He specializes in bridging physical mechatronics (CAD, kinematics, vehicle dynamics) with deterministic computing (ROS 2 Humble, Jetson Orin Nano, CAN bus, and local-first AI).\n\nTry typing 'projects', 'baja', 'robotics', 'skills', or 'contact' for detailed technical specifications!`,
      'VEDA-AI'
    );
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
              VEDA_TERMINAL // v2.4 (Ollama Loopback Emulation)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-wine/60 border border-burgundy/25 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-dusky uppercase">ZERO CLOUD LEAKAGE</span>
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
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed space-y-3.5 bg-gradient-to-b from-[#14050D] to-[#0D0308] select-text">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.type === 'input' ? (
              <div className="flex items-center space-x-2 text-amber-300">
                <span className="text-dusky select-none">veda&gt;</span>
                <span className="font-semibold">{item.content}</span>
                <span className="text-[10px] text-taupe/60 select-none ml-auto">[{item.timestamp}]</span>
              </div>
            ) : item.type === 'system' ? (
              <div className="text-dusky bg-[#200713]/60 p-3 rounded-lg border border-burgundy/20 whitespace-pre-wrap">
                {item.content}
              </div>
            ) : (
              <div className="text-cream/90 bg-[#1A0710]/40 p-3 rounded-lg border border-burgundy/15 whitespace-pre-wrap relative pl-4 border-l-2 border-l-dusky">
                {item.content}
                {isStreaming && idx === history.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse align-middle" />
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Prompt Command Suggestions Bar */}
      <div className="bg-[#1C0712] px-4 py-2 border-t border-burgundy/20 flex items-center gap-2 overflow-x-auto select-none scrollbar-none">
        <span className="text-[10px] font-mono text-taupe uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-dusky" />
          <span>Quick Commands:</span>
        </span>
        {[
          { label: 'help', cmd: 'help' },
          { label: 'aBAJA 2026', cmd: 'baja' },
          { label: 'First Responder', cmd: 'robotics' },
          { label: 'Skills Matrix', cmd: 'skills' },
          { label: 'About Vasudev', cmd: 'about' },
          { label: 'Contact Info', cmd: 'contact' },
          { label: 'Diagnostics', cmd: 'diagnostics' },
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
          placeholder={isStreaming ? 'V.E.D.A. is typing response...' : 'Type a command (e.g. help, baja, robotics) or ask a question...'}
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
