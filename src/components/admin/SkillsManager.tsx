import React, { useState } from 'react';
import { Skill, SkillCategory } from '../../types/content';
import { Plus, Edit2, Trash2, Layers, X, Save } from 'lucide-react';

interface SkillsManagerProps {
  skills: Skill[];
  onSaveSkill: (skill: Skill) => Promise<void>;
  onDeleteSkill: (id: string) => Promise<void>;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({
  skills,
  onSaveSkill,
  onDeleteSkill
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = () => {
    setCurrentSkill({
      id: '',
      name: '',
      category: 'Robotics & Automation',
      level: 'Proficient',
      tools: [],
      description: '',
      orderIndex: skills.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (skill: Skill) => {
    setCurrentSkill({ ...skill });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this skill module?')) {
      await onDeleteSkill(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkill.name) {
      alert('Skill module name is required.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveSkill(currentSkill as Skill);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Error saving skill.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Systems &amp; Skills Architecture Manager
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Configure technical disciplines, tools, and competency tiers without arbitrary percentage bars.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-dusky" />
          <span>Add Skill Module</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 flex flex-col justify-between space-y-3 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/10 text-burgundy font-semibold">
                  {skill.category}
                </span>
                <span className="text-[10px] font-mono text-taupe">#{skill.orderIndex}</span>
              </div>
              <h3 className="font-display font-bold text-wine text-base">{skill.name}</h3>
              {skill.description && (
                <p className="text-xs font-sans text-taupe-dark">{skill.description}</p>
              )}
            </div>

            <div className="pt-3 border-t border-burgundy/10">
              <div className="flex flex-wrap gap-1 mb-3">
                {skill.tools.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-cream border border-burgundy/10 text-wine font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-taupe uppercase font-semibold">
                  Tier: {skill.level || 'Proficient'}
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
                {currentSkill.id ? 'Edit Skill Module' : 'New Skill Module'}
              </h3>
              <button onClick={() => setIsEditing(false)}>
                <X className="w-5 h-5 text-taupe" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-taupe uppercase mb-1">Module Name</label>
                <input
                  type="text"
                  required
                  value={currentSkill.name || ''}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-taupe uppercase mb-1">Category</label>
                  <select
                    value={currentSkill.category || 'Robotics & Automation'}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="Robotics & Automation">Robotics &amp; Automation</option>
                    <option value="CAD & Mechanical">CAD &amp; Mechanical</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                    <option value="AI & Computer Vision">AI &amp; Computer Vision</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Core Engineering & Tools">Core Engineering &amp; Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Competency Level</label>
                  <select
                    value={currentSkill.level || 'Proficient'}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, level: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="Fundamental">Fundamental</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={currentSkill.description || ''}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Tools / Concepts (comma-separated)</label>
                <input
                  type="text"
                  value={currentSkill.tools?.join(', ') || ''}
                  onChange={(e) => setCurrentSkill({
                    ...currentSkill,
                    tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
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
                  {isSaving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
