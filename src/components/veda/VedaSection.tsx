import React from 'react';
import { VedaConsole } from './VedaConsole';
import { Terminal, Zap, Sparkles } from 'lucide-react';
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
              <span>PORTFOLIO GUIDE</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-wine">
              VEDA
            </h2>
            <p className="text-sm sm:text-base text-taupe-dark max-w-2xl font-sans leading-relaxed">
              Ask V.E.D.A. about Vasudev’s projects and background, or use it to navigate the portfolio.
            </p>
          </div>

          <span className="rounded-lg border border-burgundy/20 bg-wine/10 px-3 py-1.5 text-xs font-mono text-wine">
            Ask about projects, skills, and background
          </span>
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
              The console answers portfolio questions and helps navigate sections; it does not run live hardware diagnostics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream border border-burgundy/15 space-y-1.5">
            <div className="text-burgundy font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>CROSS-DOMAIN QUERYING</span>
            </div>
            <p className="text-taupe-dark font-sans leading-relaxed">
              Ask about documented work in vehicle dynamics, rover navigation, MediArm, and other portfolio topics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream border border-burgundy/15 space-y-1.5">
            <div className="text-burgundy font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>GUIDED WALKTHROUGH</span>
            </div>
            <p className="text-taupe-dark font-sans leading-relaxed">
              Explore project summaries and move through the portfolio with the guided walkthrough.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
