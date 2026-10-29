import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  onOpenStudio: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenStudio, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    const savedTheme = localStorage.getItem('portfolio_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('portfolio_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('portfolio_theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'ELIZ AI', href: '#veda', isHighlight: true },
    { label: 'Systems & Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/90 dark:bg-[#220B14]/90 backdrop-blur-md border-b border-burgundy/10 dark:border-white/10 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group flex items-center text-burgundy focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-wine">
              VASUDEV SARAS K M
            </span>
            <span className="text-[10px] font-mono text-taupe uppercase tracking-widest hidden sm:inline">
              ROBOTICS &amp; AUTOMATION · DABI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden 2xl:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-2 py-1.5 rounded-full text-[11px] font-mono tracking-wide transition-all flex items-center gap-1.5 ${
                  link.isHighlight
                    ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 font-bold shadow-sm'
                    : isActive
                    ? 'text-burgundy dark:text-cream bg-burgundy/10 dark:bg-white/10 font-semibold'
                    : 'text-taupe hover:text-burgundy dark:hover:text-cream hover:bg-cream-darker/50 dark:hover:bg-white/5'
                }`}
              >
                {link.isHighlight && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Ambient Sound, Theme Toggle, Portfolio Studio & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            id="th"
            aria-label="Toggle dark/light theme"
            className="hidden 2xl:inline-flex p-2 rounded-full border border-burgundy/20 dark:border-white/20 text-wine hover:text-burgundy dark:hover:text-cream hover:bg-cream-darker/50 dark:hover:bg-white/10 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-blush" />
            ) : (
              <Moon className="w-4 h-4 text-burgundy" />
            )}
          </button>

          <button
            onClick={onOpenStudio}
            className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-burgundy/5 hover:bg-burgundy text-burgundy hover:text-cream border border-burgundy/20 hover:border-burgundy transition-all duration-200"
            title="Open Portfolio Studio Admin"
          >
            <Settings className="w-3.5 h-3.5 text-dusky" />
            <span className="hidden xl:inline">Portfolio Studio</span>
            <span className="xl:hidden">Studio</span>
          </button>

          <a
            href="#contact"
            className="hidden 2xl:inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-burgundy text-cream hover:bg-wine shadow-sm transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3 h-3 text-dusky" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="2xl:hidden p-2 rounded-lg text-burgundy hover:bg-cream-darker/60 focus:outline-none"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div id="mobile-navigation" className="2xl:hidden bg-cream dark:bg-[#220B14] border-b border-burgundy/15 dark:border-white/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <nav aria-label="Mobile site navigation" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  className={`px-3 py-2.5 rounded-lg text-sm font-mono flex items-center justify-between transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'bg-burgundy/10 text-burgundy font-semibold'
                      : 'text-wine hover:bg-cream-darker/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isHighlight && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-burgundy/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-mono text-wine bg-cream-surface hover:bg-cream-darker/60 border border-burgundy/10"
              >
                <span>{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
                {isDark ? <Sun className="w-4 h-4 text-burgundy" /> : <Moon className="w-4 h-4 text-burgundy" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenStudio();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-burgundy/10 text-burgundy font-medium"
              >
                <Settings className="w-4 h-4 text-dusky" />
                <span>Open Portfolio Studio</span>
              </button>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg text-xs font-mono bg-burgundy text-cream font-medium"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
