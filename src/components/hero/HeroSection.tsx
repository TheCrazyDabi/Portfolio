import React from 'react';
import { ArrowDown, FileText, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { Profile } from '../../types/content';
import { RoboticArmCAD } from './RoboticArmCAD';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden cad-grid-bg">
      {/* Decorative Technical Coordinates Marker */}
      <div className="absolute top-24 left-6 hidden xl:block text-[10px] font-mono text-taupe/60 space-y-1 select-none pointer-events-none">
        <div>SYS_DATUM: LAT 9.5915° N, LON 76.5222° E</div>
        <div>INST: SAINTGITS COLLEGE OF ENGINEERING</div>
        <div>FIELD: ROBOTICS &amp; AUTOMATION ENG</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Creator Profile Chip & Status */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2.5 p-1 pr-3 rounded-full bg-cream-surface border border-burgundy/20 shadow-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-burgundy flex-shrink-0">
                  <img
                    src={getAssetUrl(profile.profileImageUrl || 'assets/profile/vasudev-photo.jpg')}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-mono font-semibold text-wine">
                  {profile.name}
                </div>
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cream-surface border border-burgundy/15 shadow-sm text-xs font-mono text-wine">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">{profile.statusIndicator || 'Available for Robotics & Embedded Roles'}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-taupe uppercase font-semibold flex items-center gap-2">
                <span>ROBOTICS &amp; AUTOMATION ENGINEER</span>
                <span className="w-6 h-[1px] bg-dusky"></span>
                <span className="text-burgundy">SAINTGITS COLLEGE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-wine tracking-tight leading-[1.08]">
                Engineering Intelligence.{' '}
                <span className="text-burgundy italic font-serif">Designing Motion.</span>
              </h1>
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
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-burgundy hover:bg-wine text-cream font-mono text-xs uppercase tracking-wider font-semibold shadow-cad hover:shadow-md transition-all duration-200"
              >
                <span>Explore Projects</span>
                <ChevronRight className="w-4 h-4 text-dusky" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
              >
                <Compass className="w-4 h-4 text-burgundy" />
                <span>Systems Architecture</span>
              </a>

              {/* Show Résumé button only if real resume URL is uploaded */}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-blush/20 hover:bg-blush/40 text-burgundy border border-dusky/40 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                >
                  <FileText className="w-4 h-4 text-burgundy" />
                  <span>Verified Résumé</span>
                </a>
              ) : null}
            </div>

            {/* Quick Engineering Specification Pills */}
            <div className="pt-6 border-t border-burgundy/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-cream-surface/80 border border-burgundy/10">
                <span className="block text-[10px] text-taupe uppercase">Mechanism CAD</span>
                <span className="font-semibold text-wine">SolidWorks / FEA</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cream-surface/80 border border-burgundy/10">
                <span className="block text-[10px] text-taupe uppercase">Firmware / MCU</span>
                <span className="font-semibold text-wine">STM32 / ESP32</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cream-surface/80 border border-burgundy/10">
                <span className="block text-[10px] text-taupe uppercase">Robotics Middleware</span>
                <span className="font-semibold text-wine">ROS 2 Humble</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cream-surface/80 border border-burgundy/10">
                <span className="block text-[10px] text-taupe uppercase">Security / Ops</span>
                <span className="font-semibold text-wine">Cyber-Physical</span>
              </div>
            </div>
          </div>

          {/* Right Signature CAD Robotic Assembly (Col 5) */}
          <div className="lg:col-span-5 relative">
            <RoboticArmCAD interactive={true} />
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono text-taupe flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-dusky" />
                <span>Move cursor over arm to simulate forward &amp; inverse kinematics</span>
              </span>
            </div>
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
          <span className="tracking-widest uppercase">DISCOVER STUDIO SPEC</span>
          <ArrowDown className="w-3.5 h-3.5 mt-1 text-dusky animate-bounce" />
        </a>
      </div>
    </section>
  );
};
