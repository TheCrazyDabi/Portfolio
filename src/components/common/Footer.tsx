import React from 'react';
import { GitBranch, Shield, Terminal, ArrowUp, ExternalLink } from 'lucide-react';
import { Profile } from '../../types/content';
import { SpiderLily } from './SpiderLily';

interface FooterProps {
  profile: Profile;
  onOpenStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenStudio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-wine text-cream border-t border-burgundy/30 pt-16 pb-12 overflow-hidden">
      {/* Subtle CAD Grid Background on Footer */}
      <div className="absolute inset-0 cad-grid-bg-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-blush/15">
          {/* Col 1: Identity & Engineering Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-dusky font-mono text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ENGINEERING STUDIO SPEC // DEPLOYMENT VERIFIED</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-cream tracking-tight">
              {profile.name}
            </h3>
            <p className="text-blush/80 text-sm max-w-md leading-relaxed font-sans">
              Robotics &amp; Automation Engineer at {profile.college}. Synthesizing physical CAD mechanisms, deterministic microcontroller firmware, ROS 2 pipelines, and edge AI systems.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-dusky hover:text-cream flex items-center gap-1 transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-dusky hover:text-cream flex items-center gap-1 transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`mailto:${profile.publicEmail}`}
                className="text-xs font-mono text-dusky hover:text-cream flex items-center gap-1 transition-colors"
              >
                <span>Email Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Engineering Domains */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-dusky uppercase tracking-wider font-semibold">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs font-mono text-blush/70">
              <li className="hover:text-cream transition-colors">Articulated Manipulators</li>
              <li className="hover:text-cream transition-colors">Ackermann Kinematics</li>
              <li className="hover:text-cream transition-colors">Bare-Metal Firmware (STM32/ESP32)</li>
              <li className="hover:text-cream transition-colors">ROS 2 Distributed Systems</li>
              <li className="hover:text-cream transition-colors">Cyber-Physical Hardware Security</li>
            </ul>
          </div>

          {/* Col 3: Architecture & Security */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-dusky uppercase tracking-wider font-semibold">
              Deployment &amp; Admin
            </h4>
            <ul className="space-y-2 text-xs font-mono text-blush/70">
              <li className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-dusky" />
                <span>GitHub Pages Target</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-dusky" />
                <span>Row-Level Security (RLS)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-dusky" />
                <span>Client-Safe API Engine</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenStudio}
                  className="px-3 py-1.5 rounded bg-burgundy hover:bg-burgundy-light text-cream text-xs font-mono transition-colors border border-dusky/30 flex items-center gap-1.5"
                >
                  <span>Launch Portfolio Studio</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-taupe-light gap-4">
          <div className="flex items-center space-x-2">
            <SpiderLily variant="icon" className="w-4 h-4 opacity-80" />
            <span>Designed &amp; built by Dabi (Vasudev Saras K M)</span>
            <span className="text-blush/30">•</span>
            <span>B.Tech Robotics &amp; Automation</span>
            <span className="text-blush/30">•</span>
            <span className="text-dusky">Saintgits College of Engineering</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-dusky hover:text-cream transition-colors group"
          >
            <span>Return to Origin [TOP]</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
