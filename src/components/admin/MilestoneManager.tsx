import React, { useState } from 'react';
import { Milestone } from '../../types/content';
import { Plus, Edit2, Trash2, Calendar, MapPin, X, Save } from 'lucide-react';

interface MilestoneManagerProps {
  milestones: Milestone[];
  onSaveMilestone: (ms: Milestone) => Promise<void>;
  onDeleteMilestone: (id: string) => Promise<void>;
}

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({
  milestones,
  onSaveMilestone,
  onDeleteMilestone
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentMs, setCurrentMs] = useState<Partial<Milestone>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = () => {
    setCurrentMs({
      id: '',
      year: '2026',
      title: '',
      subtitle: '',
      organization: '',
      location: 'Kottayam, Kerala',
      description: '',
      highlights: [],
      category: 'Education',
      orderIndex: milestones.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (ms: Milestone) => {
    setCurrentMs({ ...ms });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this milestone entry?')) {
      await onDeleteMilestone(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMs.title || !currentMs.year) {
      alert('Please fill in title and year.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveMilestone(currentMs as Milestone);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Error saving milestone.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Journey &amp; Milestones Manager
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Maintain chronological education history, Baja SAE motorsport roles, and research achievements.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-dusky" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((ms) => (
          <div
            key={ms.id}
            className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-burgundy/10 text-burgundy font-semibold uppercase">
                  {ms.category}
                </span>
                <span className="text-taupe">{ms.year}</span>
              </div>
              <h3 className="font-display font-bold text-wine text-base">{ms.title}</h3>
              <p className="text-xs font-mono text-taupe">{ms.subtitle} • {ms.location}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(ms)}
                className="p-2 rounded-lg text-taupe hover:text-wine hover:bg-cream"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(ms.id)}
                className="p-2 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 bg-wine/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-cream w-full max-w-lg rounded-2xl border border-burgundy/30 shadow-2xl p-6 text-xs font-mono">
            <div className="flex items-center justify-between pb-4 border-b border-burgundy/15 mb-4">
              <h3 className="font-display font-bold text-wine text-base">
                {currentMs.id ? 'Edit Milestone' : 'New Milestone'}
              </h3>
              <button onClick={() => setIsEditing(false)}>
                <X className="w-5 h-5 text-taupe" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-taupe uppercase mb-1">Timeframe / Year</label>
                  <input
                    type="text"
                    required
                    value={currentMs.year || ''}
                    onChange={(e) => setCurrentMs({ ...currentMs, year: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Category</label>
                  <select
                    value={currentMs.category || 'Education'}
                    onChange={(e) => setCurrentMs({ ...currentMs, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Competition">Competition</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Project Milestone">Project Milestone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={currentMs.title || ''}
                  onChange={(e) => setCurrentMs({ ...currentMs, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Subtitle / Role</label>
                <input
                  type="text"
                  value={currentMs.subtitle || ''}
                  onChange={(e) => setCurrentMs({ ...currentMs, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Organization &amp; Location</label>
                <input
                  type="text"
                  value={currentMs.location || ''}
                  onChange={(e) => setCurrentMs({ ...currentMs, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={currentMs.description || ''}
                  onChange={(e) => setCurrentMs({ ...currentMs, description: e.target.value })}
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
                  {isSaving ? 'Saving...' : 'Save Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
