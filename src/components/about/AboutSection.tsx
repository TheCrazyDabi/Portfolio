import React from 'react';
import { Layers, Cpu, Box, ShieldCheck, Eye, Terminal, MapPin, GraduationCap } from 'lucide-react';
import { Profile } from '../../types/content';
import { getAssetUrl } from '../../utils/assets';
import { SpiderLily } from '../common/SpiderLily';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const pillars = [
    {
      icon: Box,
      title: 'Mechanical CAD & Kinematics',
      desc: 'SolidWorks modeling and vehicle steering and suspension geometry, including Ackermann principles and kinematics.',
    },
    {
      icon: Cpu,
      title: 'Embedded Systems & Firmware',
      desc: 'ESP32 control and embedded interfaces used in robotics and vehicle project work.',
    },
    {
      icon: Layers,
      title: 'Robotics Control & ROS 2',
      desc: 'Embedded control concepts, distributed ROS 2 nodes, and web-based robot control interfaces.',
    },
    {
      icon: Eye,
      title: 'AI & Edge Computer Vision',
      desc: 'Computer vision is part of the autonomous rover work; implementation and test results are still being documented.',
    },
    {
      icon: ShieldCheck,
      title: 'Cyber-Physical Systems Security',
      desc: 'Cybersecurity training and a local speech-analysis prototype focused on scam indicators and sensitive-number redaction.',
    },
    {
      icon: Terminal,
      title: 'Systems Tooling & Automation',
      desc: 'Python and Flask web interfaces, JavaScript, and software integration across project prototypes.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-cream relative border-t border-burgundy/10 cad-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 01 // PROFESSIONAL IDENTITY &amp; CREATOR PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-wine tracking-tight flex items-center gap-3">
              <span>Engineering Foundations &amp; <i className="text-burgundy font-serif font-normal">Craft</i></span>
              <SpiderLily variant="icon" className="w-6 h-6 opacity-75" />
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-taupe flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-burgundy" />
            <span>{profile.college}</span>
          </div>
        </div>

        {/* Top Portrait & Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Real Photograph with CAD Engineering Frame (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl bg-cream-surface border-2 border-burgundy/25 p-3 shadow-cad group overflow-hidden">
              {/* CAD Crosshair & Corner Marks */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-taupe/70 select-none">
                [DATUM_01 // FACE_ID]
              </div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-taupe/70 select-none">
                CAM: 1024x768
              </div>

              {/* Real Photograph of Vasudev Saras K M */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-wine">
                <img
                  src={getAssetUrl(profile.profileImageUrl || 'assets/profile/vasudev-photo.jpg')}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                {/* Subtle vignette and bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Title Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-wine/90 backdrop-blur-md border border-blush/20 text-cream">
                  <div className="text-xs font-display font-bold tracking-wide">{profile.name}</div>
                  <div className="text-[10px] font-mono text-dusky uppercase">{profile.title}</div>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="mt-2 pt-2 border-t border-burgundy/10 flex items-center justify-between text-[10px] font-mono text-taupe">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>VERIFIED IDENTITY</span>
                </div>
                <span>SAINTGITS // KTU</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Academic Spec Box (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-burgundy font-semibold tracking-wider uppercase block">
                MECHATRONIC SYSTEMS // DISCIPLINED PRECISION
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-wine leading-tight">
                Bridging the gap between physical mechanisms and deterministic computation.
              </h3>
            </div>

            <p className="text-taupe-dark text-sm sm:text-base leading-relaxed font-sans">
              {profile.aboutBio ||
                'I am an undergraduate Robotics & Automation Engineering student at Saintgits College of Engineering. I am interested in building systems that connect mechanical design, embedded control, and software.'}
            </p>

            <p className="text-taupe-dark text-sm sm:text-base leading-relaxed font-sans">
              Across vehicle suspension and steering work, embedded control, and software prototypes, I focus on understanding how the parts of a system fit together and documenting what has actually been designed, implemented, and tested.
            </p>

            {/* Quick Location & Academic Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-taupe">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-surface border border-burgundy/10">
                <MapPin className="w-3.5 h-3.5 text-burgundy" />
                <span>{profile.location}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-surface border border-burgundy/10">
                <GraduationCap className="w-3.5 h-3.5 text-burgundy" />
                <span>B.Tech Robotics &amp; Automation (APJ KTU)</span>
              </span>
            </div>

            {/* Specification Mini-Table */}
            <div className="p-4 rounded-xl bg-cream-surface border border-burgundy/15 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-burgundy/5">
                <span className="text-taupe">Institution:</span>
                <span className="font-medium text-wine text-right">{profile.college}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-burgundy/5">
                <span className="text-taupe">Primary Discipline:</span>
                <span className="font-medium text-wine">Robotics &amp; Automation Engineering</span>
              </div>
              <div className="flex justify-between py-1 border-b border-burgundy/5">
                <span className="text-taupe">Key CAD Platform:</span>
                <span className="font-medium text-wine">Dassault Systèmes SolidWorks</span>
              </div>
              <div className="flex justify-between py-1 border-b border-burgundy/5">
                <span className="text-taupe">Embedded Architectures:</span>
                <span className="font-medium text-wine">STM32 (ARM Cortex-M), ESP32 dual-core</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-taupe">Verification Standard:</span>
                <span className="text-emerald-700 font-semibold">Offline Test-Harnessed &amp; Bench-Tested</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Engineering Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-6 rounded-2xl bg-cream-surface/90 hover:bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm hover:shadow-cad transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-4 group-hover:bg-burgundy group-hover:text-cream transition-colors duration-200">
                  <Icon className="w-5 h-5 text-dusky group-hover:text-cream" />
                </div>
                <h4 className="font-display font-bold text-wine text-lg mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-taupe-dark leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
