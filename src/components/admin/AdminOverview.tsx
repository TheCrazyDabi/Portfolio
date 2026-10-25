import React from 'react';
import { Project, Certification, Experiment, MediaItem } from '../../types/content';
import { Plus, FolderKanban, Award, FlaskConical, Image, CheckCircle2, Clock, Download } from 'lucide-react';

interface AdminOverviewProps {
  projects: Project[];
  certifications: Certification[];
  experiments: Experiment[];
  media: MediaItem[];
  onNavigateTab: (tab: string) => void;
  onExportSnapshot: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  projects,
  certifications,
  experiments,
  media,
  onNavigateTab,
  onExportSnapshot
}) => {
  const publishedProjects = projects.filter(p => p.status === 'published').length;
  const draftProjects = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-wine">
            Studio Command Center
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Real-time content telemetry, publishing states, and studio records.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onExportSnapshot}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-cream-surface border border-burgundy/20 hover:border-burgundy text-wine text-xs font-mono font-medium transition-colors"
            title="Download full JSON snapshot backup"
          >
            <Download className="w-3.5 h-3.5 text-dusky" />
            <span>Export Snapshot</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-taupe uppercase">Projects</span>
            <FolderKanban className="w-4 h-4 text-burgundy" />
          </div>
          <div className="text-3xl font-display font-bold text-wine">{projects.length}</div>
          <div className="text-[11px] font-mono text-taupe flex items-center gap-2">
            <span className="text-emerald-700 font-semibold">{publishedProjects} Live</span>
            <span>•</span>
            <span className="text-amber-700 font-semibold">{draftProjects} Drafts</span>
          </div>
        </div>

        {/* Certifications */}
        <div
          onClick={() => onNavigateTab('certifications')}
          className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-taupe uppercase">Credentials</span>
            <Award className="w-4 h-4 text-burgundy" />
          </div>
          <div className="text-3xl font-display font-bold text-wine">{certifications.length}</div>
          <div className="text-[11px] font-mono text-taupe">Verified Certificates</div>
        </div>

        {/* Experiments */}
        <div
          onClick={() => onNavigateTab('experiments')}
          className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-taupe uppercase">Lab Builds</span>
            <FlaskConical className="w-4 h-4 text-burgundy" />
          </div>
          <div className="text-3xl font-display font-bold text-wine">{experiments.length}</div>
          <div className="text-[11px] font-mono text-taupe">Workbench Experiments</div>
        </div>

        {/* Media Assets */}
        <div
          onClick={() => onNavigateTab('media')}
          className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-taupe uppercase">Media Library</span>
            <Image className="w-4 h-4 text-burgundy" />
          </div>
          <div className="text-3xl font-display font-bold text-wine">{media.length}</div>
          <div className="text-[11px] font-mono text-taupe">Assets Stored</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 space-y-4">
        <h3 className="font-display font-bold text-wine text-base">Quick Studio Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-dusky" />
            <span>New Project Record</span>
          </button>
          <button
            onClick={() => onNavigateTab('certifications')}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-cream border border-burgundy/20 hover:border-burgundy text-wine text-xs font-mono font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-burgundy" />
            <span>Add Certification</span>
          </button>
          <button
            onClick={() => onNavigateTab('experiments')}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-cream border border-burgundy/20 hover:border-burgundy text-wine text-xs font-mono font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-burgundy" />
            <span>Record Experiment</span>
          </button>
        </div>
      </div>

      {/* Recent Project Records Overview */}
      <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-wine text-base">Project Status Matrix</h3>
          <button
            onClick={() => onNavigateTab('projects')}
            className="text-xs font-mono text-burgundy hover:underline"
          >
            Manage All Projects &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-burgundy/10 text-taupe uppercase text-[10px]">
                <th className="py-2.5">Title</th>
                <th className="py-2.5">Category</th>
                <th className="py-2.5">State</th>
                <th className="py-2.5">Visibility</th>
                <th className="py-2.5 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-burgundy/5">
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-3 font-semibold text-wine">{p.title}</td>
                  <td className="py-3 text-taupe">{p.category}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-cream border border-burgundy/10 text-[10px] text-wine">
                      {p.projectState}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'draft'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {p.status === 'published' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      <span>{p.status.toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="py-3 text-right text-taupe">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
