import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  ChevronRight,
  Compass,
  FileText,
  Sparkles,
  Cpu,
  Bot,
  Wrench,
  Camera,
  Activity,
  Layers
} from 'lucide-react';
import { Profile } from '../../types/content';
import { BuggySuspensionCAD } from './BuggySuspensionCAD';
import { RoboticArmCAD } from './RoboticArmCAD';
import { SpiderLily } from '../common/SpiderLily';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  profile: Profile;
}

const ROLES = [
  'Robotics & Automation Engineer',
  'Automotive Buggy Suspension & Steering (Lotus SHARK)',
  'Autonomous Navigation & ROS 2 / Nav2',
  'Drive-by-Wire CAN Bus & Embedded Firmware',
  'Cyber-Physical Security & Offline Speech AI'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Showcase Mode: 'suspension' | 'facecard' | 'workshop' | 'arm'
  const [activeStage, setActiveStage] = useState<'suspension' | 'facecard' | 'workshop' | 'arm'>('suspension');

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  // 3D perspective tilt on face card
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
        timer = setTimeout(tick, 55);
      } else {
        charIndexRef.current -= 1;
        setTypewriterText(currentRole.slice(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 28);
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
    }, 150);

    let k2 = 0;
    const iv2 = setInterval(() => {
      k2 += 1;
      setDomainCount(k2);
      if (k2 >= 3) clearInterval(iv2);
    }, 220);

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
      transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.02)`,
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
      className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden cad-grid-bg transition-colors scroll-mt-20"
    >
      {/* Soft Gaussian Ambient Atmospheric Light (Zero sharp squares) */}
      <div className="absolute -left-20 top-12 w-96 h-96 rounded-full bg-blush/20 filter blur-3xl pointer-events-none -z-0" />
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-dusky/20 filter blur-3xl pointer-events-none -z-0" />

      {/* Floating Spider Lily Botanical Petals */}
      <SpiderLily variant="petals" className="pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Unified Editorial Top Canvas (Harmonious, not rigid side-by-side columns) */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Top Status Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono font-medium text-burgundy tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
              <span>Saintgits College · B.Tech Robotics &amp; Automation (APJ KTU)</span>
            </span>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-surface border border-burgundy/15 shadow-sm text-xs font-mono text-wine">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-medium">
                {profile.statusIndicator || 'Available for Robotics & Embedded Roles'}
              </span>
            </div>
          </div>

          {/* Grand Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-wine tracking-tight leading-[1.08]">
              Building machines that{' '}
              <em className="text-burgundy font-serif italic font-normal">
                sense, decide
              </em>{' '}
              &amp; act.
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="text-base sm:text-lg text-taupe font-mono min-h-[1.7em] flex items-center justify-center">
              <span className="font-medium text-burgundy">{typewriterText}</span>
              <span className="inline-block w-2 h-5 bg-dusky ml-1.5 animate-pulse" />
            </div>
          </div>

          {/* Concise Narrative */}
          <p className="text-sm sm:text-base text-taupe-dark max-w-2xl mx-auto leading-relaxed font-sans">
            {profile.introduction ||
              'Robotics and Automation engineer bridging physical kinematics in Lotus SHARK & SolidWorks with deterministic computing on Jetson Orin Nano, ROS 2, and Drive-by-Wire CAN.'}
          </p>

          {/* Action CTAs Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-burgundy hover:bg-wine text-cream font-mono text-xs uppercase tracking-wider font-semibold shadow-cad hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore projects</span>
              <ChevronRight className="w-4 h-4 text-dusky" />
            </a>

            {/* V.E.D.A. AI Guide Trigger */}
            <button
              onClick={() => handleOpenVeda('chat')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/70 text-wine border border-emerald-600/30 hover:border-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm group"
              title="Launch V.E.D.A. interactive guide"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Bot className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Ask V.E.D.A.</span>
            </button>

            <button
              onClick={() => handleOpenVeda('tour')}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/60 text-taupe-dark hover:text-wine border border-burgundy/20 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
              title="Start step-by-step guided walkthrough"
            >
              <Compass className="w-3.5 h-3.5 text-burgundy" />
              <span>Take Tour</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 font-mono text-xs uppercase tracking-wider font-medium transition-all shadow-sm"
            >
              <span>Get in touch</span>
            </a>

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
        </div>

        {/* Cohesive Engineering Centerpiece Stage (Integrated Visual Arena) */}
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Stage Switcher Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono">
            <div className="flex items-center space-x-2 text-taupe font-semibold text-[11px]">
              <Layers className="w-4 h-4 text-burgundy" />
              <span>ENGINEERING SHOWCASE:</span>
            </div>

            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveStage('suspension')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-xs ${
                  activeStage === 'suspension'
                    ? 'bg-burgundy text-cream font-bold shadow-sm'
                    : 'text-taupe hover:text-wine hover:bg-cream'
                }`}
                title="Automotive Buggy Suspension & Steering Kinematic Simulation"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>🏎️ Buggy Suspension &amp; Steering CAD</span>
              </button>

              <button
                onClick={() => setActiveStage('facecard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-xs ${
                  activeStage === 'facecard'
                    ? 'bg-burgundy text-cream font-bold shadow-sm'
                    : 'text-taupe hover:text-wine hover:bg-cream'
                }`}
                title="Vasudev Saras 3D Face Card"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>👤 3D Face Card</span>
              </button>

              <button
                onClick={() => setActiveStage('workshop')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-xs ${
                  activeStage === 'workshop'
                    ? 'bg-burgundy text-cream font-bold shadow-sm'
                    : 'text-taupe hover:text-wine hover:bg-cream'
                }`}
                title="Team Equinox aBAJA 2026 Scrutiny Photography"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>📸 aBAJA 2026 Scrutiny</span>
              </button>

              <button
                onClick={() => setActiveStage('arm')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-xs ${
                  activeStage === 'arm'
                    ? 'bg-burgundy text-cream font-bold shadow-sm'
                    : 'text-taupe hover:text-wine hover:bg-cream'
                }`}
                title="3-DOF Articulated Arm Manipulator"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>🦾 Arm Kinematics</span>
              </button>
            </div>
          </div>

          {/* Stage Content Renderers */}
          <div className="relative rounded-3xl overflow-hidden border border-burgundy/20 shadow-cad bg-cream-surface/90">
            {/* View 1: Automotive Buggy Suspension & Steering Simulation */}
            {activeStage === 'suspension' && (
              <div className="p-2 sm:p-4">
                <BuggySuspensionCAD interactive={true} />
              </div>
            )}

            {/* View 2: High-End Editorial 3D Face Card */}
            {activeStage === 'facecard' && (
              <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                {/* 3D Perspective Photo Card */}
                <div
                  ref={stageRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full max-w-[320px] sm:max-w-[360px] cursor-pointer select-none"
                >
                  <div className="ring" />

                  {/* Rotating Mechanical Gears */}
                  <svg className="gear" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="34" fill="none" stroke="var(--color-dusky)" strokeWidth="14" strokeDasharray="9.4 6.2" />
                    <circle cx="50" cy="50" r="26" fill="var(--theme-bg)" stroke="var(--color-dusky)" strokeWidth="3" />
                    <circle cx="50" cy="50" r="8" fill="var(--color-dusky)" />
                  </svg>

                  <svg className="gear gear2" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="34" fill="none" stroke="var(--color-blush)" strokeWidth="14" strokeDasharray="9.4 6.2" />
                    <circle cx="50" cy="50" r="26" fill="var(--theme-bg)" stroke="var(--color-blush)" strokeWidth="3" />
                    <circle cx="50" cy="50" r="8" fill="var(--color-blush)" />
                  </svg>

                  {/* Face Card Arched Frame */}
                  <div
                    className="photo-arch shadow-2xl relative rounded-[32px] overflow-hidden border-2 border-burgundy/30 bg-gradient-to-b from-[#4A1525] via-[#2F0B18] to-[#1E0711]"
                    style={tiltStyle}
                  >
                    <div className="absolute inset-0 cad-grid-bg-dark opacity-35 pointer-events-none" />

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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-20 pointer-events-none" />

                    <div className="absolute top-3 left-3 text-[9px] font-mono text-dusky/80 z-20 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SYS_TARGET: 01 // VASUDEV</span>
                    </div>

                    <div className="absolute top-3 right-3 text-[9px] font-mono text-dusky/70 z-20">
                      S7_ROBOTICS
                    </div>

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

                  <div className="absolute -bottom-6 -left-6 sm:-left-8 z-30 pointer-events-none">
                    <SpiderLily variant="curling" className="w-24 h-24 sm:w-28 sm:h-28 filter drop-shadow-xl" />
                  </div>

                  <span className="chipf animate-float text-[11px]" style={{ left: '-12px', bottom: '110px' }}>
                    ROS 2 / Jetson
                  </span>
                  <span className="chipf animate-float text-[11px]" style={{ right: '-10px', top: '70px', animationDelay: '-2s' }}>
                    aBAJA CAD
                  </span>
                  <span className="chipf animate-float text-[11px]" style={{ right: '14px', bottom: '-14px', animationDelay: '-3.5s' }}>
                    Guided by V.E.D.A.
                  </span>
                </div>

                {/* Accompanying Editorial Card Bio */}
                <div className="max-w-md space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-burgundy font-bold tracking-wider uppercase">
                      // Verified Subject Dossier
                    </span>
                    <h3 className="text-2xl font-display font-bold text-wine">
                      Vasudev Saras K M
                    </h3>
                    <p className="text-xs font-mono text-taupe">
                      Undergraduate Engineer · Saintgits College of Engineering
                    </p>
                  </div>

                  <p className="text-sm text-taupe-dark leading-relaxed font-sans">
                    Specializing in autonomous vehicle kinematics, CAN bus drive-by-wire integration, and cyber-physical security. Designed the suspension and Ackermann steering geometry for Team Equinox (aBAJA SAE 2026), suppressing bump steer to under 0.35°.
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                    <div className="p-3 rounded-xl bg-cream border border-burgundy/15">
                      <span className="text-[10px] text-taupe block">DISCIPLINE</span>
                      <strong className="text-wine">Robotics &amp; Automation</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-cream border border-burgundy/15">
                      <span className="text-[10px] text-taupe block">LOCATION</span>
                      <strong className="text-wine">Calicut, Kerala</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 3: Team Equinox aBAJA 2026 Real Photography */}
            {activeStage === 'workshop' && (
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-burgundy/25 shadow-md">
                    <img
                      src={getAssetUrl('assets/projects/abaja-2026-workshop.png')}
                      alt="Vasudev Saras at aBAJA 2026 Vehicle Staging"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-3 py-1 rounded-lg bg-wine/85 backdrop-blur-sm text-cream text-[10px] font-mono">
                      On-Site Technical Scrutiny // aBAJA 2026
                    </div>
                  </div>
                  <p className="text-xs font-mono text-taupe text-center">
                    Vasudev Saras on-site with Team Equinox during vehicle staging &amp; scrutiny
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-burgundy/25 shadow-md">
                    <img
                      src={getAssetUrl('assets/projects/abaja-2026-transit.png')}
                      alt="Vasudev Saras in aBAJA Transit Gear"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-3 py-1 rounded-lg bg-wine/85 backdrop-blur-sm text-cream text-[10px] font-mono">
                      National Competition Transit Gear
                    </div>
                  </div>
                  <p className="text-xs font-mono text-taupe text-center">
                    National competition travel &amp; dynamic track test gear
                  </p>
                </div>
              </div>
            )}

            {/* View 4: MediArm 3-DOF Arm Kinematics */}
            {activeStage === 'arm' && (
              <div className="p-4 sm:p-6 flex flex-col items-center">
                <div className="w-full max-w-lg">
                  <RoboticArmCAD interactive={true} />
                </div>
                <span className="text-[10px] font-mono text-taupe mt-3">
                  Drag joints to evaluate closed-form inverse kinematics decoupled for low-power ESP32 microcontrollers
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Verified Engineering Stats Strip */}
        <div className="max-w-4xl mx-auto pt-6 border-t border-burgundy/15 flex flex-wrap justify-around items-center gap-6 text-center">
          <div>
            <strong className="block text-3xl font-serif font-bold text-burgundy">
              {buildCount}
            </strong>
            <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
              Flagship Builds
            </small>
          </div>
          <div className="h-8 w-[1px] bg-burgundy/20 hidden sm:block" />
          <div>
            <strong className="block text-3xl font-serif font-bold text-burgundy">
              {domainCount}
            </strong>
            <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
              Robotics · Security · AI
            </small>
          </div>
          <div className="h-8 w-[1px] bg-burgundy/20 hidden sm:block" />
          <div>
            <strong className="block text-3xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
              &lt; 0.35°
            </strong>
            <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
              Bump Steer Suppressed
            </small>
          </div>
          <div className="h-8 w-[1px] bg-burgundy/20 hidden sm:block" />
          <div>
            <div className="flex items-center justify-center space-x-1.5 text-xs font-mono text-wine font-semibold">
              <SpiderLily variant="icon" className="w-4 h-4 text-burgundy" />
              <span>TheCrazyDabi Studio</span>
            </div>
            <small className="text-[11px] font-mono text-taupe block">
              Calicut, Kerala · India
            </small>
          </div>
        </div>

        {/* Down Scroll Indicator */}
        <div className="text-center pt-2">
          <a
            href="#about"
            className="inline-flex flex-col items-center text-[10px] font-mono text-taupe hover:text-burgundy transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="tracking-widest uppercase">DISCOVER ENGINEERING SPEC</span>
            <ArrowDown className="w-3.5 h-3.5 mt-1 text-dusky animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
