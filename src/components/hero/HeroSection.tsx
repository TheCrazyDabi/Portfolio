import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight, Compass, FileText, Sparkles, Cpu } from 'lucide-react';
import { Profile } from '../../types/content';
import { RoboticArmCAD } from './RoboticArmCAD';
import { SpiderLily } from '../common/SpiderLily';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  profile: Profile;
}

const ROLES = [
  'Robotics & Automation Engineer',
  'Vision + inertial navigation',
  'Cybersecurity tooling',
  'Local-first AI systems',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Dual-mode stage toggle: 'portrait' | 'cad'
  const [stageMode, setStageMode] = useState<'portrait' | 'cad'>('portrait');

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
        timer = setTimeout(tick, 65);
      } else {
        charIndexRef.current -= 1;
        setTypewriterText(currentRole.slice(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 35);
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
    }, 180);

    let k2 = 0;
    const iv2 = setInterval(() => {
      k2 += 1;
      setDomainCount(k2);
      if (k2 >= 3) clearInterval(iv2);
    }, 280);

    return () => {
      clearInterval(iv1);
      clearInterval(iv2);
    };
  }, []);

  // Mouse tilt on portrait arch
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateY(0deg) rotateX(0deg)',
    });
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden cad-grid-bg transition-colors"
    >
      {/* Ambient Drifting Glow Blobs */}
      <div className="blob b1 -left-20 top-16 w-80 h-80 bg-blush/40 pointer-events-none" />
      <div className="blob b2 right-8 top-1/3 w-72 h-72 bg-dusky/30 pointer-events-none" />

      {/* Floating Spider Lily Petals */}
      <SpiderLily variant="petals" className="pointer-events-none z-0" />

      {/* Decorative Technical Coordinates Marker */}
      <div className="absolute top-24 left-6 hidden xl:block text-[10px] font-mono text-taupe/60 space-y-1 select-none pointer-events-none z-10">
        <div>SYS_DATUM: LAT 9.5915° N, LON 76.5222° E</div>
        <div>INST: SAINTGITS COLLEGE OF ENGINEERING</div>
        <div>FIELD: ROBOTICS &amp; AUTOMATION ENG</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono font-medium text-burgundy tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
                <span>B.Tech · Robotics &amp; Automation</span>
              </span>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cream-surface border border-burgundy/15 shadow-sm text-xs font-mono text-wine">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium">
                  {profile.statusIndicator || 'Available for Robotics & Embedded Roles'}
                </span>
              </div>
            </div>

            {/* Main Editorial Headline with Fraunces Styling */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-wine tracking-tight leading-[1.04]">
                Building machines that{' '}
                <em className="text-burgundy font-serif italic font-normal">
                  sense, decide
                </em>{' '}
                &amp; act.
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="text-base sm:text-lg text-taupe font-mono min-h-[1.8em] flex items-center">
                <span>{typewriterText}</span>
                <span className="inline-block w-2 h-5 bg-dusky ml-1 animate-pulse" />
              </div>
            </div>

            {/* Concise Introduction */}
            <p className="text-base sm:text-lg text-taupe-dark max-w-2xl leading-relaxed font-sans font-normal">
              {profile.introduction ||
                'I explore the intersection of robotics, embedded systems, intelligent software, and mechanical design to turn engineering ideas into working systems.'}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-burgundy hover:bg-wine text-cream font-mono text-xs uppercase tracking-wider font-semibold shadow-cad hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>View projects</span>
                <ChevronRight className="w-4 h-4 text-dusky" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/25 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
              >
                <Compass className="w-4 h-4 text-burgundy" />
                <span>Get in touch</span>
              </a>

              {/* Verified Résumé */}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-blush/20 hover:bg-blush/40 text-burgundy border border-dusky/40 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                >
                  <FileText className="w-4 h-4 text-burgundy" />
                  <span>Verified Résumé</span>
                </a>
              ) : null}
            </div>

            {/* Animated Count-up Statistics */}
            <div className="pt-6 border-t border-burgundy/15 flex flex-wrap gap-8 items-center">
              <div>
                <strong className="block text-3xl sm:text-4xl font-serif font-bold text-burgundy">
                  {buildCount}
                </strong>
                <small className="text-xs font-mono text-taupe uppercase tracking-wider">
                  Flagship builds
                </small>
              </div>
              <div className="h-8 w-[1px] bg-burgundy/20 hidden sm:block" />
              <div>
                <strong className="block text-3xl sm:text-4xl font-serif font-bold text-burgundy">
                  {domainCount}
                </strong>
                <small className="text-xs font-mono text-taupe uppercase tracking-wider">
                  Robotics · Security · AI
                </small>
              </div>
              <div className="h-8 w-[1px] bg-burgundy/20 hidden sm:block" />
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

          {/* Right Signature Visual Stage (Col 5) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Stage Mode Switcher (Studio Portrait vs CAD Kinematics) */}
            <div className="mb-4 inline-flex p-1 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono z-20">
              <button
                onClick={() => setStageMode('portrait')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  stageMode === 'portrait'
                    ? 'bg-burgundy text-cream font-semibold shadow-sm'
                    : 'text-taupe hover:text-wine'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portrait Stage</span>
              </button>

              <button
                onClick={() => setStageMode('cad')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  stageMode === 'cad'
                    ? 'bg-burgundy text-cream font-semibold shadow-sm'
                    : 'text-taupe hover:text-wine'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>CAD Kinematics</span>
              </button>
            </div>

            {/* Mode 1: Arch Portrait Stage with 3D Mouse Tilt, Rotating Gears & Spider Lily */}
            {stageMode === 'portrait' && (
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[360px] sm:max-w-[400px] cursor-pointer"
              >
                {/* Rotating Dashed Ring */}
                <div className="ring" />

                {/* Rotating Mechanical Gear 1 (Dusky Pink) */}
                <svg
                  className="gear"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
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

                {/* Rotating Mechanical Gear 2 (Soft Blush, counter-rotating) */}
                <svg
                  className="gear gear2"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
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

                {/* 3D Perspective Photo Arch Portal */}
                <div
                  className="photo-arch shadow-2xl relative"
                  style={tiltStyle}
                >
                  <img
                    src={getAssetUrl(profile.profileImageUrl || 'assets/profile/vasudev-photo.jpg')}
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: '44% 20%',
                      transform: 'scale(1.22)',
                      transformOrigin: '45% 25%',
                      filter: 'contrast(1.05) brightness(1.02)',
                    }}
                  />
                  {/* Subtle inner gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Graceful Red Spider Lily Botanical Curling Accent */}
                <div className="absolute -bottom-6 -left-8 z-20 pointer-events-none">
                  <SpiderLily variant="curling" className="w-28 h-28 filter drop-shadow-lg" />
                </div>

                {/* Floating Tech Chips around Arch */}
                <span
                  className="chipf animate-float"
                  style={{ left: '-18px', bottom: '90px' }}
                >
                  Robotics
                </span>
                <span
                  className="chipf animate-float"
                  style={{ right: '-12px', top: '70px', animationDelay: '-2s' }}
                >
                  Vision + IMU
                </span>
                <span
                  className="chipf animate-float"
                  style={{ right: '28px', bottom: '-12px', animationDelay: '-3.5s' }}
                >
                  Local AI
                </span>
              </div>
            )}

            {/* Mode 2: Interactive 3D CAD Kinematics Manipulator */}
            {stageMode === 'cad' && (
              <div className="w-full max-w-[420px] transition-all duration-300">
                <RoboticArmCAD interactive={true} />
                <div className="mt-2 text-center">
                  <span className="text-[10px] font-mono text-taupe">
                    Drag joints to solve analytical inverse kinematics
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-14 text-center">
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
