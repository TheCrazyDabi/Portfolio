import React, { useState } from 'react';
import { Profile } from '../../types/content';
import { Save, User, Mail, Github, Linkedin, FileText, CheckCircle2 } from 'lucide-react';

interface ProfileEditorProps {
  profile: Profile;
  onSaveProfile: (profile: Profile) => Promise<void>;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSaveProfile }) => {
  const [formData, setFormData] = useState<Profile>({ ...profile });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Public Profile &amp; Channels
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Update biographical introductions, verified credentials, and professional URLs.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-cream-surface border border-burgundy/15 space-y-6 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-taupe uppercase mb-1">Full Legal / Professional Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">Engineering Discipline / Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-taupe uppercase mb-1">College / Institution</label>
            <input
              type="text"
              required
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">Degree Program</label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div>
          <label className="block text-taupe uppercase mb-1">Hero Headline Banner</label>
          <input
            type="text"
            required
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
          />
        </div>

        <div>
          <label className="block text-taupe uppercase mb-1">Concise Hero Introduction</label>
          <textarea
            rows={2}
            value={formData.introduction}
            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy font-sans text-xs"
          />
        </div>

        <div>
          <label className="block text-taupe uppercase mb-1">Comprehensive About Biography</label>
          <textarea
            rows={4}
            value={formData.aboutBio}
            onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy font-sans text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-taupe uppercase mb-1">Public Email Channel</label>
            <input
              type="email"
              required
              value={formData.publicEmail}
              onChange={(e) => setFormData({ ...formData, publicEmail: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">GitHub Profile URL</label>
            <input
              type="url"
              required
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              required
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-taupe uppercase mb-1">Verified Résumé PDF URL (Leave blank to hide button)</label>
            <input
              type="url"
              placeholder="https://... or copy from Media Library"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">Status Indicator Pill</label>
            <input
              type="text"
              value={formData.statusIndicator}
              onChange={(e) => setFormData({ ...formData, statusIndicator: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-burgundy/15 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-dusky" />
            <span>{isSaving ? 'Updating...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
