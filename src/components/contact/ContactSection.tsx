import React, { useState } from 'react';
import { Mail, Github, Linkedin, Phone, MapPin, Send, CheckCircle2, Copy, ArrowUpRight, FileText } from 'lucide-react';
import { Profile } from '../../types/content';
import { SpiderLily } from '../common/SpiderLily';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.publicEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-cream relative border-t border-burgundy/10 cad-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-dusky uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 07 // PROFESSIONAL INQUIRIES &amp; COLLABORATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-wine tracking-tight flex items-center justify-center gap-3">
              <span>Let&apos;s <i className="text-burgundy font-serif font-normal">talk</i> &amp; Collaborate</span>
              <SpiderLily variant="icon" className="w-6 h-6 opacity-80" />
            </h2>
            <p className="text-taupe-dark text-sm sm:text-base max-w-xl mx-auto font-sans">
              Currently open for robotics engineering internships, embedded firmware projects, and motorsports CAD challenges.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-cad flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                  <Mail className="w-5 h-5 text-dusky" />
                </div>
                <h3 className="font-display font-bold text-wine text-lg">Direct Channel</h3>
                <p className="text-xs text-taupe font-mono break-all">{profile.publicEmail}</p>
                <div className="flex items-center space-x-1.5 text-xs text-taupe font-mono pt-1">
                  <Phone className="w-3.5 h-3.5 text-dusky" />
                  <span>+91 7012541567</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <a
                  href={`mailto:${profile.publicEmail}`}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-cream hover:bg-cream-darker/60 text-taupe border border-burgundy/15 transition-colors"
                  title="Copy email address to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-cad flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                  <Github className="w-5 h-5 text-dusky" />
                </div>
                <h3 className="font-display font-bold text-wine text-lg">Source Code &amp; Repos</h3>
                <p className="text-xs text-taupe font-mono">github.com/TheCrazyDabi</p>
                <div className="flex items-center space-x-1.5 text-xs text-taupe font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 text-dusky" />
                  <span>{profile.location || 'Calicut, Kerala, India'}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 text-xs font-mono font-semibold transition-colors"
                >
                  <span>Explore GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-dusky" />
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-cad flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-dusky" />
                </div>
                <h3 className="font-display font-bold text-wine text-lg">Professional Network</h3>
                <p className="text-xs text-taupe font-mono">linkedin.com/in/d4biie</p>
                <p className="text-xs text-taupe font-sans pt-1">Vasudev Saras · Dabi</p>
              </div>

              <div className="pt-2">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 text-xs font-mono font-semibold transition-colors"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-dusky" />
                </a>
              </div>
            </div>
          </div>

          {/* Résumé Verification Callout */}
          {profile.resumeUrl ? (
            <div className="p-6 rounded-2xl bg-burgundy text-cream shadow-cad flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-wine flex items-center justify-center text-cream">
                  <FileText className="w-6 h-6 text-dusky" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg">Curriculum Vitae / Résumé</h4>
                  <p className="text-xs text-blush font-mono">Verified PDF document with complete academic history</p>
                </div>
              </div>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cream hover:bg-cream-darker text-burgundy font-mono text-xs uppercase tracking-wider font-bold shadow transition-colors"
              >
                Download Résumé PDF
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
