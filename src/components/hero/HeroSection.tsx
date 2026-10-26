import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight, Compass, FileText, Sparkles, Cpu, Bot, Shield, Wrench } from 'lucide-react';
import { Profile } from '../../types/content';
import { RoboticArmCAD } from './RoboticArmCAD';
import { SpiderLily } from '../common/SpiderLily';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  profile: Profile;
}

const ROLES = [
  'Robotics & Automation Engineer',
  'Autonomous Navigation & ROS 2',
  'Vehicle Dynamics & CAD Kinematics',
  'Embedded Systems & CAN Bus',
  'Cyber-Physical Security Tooling'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Triple-mode stage toggle: 'facecard' | 'baja' | 'cad'
  const [stageMode, setStageMode] = useState<'facecard' | 'baja' | 'cad'>('facecard');

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  // 3D perspective tilt on portrait stage
  const stageRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  // Animated Stats
  const [buildCount, setBuildCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);

  // Typewriter loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentRole = ROLES[roleIndexRef.current];
      const isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        charIndexRef.current += 1;
        setTypewriterText(currentRole.slice(0, charIndexRef.current));

        if (charIndexRef.current === currentRole.length) {
          isDeletingRef.current = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 60);
      } else {
        charIndexRef.current -= 1;
        setTypewriterText(currentRole.slice(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    };

    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, []);

  // Stats count-up animation on mount
  useEffect(() => {
    let k1 = 0;
    const iv1 = setInterval(() => {
      k1 += 1;
      setBuildCount(k1);
      if (k1 >= 7) clearInterval(iv1);
    }, 160);

    let k2 = 0;
    const iv2 = setInterval(() => {
      k2 += 1;
      setDomainCount(k2);
      if (k2 >= 3) clearInterval(iv2);
    }, 240);

    return () => {
      clearInterval(iv1);
      clearInterval(iv2);
    };
  }, []);

  // Mouse tilt on face card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 9}deg) scale(1.02)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)',
      transition: 'transform 0.4s ease-out'
    });
  };

  const handleOpenVeda = (mode: 'chat' | 'tour' = 'chat') => {
    window.dispatchEvent(new CustomEvent('open-veda-guide', { detail: { mode } }));
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden cad-grid-bg transition-colors scroll-mt-20"
    >
      {/* Softened Ambient Glowing Fog Blobs (No sharp square artifacts) */}
      <div className="absolute -left-20 top-10 w-96 h-96 rounded-full bg-blush/25 filter blur-3xl pointer-events-none -z-0" />
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-dusky/20 filter blur-3xl pointer-events-none -z-0" />

      {/* Floating Spider Lily Petals */}
      <SpiderLily variant="petals" className="pointer-events-none z-0" />

      {/* Subtle Technical Coordinates Marker */}
      <div className="absolute top-20 left-6 hidden 2xl:block text-[10px] font-mono text-taupe/60 space-y-0.5 select-none pointer-events-none z-10">
        <div>SYS_DATUM: LAT 9.5915° N, LON 76.5222° E</div>
        <div>INST: SAINTGITS COLLEGE OF ENGINEERING (APJ KTU)</div>
        <div>DISCIPLINE: ROBOTICS &amp; AUTOMATION ENG</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Status & Education Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono font-medium text-burgundy tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
                <span>Saintgits · B.Tech Robotics &amp; Automation</span>
              </span>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cream-surface border border-burgundy/15 shadow-sm text-xs font-mono text-wine">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium">
                  {profile.statusIndicator || 'Available for Robotics & Embedded Roles'}
                </span>
              </div>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-wine tracking-tight leading-[1.05]">
                Building machines that{' '}
                <em className="text-burgundy font-serif italic font-normal">
                  sense, decide
                </em>{' '}
                &amp; act.
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="text-base sm:text-lg text-taupe font-mono min-h-[1.7em] flex items-center">
                <span className="font-medium text-burgundy">{typewriterText}</span>
                <span className="inline-block w-2 h-5 bg-dusky ml-1 animate-pulse" />
              </div>
            </div>

            {/* Editorial Introduction */}
            <p className="text-base sm:text-lg text-taupe-dark max-w-2xl leading-relaxed font-sans font-normal">
              {profile.introduction ||
                'I explore the intersection of robotics, embedded systems, intelligent software, and mechanical design to turn engineering ideas into working systems.'}
            </p>

            {/* Action CTA Buttons with V.E.D.A. Guide Launcher */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-burgundy hover:bg-wine text-cream font-mono text-xs uppercase tracking-wider font-semibold shadow-cad hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>View projects</span>
                <ChevronRight className="w-4 h-4 text-dusky" />
              </a>

              {/* V.E.D.A. AI Guide Trigger */}
              <button
                onClick={() => handleOpenVeda('chat')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/70 text-wine border border-emerald-600/30 hover:border-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm group"
                title="Open V.E.D.A. interactive guide"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Bot className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Ask V.E.D.A.</span>
              </button>

              <button
                onClick={() => handleOpenVeda('tour')}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/60 text-taupe-dark hover:text-wine border border-burgundy/20 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                title="Start step-by-step guided portfolio tour"
              >
                <Compass className="w-3.5 h-3.5 text-burgundy" />
                <span>Take Tour</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 font-mono text-xs uppercase tracking-wider font-medium transition-all shadow-sm"
              >
                <span>Contact</span>
              </a>

              {/* Verified Résumé */}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-blush/20 hover:bg-blush/40 text-burgundy border border-dusky/40 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                >
                  <FileText className="w-3.5 h-3.5 text-burgundy" />
                  <span>Verified Résumé</span>
                </a>
              ) : null}
            </div>

            {/* Key Verified Engineering Stats */}
            <div className="pt-4 border-t border-burgundy/15 flex flex-wrap gap-7 items-center">
              <div>
                <strong className="block text-3xl font-serif font-bold text-burgundy">
                  {buildCount}
                </strong>
                <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
                  Flagship Builds
                </small>
              </div>
              <div className="h-7 w-[1px] bg-burgundy/20 hidden sm:block" />
              <div>
                <strong className="block text-3xl font-serif font-bold text-burgundy">
                  {domainCount}
                </strong>
                <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
                  Robotics · Security · AI
                </small>
              </div>
              <div className="h-7 w-[1px] bg-burgundy/20 hidden sm:block" />
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-wine font-semibold">
                  <SpiderLily variant="icon" className="w-4 h-4 text-burgundy" />
                  <span>TheCrazyDabi Studio</span>
                </div>
                <small className="text-[11px] font-mono text-taupe block">
                  Saintgits College of Eng.
                </small>
              </div>
            </div>
          </div>

          {/* Right Signature Visual Stage: High-Impact Face Card (Col 5) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Mode Switcher Tabs */}
            <div className="mb-3 inline-flex p-1 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono z-20">
              <button
                onClick={() => setStageMode('facecard')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                  stageMode === 'facecard'
                    ? 'bg-burgundy text-cream font-semibold shadow-sm'
                    : 'text-taupe hover:text-wine'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Face Card</span>
              </button>

              <button
                onClick={() => setStageMode('baja')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                  stageMode === 'baja'
                    ? 'bg-burgundy text-cream font-semibold shadow-sm'
                    : 'text-taupe hover:text-wine'
                }`}
              >
                <Wrench className="w-3 h-3" />
                <span>aBAJA 2026</span>
              </button>

              <button
                onClick={() => setStageMode('cad')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                  stageMode === 'cad'
                    ? 'bg-burgundy text-cream font-semibold shadow-sm'
                    : 'text-taupe hover:text-wine'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>CAD 3D</span>
              </button>
            </div>

            {/* Mode 1: Premium Editorial Face Card Stage (Inspired by getlayers reference) */}
            {stageMode === 'facecard' && (
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[320px] sm:max-w-[370px] md:max-w-[390px] cursor-pointer mx-auto select-none"
              >
                {/* Rotating Delicate CAD Outer Ring */}
                <div className="ring" />

                {/* Rotating CAD Mechanical Gears */}
                <svg className="gear" viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    fill="none"
                    stroke="var(--color-dusky)"
                    strokeWidth="14"
                    strokeDasharray="9.4 6.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="26"
                    fill="var(--theme-bg)"
                    stroke="var(--color-dusky)"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="50" r="8" fill="var(--color-dusky)" />
                </svg>

                <svg className="gear gear2" viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    fill="none"
                    stroke="var(--color-blush)"
                    strokeWidth="14"
                    strokeDasharray="9.4 6.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="26"
                    fill="var(--theme-bg)"
                    stroke="var(--color-blush)"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="50" r="8" fill="var(--color-blush)" />
                </svg>

                {/* Main Face Card Container */}
                <div
                  className="photo-arch shadow-2xl relative rounded-[32px] overflow-hidden border-2 border-burgundy/30 bg-gradient-to-b from-[#4A1525] via-[#2F0B18] to-[#1E0711]"
                  style={tiltStyle}
                >
                  {/* Subtle Blueprint Grid Lines in Face Card */}
                  <div className="absolute inset-0 cad-grid-bg-dark opacity-40 pointer-events-none" />

                  {/* Vasudev's Transparent Cutout Portrait */}
                  <img
                    src={getAssetUrl('assets/profile/vasudev-burgundy-cutout-transparent.png')}
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    style={{
                      objectPosition: '50% 18%',
                      transform: 'scale(1.12)',
                      transformOrigin: '50% 20%',
                      filter: 'contrast(1.06) brightness(1.02)'
                    }}
                  />

                  {/* Gradient shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-20 pointer-events-none" />

                  {/* Architectural Crosshair Datum Marks */}
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-dusky/80 z-20 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYS_TARGET: 01 // VASUDEV</span>
                  </div>

                  <div className="absolute top-3 right-3 text-[9px] font-mono text-dusky/70 z-20">
                    S7_ROBOTICS
                  </div>

                  {/* Bottom Face Card Identity Badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 p-2.5 rounded-2xl bg-wine/80 backdrop-blur-md border border-white/15 text-cream space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm tracking-wide">
                        {profile.name}
                      </span>
                      <span className="text-[9px] font-mono text-blush uppercase tracking-widest">
                        SAINTGITS // KTU
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-cream/80 truncate">
                      Robotics &amp; Automation Engineer · Dabi
                    </p>
                  </div>
                </div>

                {/* Graceful Red Spider Lily Botanical Curling Accent */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 z-30 pointer-events-none">
                  <SpiderLily variant="curling" className="w-24 h-24 sm:w-28 sm:h-28 filter drop-shadow-xl" />
                </div>

                {/* Floating Glassmorphic Tech Chips around Face Card */}
                <span
                  className="chipf animate-float text-[11px] sm:text-xs"
                  style={{ left: '-12px', bottom: '110px' }}
                >
                  ROS 2 / Jetson
                </span>
                <span
                  className="chipf animate-float text-[11px] sm:text-xs"
                  style={{ right: '-10px', top: '70px', animationDelay: '-2s' }}
                >
                  aBAJA CAD
                </span>
                <span
                  className="chipf animate-float text-[11px] sm:text-xs"
                  style={{ right: '14px', bottom: '-14px', animationDelay: '-3.5s' }}
                >
                  Guided by V.E.D.A.
                </span>
              </div>
            )}

            {/* Mode 2: Team Equinox aBAJA 2026 Photography */}
            {stageMode === 'baja' && (
              <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border border-burgundy/25 bg-cream-surface shadow-xl p-3 space-y-2.5">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <img
                    src={getAssetUrl('assets/projects/abaja-2026-workshop.png')}
                    alt="Vasudev Saras at aBAJA 2026"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-wine/80 backdrop-blur-sm text-cream text-[10px] font-mono">
                    Team Equinox // aBAJA 2026 Scrutiny
                  </div>
                </div>
                <div className="text-xs font-mono text-wine space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>Double-Wishbone Kinematics</span>
                    <span className="text-burgundy">Lotus SHARK</span>
                  </div>
                  <p className="text-[11px] text-taupe font-sans">
                    Engineered Ackermann steering hardpoints and suspension uprights in SolidWorks to suppress bump steer to &lt;0.35°.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 3: Interactive 3D CAD Kinematics Manipulator */}
            {stageMode === 'cad' && (
              <div className="w-full max-w-[400px] transition-all duration-300">
                <RoboticArmCAD interactive={true} />
                <div className="mt-2 text-center">
                  <span className="text-[10px] font-mono text-taupe">
                    Drag joints to solve analytical inverse kinematics (ESP32 C++ engine)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-8 text-center">
        <a
          href="#about"
          className="inline-flex flex-col items-center text-[10px] font-mono text-taupe hover:text-burgundy transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="tracking-widest uppercase">DISCOVER ENGINEERING SPEC</span>
          <ArrowDown className="w-3.5 h-3.5 mt-1 text-dusky animate-bounce" />
        </a>
      </div>
    </section>
  );
};
