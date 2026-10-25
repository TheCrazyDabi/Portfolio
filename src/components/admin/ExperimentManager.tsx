import React, { useState } from 'react';
import { Experiment } from '../../types/content';
import { Plus, Edit2, Trash2, FlaskConical, X, Save } from 'lucide-react';

interface ExperimentManagerProps {
  experiments: Experiment[];
  onSaveExperiment: (exp: Experiment) => Promise<void>;
  onDeleteExperiment: (id: string) => Promise<void>;
}

export const ExperimentManager: React.FC<ExperimentManagerProps> = ({
  experiments,
  onSaveExperiment,
  onDeleteExperiment
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experiment>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = () => {
    setCurrentExp({
      id: '',
      title: '',
      category: 'CAD Simulation',
      date: new Date().toISOString().slice(0, 7),
      summary: '',
      technicalDetails: '',
      tags: ['Kinematics', 'Firmware'],
      status: 'published'
    });
    setIsEditing(true);
  };

  const handleEdit = (exp: Experiment) => {
    setCurrentExp({ ...exp });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this experiment log?')) {
      await onDeleteExperiment(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExp.title || !currentExp.summary) {
      alert('Please fill in title and summary.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveExperiment(currentExp as Experiment);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Error saving experiment.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Workbench Experiments Manager
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Document small builds, CAD experiments, electronics tests, and algorithms without full case studies.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-dusky" />
          <span>New Experiment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 flex flex-col justify-between space-y-3 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/10 text-burgundy font-semibold uppercase">
                  {exp.category}
                </span>
                <span className="text-[10px] font-mono text-taupe">{exp.date}</span>
              </div>
              <h3 className="font-display font-bold text-wine text-base">{exp.title}</h3>
              <p className="text-xs font-sans text-taupe-dark">{exp.summary}</p>
            </div>

            <div className="pt-3 border-t border-burgundy/10 flex items-center justify-between text-xs font-mono">
              <div className="flex flex-wrap gap-1">
                {exp.tags.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-cream text-taupe border border-burgundy/10">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 bg-wine/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-cream w-full max-w-lg rounded-2xl border border-burgundy/30 shadow-2xl p-6 text-xs font-mono">
            <div className="flex items-center justify-between pb-4 border-b border-burgundy/15 mb-4">
              <h3 className="font-display font-bold text-wine text-base">
                {currentExp.id ? 'Edit Experiment' : 'New Lab Experiment'}
              </h3>
              <button onClick={() => setIsEditing(false)}>
                <X className="w-5 h-5 text-taupe" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-taupe uppercase mb-1">Experiment Title</label>
                <input
                  type="text"
                  required
                  value={currentExp.title || ''}
                  onChange={(e) => setCurrentExp({ ...currentExp, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-taupe uppercase mb-1">Category</label>
                  <select
                    value={currentExp.category || 'CAD Simulation'}
                    onChange={(e) => setCurrentExp({ ...currentExp, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="CAD Simulation">CAD Simulation</option>
                    <option value="Sensor Fusion">Sensor Fusion</option>
                    <option value="Firmware Test">Firmware Test</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Mechanism Test">Mechanism Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Date (YYYY-MM)</label>
                  <input
                    type="text"
                    value={currentExp.date || ''}
                    onChange={(e) => setCurrentExp({ ...currentExp, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={currentExp.summary || ''}
                  onChange={(e) => setCurrentExp({ ...currentExp, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Technical Evaluation Details</label>
                <textarea
                  rows={3}
                  value={currentExp.technicalDetails || ''}
                  onChange={(e) => setCurrentExp({ ...currentExp, technicalDetails: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={currentExp.tags?.join(', ') || ''}
                  onChange={(e) => setCurrentExp({
                    ...currentExp,
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-cream-surface border border-burgundy/20 text-wine"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-burgundy hover:bg-wine text-cream font-semibold"
                >
                  {isSaving ? 'Saving...' : 'Save Experiment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
