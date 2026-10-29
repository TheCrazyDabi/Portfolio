import React, { useState } from 'react';
import {
  Project,
  Certification,
  Experiment,
  Skill,
  Milestone,
  Profile,
  SiteSettings,
  MediaItem
} from '../../types/content';
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  FlaskConical,
  Layers,
  Calendar,
  Image,
  User,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { ProjectManager } from './ProjectManager';
import { CertManager } from './CertManager';
import { ExperimentManager } from './ExperimentManager';
import { SkillsManager } from './SkillsManager';
import { MilestoneManager } from './MilestoneManager';
import { MediaLibrary } from './MediaLibrary';
import { ProfileEditor } from './ProfileEditor';
import { SiteSettingsEditor } from './SiteSettingsEditor';
import { ElizChatDataManager } from './ElizChatDataManager';
import { ContentService } from '../../services/contentService';
import { isSupabaseConfigured, supabase } from '../../services/supabase';

interface PortfolioStudioProps {
  userEmail: string;
  projects: Project[];
  certifications: Certification[];
  experiments: Experiment[];
  skills: Skill[];
  milestones: Milestone[];
  profile: Profile;
  settings: SiteSettings;
  media: MediaItem[];
  onCloseStudio: () => void;
  onLogout: () => void;
  onReloadData: () => Promise<void>;
}

export const PortfolioStudio: React.FC<PortfolioStudioProps> = ({
  userEmail,
  projects,
  certifications,
  experiments,
  skills,
  milestones,
  profile,
  settings,
  media,
  onCloseStudio,
  onLogout,
  onReloadData
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'skills', label: 'Skills & Systems', icon: Layers },
    { id: 'milestones', label: 'Milestones', icon: Calendar },
    { id: 'eliz-data', label: 'ELIZ Chat Data', icon: MessageSquare },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'profile', label: 'Profile & Links', icon: User },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  const handleExportSnapshot = () => {
    const json = ContentService.exportCompleteSnapshot();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-snapshot-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-cream text-wine flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 bg-wine text-cream border-b border-blush/20 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-1.5 rounded-lg text-cream/80 hover:text-cream hover:bg-burgundy"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-burgundy flex items-center justify-center text-cream">
              <Shield className="w-4 h-4 text-dusky" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-cream">
                PORTFOLIO STUDIO
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-dusky uppercase">
                // {isSupabaseConfigured() ? 'Supabase Cloud RLS' : 'Local Dev Studio'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="hidden md:inline-block text-blush/70 truncate max-w-xs">
            {userEmail}
          </span>

          <button
            onClick={onCloseStudio}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-burgundy/60 hover:bg-burgundy text-cream transition-colors"
            title="Return to Public Portfolio Site"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-dusky" />
          </button>

          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-cream/70 hover:text-cream hover:bg-burgundy transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-dusky" />
          </button>
        </div>
      </header>

      {/* Studio Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-10 w-64 bg-cream-surface border-r border-burgundy/15 flex flex-col justify-between p-4 transition-transform duration-300 ${
            isMobileNavOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-burgundy text-cream font-semibold shadow-sm'
                      : 'text-taupe hover:text-wine hover:bg-cream'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-dusky' : 'text-taupe'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-burgundy/10 text-[10px] font-mono text-taupe space-y-1">
            <div>TARGET: github.io/Portfolio</div>
            <div>BUILD: Jamstack Ready</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-cream">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && (
              <AdminOverview
                projects={projects}
                certifications={certifications}
                experiments={experiments}
                media={media}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onExportSnapshot={handleExportSnapshot}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectManager
                projects={projects}
                onSaveProject={async (proj) => {
                  await ContentService.saveProject(proj);
                  await onReloadData();
                }}
                onDeleteProject={async (id) => {
                  await ContentService.deleteProject(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'certifications' && (
              <CertManager
                certifications={certifications}
                onSaveCert={async (cert) => {
                  await ContentService.saveCertification(cert);
                  await onReloadData();
                }}
                onDeleteCert={async (id) => {
                  await ContentService.deleteCertification(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'experiments' && (
              <ExperimentManager
                experiments={experiments}
                onSaveExperiment={async (exp) => {
                  await ContentService.saveExperiment(exp);
                  await onReloadData();
                }}
                onDeleteExperiment={async (id) => {
                  await ContentService.deleteExperiment(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsManager
                skills={skills}
                onSaveSkill={async (sk) => {
                  await ContentService.saveSkill(sk);
                  await onReloadData();
                }}
                onDeleteSkill={async (id) => {
                  await ContentService.deleteSkill(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'milestones' && (
              <MilestoneManager
                milestones={milestones}
                onSaveMilestone={async (ms) => {
                  await ContentService.saveMilestone(ms);
                  await onReloadData();
                }}
                onDeleteMilestone={async (id) => {
                  await ContentService.deleteMilestone(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'eliz-data' && <ElizChatDataManager />}

            {activeTab === 'media' && (
              <MediaLibrary
                media={media}
                onUploadMedia={async (file, cat, alt) => {
                  const res = await ContentService.uploadMedia(file, cat, alt);
                  if (res.success) {
                    await onReloadData();
                    return true;
                  } else {
                    throw new Error(res.error || 'Upload failed');
                  }
                }}
                onDeleteMedia={async (id) => {
                  await ContentService.deleteMedia(id);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileEditor
                profile={profile}
                onSaveProfile={async (prof) => {
                  await ContentService.saveProfile(prof);
                  await onReloadData();
                }}
              />
            )}

            {activeTab === 'settings' && (
              <SiteSettingsEditor
                settings={settings}
                onSaveSettings={async (st) => {
                  await ContentService.saveSiteSettings(st);
                  await onReloadData();
                }}
                onReloadAll={onReloadData}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
