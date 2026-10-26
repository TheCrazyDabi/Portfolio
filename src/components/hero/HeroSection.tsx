import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  ChevronRight,
  Compass,
  FileText,
  Bot
} from 'lucide-react';
import { Profile } from '../../types/content';
import { SpiderLily } from '../common/SpiderLily';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  profile: Profile;
}

const ROLES = [
  'Robotics & Automation Engineer',
  'Autonomous Navigation & ROS 2 / Nav2',
  'Drive-by-Wire CAN Bus & Embedded Firmware',
  'Vehicle Dynamics & CAD Kinematics',
  'Cyber-Physical Security Tooling'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  // 3D perspective mouse tilt on portrait
  const portraitRef = useRef<HTMLDivElement>(null);
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

  // Subtle 3D mouse parallax tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 7}deg) scale(1.015)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)',
      transition: 'transform 0.45s ease-out'
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
      {/* Restrained Ambient Gaussian Fog (Zero sharp squares) */}
      <div className="absolute -left-20 top-12 w-96 h-96 rounded-full bg-blush/20 filter blur-3xl pointer-events-none -z-0" />
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-dusky/20 filter blur-3xl pointer-events-none -z-0" />

      {/* Floating Spider Lily Botanical Petals */}
      <SpiderLily variant="petals" className="pointer-events-none z-0" />

      {/* Subtle CAD Technical Coordinate Callout */}
      <div className="absolute top-20 left-6 hidden 2xl:block text-[10px] font-mono text-taupe/60 space-y-0.5 select-none pointer-events-none z-10">
        <div>SYS_DATUM: LAT 9.5915° N, LON 76.5222° E</div>
        <div>INST: SAINTGITS COLLEGE OF ENGINEERING (APJ KTU)</div>
        <div>DISCIPLINE: ROBOTICS &amp; AUTOMATION ENG</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Refined Two-Column Hero Architecture on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Copy, Specialization, Actions & Stats (Col 7) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Education and Availability Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm text-xs font-mono font-medium text-burgundy tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
                <span>Saintgits College · B.Tech Robotics &amp; Automation (APJ KTU)</span>
              </span>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cream-surface border border-burgundy/15 shadow-sm text-xs font-mono text-wine">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium">
                  {profile.statusIndicator || 'Available for Robotics & Embedded Roles'}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-wine tracking-tight leading-[1.06]">
                Building machines that{' '}
                <em className="text-burgundy font-serif italic font-normal">
                  sense, decide
                </em>{' '}
                &amp; act.
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="text-base sm:text-lg text-taupe font-mono min-h-[1.7em] flex items-center">
                <span className="font-medium text-burgundy">{typewriterText}</span>
                <span className="inline-block w-2 h-5 bg-dusky ml-1.5 animate-pulse" />
              </div>
            </div>

            {/* Professional Introduction */}
            <p className="text-base sm:text-lg text-taupe-dark max-w-2xl leading-relaxed font-sans">
              {profile.introduction ||
                'Robotics and Automation Engineering student at Saintgits College (APJ KTU) bridging physical mechatronics with deterministic computing—from multibody vehicle dynamics in Lotus SHARK & SolidWorks to autonomous navigation on Jetson Orin Nano with ROS 2 and CAN bus.'}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
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

            {/* Verified Engineering Stats Strip */}
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
                <strong className="block text-3xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
                  &lt; 0.35°
                </strong>
                <small className="text-[11px] font-mono text-taupe uppercase tracking-wider">
                  Bump Steer (100mm)
                </small>
              </div>
              <div className="h-7 w-[1px] bg-burgundy/20 hidden sm:block" />
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-wine font-semibold">
                  <SpiderLily variant="icon" className="w-4 h-4 text-burgundy" />
                  <span>TheCrazyDabi Studio</span>
                </div>
                <small className="text-[11px] font-mono text-taupe block">
                  Saintgits · Calicut, Kerala
                </small>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Authentic Portrait with Restrained Engineering Accents (Col 5) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Authentic Portrait Card */}
            <div
              ref={portraitRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] cursor-pointer select-none mx-auto"
            >
              {/* Subtle Restrained Orbital Line (Fine dashed cadence) */}
              <div
                className="absolute -inset-3.5 border border-dashed border-dusky/40 rounded-[44px] pointer-events-none animate-spin"
                style={{ animationDuration: '60s' }}
              />

              {/* Fine CAD Alignment Construction Corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-burgundy/50 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-burgundy/50 pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-burgundy/50 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-burgundy/50 pointer-events-none" />

              {/* Main Architectural Editorial Portrait Frame */}
              <div
                className="relative aspect-[4/5] rounded-[36px] overflow-hidden border-2 border-burgundy/30 bg-gradient-to-b from-[#3E1120] to-[#1F0711] shadow-2xl transition-all duration-200"
                style={tiltStyle}
              >
                {/* Blueprint fine coordinate grid lines */}
                <div className="absolute inset-0 cad-grid-bg-dark opacity-30 pointer-events-none" />

                {/* Authentic Burgundy-Shirt Portrait of Vasudev */}
                <img
                  src={getAssetUrl('assets/profile/vasudev-hero-portrait.jpg')}
                  alt="Vasudev Saras K M — Robotics & Automation Engineer"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  style={{
                    objectPosition: '52% 20%',
                    filter: 'contrast(1.03) brightness(1.02)'
                  }}
                  loading="eager"
                />

                {/* Restrained soft gradient shade at base to anchor typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />

                {/* Top Restrained Engineering Datum Marks */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-cream/90 z-20 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-wine/70 backdrop-blur-sm border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYS_ID // VASUDEV.SARAS</span>
                </div>

                <div className="absolute top-3 right-3 text-[9px] font-mono text-blush/90 z-20 px-2 py-0.5 rounded-md bg-wine/70 backdrop-blur-sm border border-white/10">
                  S7_ROBOTICS
                </div>

                {/* Bottom Portrait Identity Badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 p-2.5 rounded-2xl bg-wine/85 backdrop-blur-md border border-white/15 text-cream space-y-0.5">
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

              {/* Botanical Red Spider Lily Curling Accent (Bottom Corner) */}
              <div className="absolute -bottom-5 -left-5 sm:-left-7 z-30 pointer-events-none">
                <SpiderLily variant="curling" className="w-22 h-22 sm:w-26 sm:h-26 filter drop-shadow-xl opacity-95" />
              </div>

              {/* Compact Restrained Technical Tags Around Portrait */}
              <span
                className="chipf text-[10px] sm:text-[11px]"
                style={{ left: '-12px', bottom: '110px' }}
              >
                ROS 2 / Jetson Orin
              </span>
              <span
                className="chipf text-[10px] sm:text-[11px]"
                style={{ right: '-10px', top: '75px' }}
              >
                Lotus SHARK CAD
              </span>
              <span
                className="chipf text-[10px] sm:text-[11px]"
                style={{ right: '12px', bottom: '-12px' }}
              >
                Autonomous Systems
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="text-center pt-8">
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
