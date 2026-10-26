import React, { useState, useEffect } from 'react';
import {
  Project,
  Certification,
  Experiment,
  Skill,
  Milestone,
  Profile,
  SiteSettings,
  MediaItem
} from './types/content';
import { ContentService } from './services/contentService';
import { Navigation } from './components/common/Navigation';
import { ProgressBar } from './components/common/ProgressBar';
import { MarqueeBanner } from './components/common/MarqueeBanner';
import { SakuraSpiderLilyAmbience } from './components/common/SakuraSpiderLilyAmbience';
import { AmbientSoundController } from './components/common/AmbientSoundController';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { VedaSection } from './components/veda/VedaSection';
import { SkillsDiagram } from './components/skills/SkillsDiagram';
import { MilestonesSection } from './components/journey/MilestonesSection';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { ExperimentsSection } from './components/experiments/ExperimentsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { ChibiCompanion } from './components/companion/ChibiCompanion';
import { AdminLogin } from './components/admin/AdminLogin';
import { PortfolioStudio } from './components/admin/PortfolioStudio';
import { supabase, isSupabaseConfigured } from './services/supabase';

export const App: React.FC = () => {
  // Public Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [adminProjects, setAdminProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Studio Admin Navigation State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Active section for navigation tracker
  const [activeSection, setActiveSection] = useState('hero');

  // Load public content & check existing sessions
  const loadContent = async () => {
    try {
      const [
        pubProjects,
        admProjects,
        certs,
        exps,
        sks,
        mils,
        prof,
        stg,
        med
      ] = await Promise.all([
        ContentService.getPublicProjects(),
        ContentService.getAllProjectsAdmin(),
        ContentService.getPublicCertifications(),
        ContentService.getPublicExperiments(),
        ContentService.getPublicSkills(),
        ContentService.getPublicMilestones(),
        ContentService.getProfile(),
        ContentService.getSiteSettings(),
        ContentService.getAllMedia(),
      ]);

      setProjects(pubProjects);
      setAdminProjects(admProjects);
      setCertifications(certs);
      setExperiments(exps);
      setSkills(sks);
      setMilestones(mils);
      setProfile(prof);
      setSettings(stg);
      setMedia(med);
    } catch (err) {
      console.error('Error loading portfolio content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();

    // Check for existing authenticated session
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          setIsAdminLoggedIn(true);
          setUserEmail(data.session.user.email || 'admin@portfolio');
        }
      });
    } else {
      const localSession = sessionStorage.getItem('portfolio_local_admin_session');
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          if (parsed.authenticated) {
            setIsAdminLoggedIn(true);
            setUserEmail(parsed.email || 'local-admin');
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  // Intersection Observer for active section navigation indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'veda', 'skills', 'journey', 'credentials', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.25 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isLoading]);

  const handleOpenStudio = () => {
    if (isAdminLoggedIn) {
      setIsStudioOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (email: string) => {
    setIsAdminLoggedIn(true);
    setUserEmail(email);
    setIsLoginModalOpen(false);
    setIsStudioOpen(true);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('portfolio_local_admin_session');
    setIsAdminLoggedIn(false);
    setUserEmail('');
    setIsStudioOpen(false);
  };

  if (isLoading || !profile || !settings) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-burgundy flex items-center justify-center mb-4 animate-bounce">
          <div className="w-4 h-4 rounded-full bg-dusky animate-ping" />
        </div>
        <h2 className="font-display font-bold text-wine text-xl">
          Initializing Engineering Studio...
        </h2>
        <p className="font-mono text-xs text-taupe mt-1">
          Loading CAD kinematics &amp; telemetry models
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-wine font-sans antialiased selection:bg-dusky selection:text-white">
      <ProgressBar />
      <SakuraSpiderLilyAmbience />

      {/* Global Header Navigation */}
      <Navigation
        onOpenStudio={handleOpenStudio}
        activeSection={activeSection}
      />

      {/* Public Portfolio Flow */}
      <main>
        <HeroSection profile={profile} />
        <MarqueeBanner />
        <AboutSection profile={profile} />
        <ProjectShowcase projects={projects} />
        <VedaSection profile={profile} />
        {settings.showSystemArchitecture && <SkillsDiagram skills={skills} />}
        {settings.showMilestones && <MilestonesSection milestones={milestones} />}
        {settings.showCertifications && <CertificationsSection certifications={certifications} />}
        {settings.showExperiments && <ExperimentsSection experiments={experiments} />}
        <ContactSection profile={profile} />
      </main>

      {/* Engineering Footer */}
      <Footer
        profile={profile}
        onOpenStudio={handleOpenStudio}
      />

      {/* Soothing Cherry Blossom Zen Ambience Sound Controller */}
      {!isStudioOpen && (
        <AmbientSoundController variant="floating" />
      )}

      {/* Interactive Animated Chibi Companion */}
      {!isStudioOpen && (
        <ChibiCompanion activeSection={activeSection} />
      )}

      {/* Admin Login Dialog */}
      {isLoginModalOpen && (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setIsLoginModalOpen(false)}
        />
      )}

      {/* Full Authenticated Portfolio Studio Interface */}
      {isStudioOpen && (
        <PortfolioStudio
          userEmail={userEmail}
          projects={adminProjects}
          certifications={certifications}
          experiments={experiments}
          skills={skills}
          milestones={milestones}
          profile={profile}
          settings={settings}
          media={media}
          onCloseStudio={() => setIsStudioOpen(false)}
          onLogout={handleLogout}
          onReloadData={loadContent}
        />
      )}
    </div>
  );
};

export default App;
