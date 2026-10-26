import React, { useState } from 'react';
import { Project, PublicationStatus } from '../../types/content';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, Archive, Sparkles, ExternalLink, X, Save, Eye } from 'lucide-react';
import { CaseStudyModal } from '../common/CaseStudyModal';

interface ProjectManagerProps {
  projects: Project[];
  onSaveProject: (project: Project) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  onSaveProject,
  onDeleteProject,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // New Project Starter
  const handleAddNew = () => {
    setCurrentProject({
      id: '',
      slug: '',
      title: '',
      category: 'Robotics',
      shortDescription: '',
      status: 'draft',
      projectState: 'In Development',
      coverImage: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      technologies: ['C++', 'Embedded C', 'SolidWorks'],
      problemStatement: '',
      designProcess: '',
      hardwareSoftwareArchitecture: '',
      personalContribution: '',
      challengesAndSolutions: [{ challenge: '', solution: '' }],
      results: '',
      lessonsLearned: '',
      sourceCodeUrl: '',
      demoUrl: '',
      specifications: {},
      isFeatured: false,
      orderIndex: projects.length + 1,
    });
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject({ ...project });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you certain you want to permanently delete this project record? This action cannot be reversed.')) {
      await onDeleteProject(id);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    const nextStatus: PublicationStatus = project.status === 'published' ? 'draft' : 'published';
    await onSaveProject({ ...project, status: nextStatus });
  };

  const handleToggleFeatured = async (project: Project) => {
    await onSaveProject({ ...project, isFeatured: !project.isFeatured });
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.slug) {
      alert('Please fill in both the Project Title and URL Slug.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveProject(currentProject as Project);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Error saving project record.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Project Showcase Manager
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Author, edit, preview, publish, and order engineering case studies.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-dusky" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects Table / List */}
      <div className="bg-cream-surface rounded-2xl border border-burgundy/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-cream border-b border-burgundy/10 text-taupe uppercase text-[10px]">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Title &amp; Category</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-burgundy/5">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-wine">#{proj.orderIndex}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-wine text-sm font-sans">{proj.title}</div>
                    <div className="text-[10px] text-taupe flex items-center gap-2 mt-0.5">
                      <span>/{proj.slug}</span>
                      <span>•</span>
                      <span className="text-burgundy">{proj.category}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-cream border border-burgundy/10 text-[10px] text-wine">
                      {proj.projectState}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                        proj.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : proj.status === 'draft'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                      title="Click to toggle published / draft"
                    >
                      {proj.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{proj.status.toUpperCase()}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        proj.isFeatured
                          ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                          : 'text-taupe hover:text-wine bg-cream'
                      }`}
                      title="Toggle featured status"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => setPreviewProject(proj)}
                        className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream transition-colors"
                        title="Preview Case Study Modal"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(proj)}
                        className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream transition-colors"
                        title="Edit Project Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Full Screen Drawer / Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-wine/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-cream w-full max-w-3xl rounded-2xl border border-burgundy/30 shadow-2xl overflow-hidden my-6">
            <div className="bg-wine text-cream px-6 py-4 flex items-center justify-between border-b border-blush/20">
              <h3 className="font-display font-bold text-lg">
                {currentProject.id ? 'Edit Case Study' : 'Create New Project Record'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-cream/70 hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={currentProject.title || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none focus:border-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={currentProject.slug || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Category</label>
                  <select
                    value={currentProject.category || 'Robotics'}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="Robotics">Robotics</option>
                    <option value="CAD & Mechanical">CAD &amp; Mechanical</option>
                    <option value="Software & AI">Software &amp; AI</option>
                    <option value="Embedded & IoT">Embedded &amp; IoT</option>
                    <option value="Autonomous Systems">Autonomous Systems</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Project State</label>
                  <select
                    value={currentProject.projectState || 'In Development'}
                    onChange={(e) => setCurrentProject({ ...currentProject, projectState: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Prototype Validated">Prototype Validated</option>
                    <option value="In Development">In Development</option>
                    <option value="Research / Concept">Research / Concept</option>
                  </select>
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Publish Status</label>
                  <select
                    value={currentProject.status || 'draft'}
                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Public)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={currentProject.shortDescription || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Cover Image URL / Asset Path</label>
                <input
                  type="text"
                  placeholder="assets/projects/... or https://..."
                  value={currentProject.coverImage || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, coverImage: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={currentProject.technologies?.join(', ') || ''}
                  onChange={(e) => setCurrentProject({
                    ...currentProject,
                    technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Problem Statement</label>
                  <textarea
                    rows={4}
                    value={currentProject.problemStatement || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, problemStatement: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Design &amp; CAD Process</label>
                  <textarea
                    rows={4}
                    value={currentProject.designProcess || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, designProcess: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Hardware &amp; Software Architecture</label>
                <textarea
                  rows={3}
                  value={currentProject.hardwareSoftwareArchitecture || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, hardwareSoftwareArchitecture: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Personal Contribution</label>
                <textarea
                  rows={2}
                  value={currentProject.personalContribution || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, personalContribution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Validated Results</label>
                  <textarea
                    rows={2}
                    value={currentProject.results || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, results: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Lessons Learned</label>
                  <textarea
                    rows={2}
                    value={currentProject.lessonsLearned || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, lessonsLearned: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-taupe uppercase mb-1">Source Code URL</label>
                  <input
                    type="url"
                    value={currentProject.sourceCodeUrl || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, sourceCodeUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Demo / Deployment URL</label>
                  <input
                    type="url"
                    value={currentProject.demoUrl || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, demoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-burgundy/15 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine hover:bg-cream-darker/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-dusky" />
                  <span>{isSaving ? 'Saving...' : 'Save Project Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <CaseStudyModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
};
