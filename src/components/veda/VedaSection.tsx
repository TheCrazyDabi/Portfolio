import React from 'react';
import { VedaConsole } from './VedaConsole';
import { Terminal, Shield, Zap, Cpu, Sparkles } from 'lucide-react';
import { Profile } from '../../types/content';
import { SpiderLily } from '../common/SpiderLily';

interface VedaSectionProps {
  profile?: Profile | null;
}

export const VedaSection: React.FC<VedaSectionProps> = ({ profile }) => {
  return (
    <section
      id="veda"
      className="py-20 px-4 sm:px-6 lg:px-8 relative bg-cream-surface/60 border-y border-burgundy/15 overflow-hidden"
    >
      {/* Background Decorative Grid and Accents */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-20 hidden lg:block">
        <SpiderLily variant="curling" className="w-48 h-48 filter blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-burgundy/15">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-burgundy font-semibold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>INTELLIGENT SYSTEM ARCHITECTURE // EMBEDDED AI</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-wine">
              V.E.D.A. Interactive AI Terminal
            </h2>
            <p className="text-sm sm:text-base text-taupe-dark max-w-2xl font-sans leading-relaxed">
              Experience Vasudev’s <span className="font-semibold text-wine">Virtual Engine for Data &amp; Analysis</span> live in your browser. Engineered with a truthful diagnostics paradigm, deterministic knowledge retrieval, and zero cloud telemetry.
            </p>
          </div>

          {/* Telemetry Architecture Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-wine/10 border border-burgundy/20 text-wine">
              <Cpu className="w-3.5 h-3.5 text-burgundy" />
              <span>In-Browser Knowledge Engine</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Cloud Telemetry</span>
            </span>
          </div>
        </div>

        {/* Live Terminal Console Embed */}
        <div className="relative shadow-cad rounded-2xl overflow-hidden">
          <VedaConsole profile={profile} />
        </div>

        {/* Bottom Context Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-cream border border-burgundy/15 space-y-1.5">
            <div className="text-burgundy font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-dusky" />
              <span>TRUTHFUL DIAGNOSTICS</span>
            </div>
            <p className="text-taupe-dark font-sans leading-relaxed">
              Every checkmark in the console represents genuine local architecture verification—no superficial spinning mockups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream border border-burgundy/15 space-y-1.5">
            <div className="text-burgundy font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>CROSS-DOMAIN QUERYING</span>
            </div>
            <p className="text-taupe-dark font-sans leading-relaxed">
              Query vehicle dynamics, Jetson Orin Nav2 costmaps, MediArm ESP32 schematics, or request contact endpoints.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream border border-burgundy/15 space-y-1.5">
            <div className="text-burgundy font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>GUIDED WALKTHROUGH</span>
            </div>
            <p className="text-taupe-dark font-sans leading-relaxed">
              Provides real-time mechatronic explanations, project specifications, and interactive guided walkthrough across the portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
