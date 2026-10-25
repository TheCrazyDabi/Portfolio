import React, { useState, useRef } from 'react';
import { SiteSettings } from '../../types/content';
import { Save, Download, Upload, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ContentService } from '../../services/contentService';

interface SiteSettingsEditorProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => Promise<void>;
  onReloadAll: () => Promise<void>;
}

export const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({
  settings,
  onSaveSettings,
  onReloadAll
}) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating settings');
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleImportSnapshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      const res = ContentService.importCompleteSnapshot(content);
      if (res.success) {
        alert('Snapshot imported successfully. Reloading studio data...');
        await onReloadAll();
      } else {
        alert(`Import failed: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = async () => {
    if (window.confirm('WARNING: This will reset all records to initial factory seed data. Any unexported custom changes will be overwritten. Continue?')) {
      ContentService.resetToDefaults();
      await onReloadAll();
      alert('Content reset to factory default specifications.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Site Configuration &amp; Snapshot Operations
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Section visibility switches, hero animation triggers, and JSON database backup/restoration.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-cream-surface border border-burgundy/15 space-y-6 text-xs font-mono">
        <div className="space-y-4">
          <h3 className="font-display font-bold text-wine text-base">Public Section Toggles</h3>
          <p className="text-taupe font-sans text-xs">
            Disable sections that do not currently have verified entries to keep the public portfolio clean and authentic.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-burgundy/10 cursor-pointer">
              <span className="text-wine font-medium">Show Credentials &amp; Certifications</span>
              <input
                type="checkbox"
                checked={formData.showCertifications}
                onChange={(e) => setFormData({ ...formData, showCertifications: e.target.checked })}
                className="w-4 h-4 accent-burgundy cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-burgundy/10 cursor-pointer">
              <span className="text-wine font-medium">Show Workbench Lab Experiments</span>
              <input
                type="checkbox"
                checked={formData.showExperiments}
                onChange={(e) => setFormData({ ...formData, showExperiments: e.target.checked })}
                className="w-4 h-4 accent-burgundy cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-burgundy/10 cursor-pointer">
              <span className="text-wine font-medium">Show Journey &amp; Milestones Timeline</span>
              <input
                type="checkbox"
                checked={formData.showMilestones}
                onChange={(e) => setFormData({ ...formData, showMilestones: e.target.checked })}
                className="w-4 h-4 accent-burgundy cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-burgundy/10 cursor-pointer">
              <span className="text-wine font-medium">Enable Hero Kinematics Animation</span>
              <input
                type="checkbox"
                checked={formData.enableHeroAnimations}
                onChange={(e) => setFormData({ ...formData, enableHeroAnimations: e.target.checked })}
                className="w-4 h-4 accent-burgundy cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-burgundy/10 space-y-4">
          <h3 className="font-display font-bold text-wine text-base">Metadata &amp; SEO Configuration</h3>
          <div>
            <label className="block text-taupe uppercase mb-1">Global Page Title</label>
            <input
              type="text"
              value={formData.siteTitle}
              onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none"
            />
          </div>
          <div>
            <label className="block text-taupe uppercase mb-1">Search Engine Meta Description</label>
            <textarea
              rows={2}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cream border border-burgundy/20 text-wine outline-none font-sans text-xs"
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
            <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>

      {/* Snapshot Backup & Restore Operations */}
      <div className="p-6 sm:p-8 rounded-2xl bg-cream-surface border border-burgundy/15 space-y-4 text-xs font-mono">
        <h3 className="font-display font-bold text-wine text-base">
          Snapshot Backup &amp; Migration Tool
        </h3>
        <p className="text-taupe font-sans text-xs">
          Export your complete studio dataset as a single formatted JSON file. You can commit this file to your GitHub repository to update the static GitHub Pages build or migrate records to Supabase.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportSnapshot}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-burgundy text-cream font-semibold hover:bg-wine transition-colors"
          >
            <Download className="w-4 h-4 text-dusky" />
            <span>Export Snapshot JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportSnapshot}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-cream border border-burgundy/20 hover:border-burgundy text-wine font-semibold transition-colors"
          >
            <Upload className="w-4 h-4 text-burgundy" />
            <span>Import Snapshot JSON</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 font-semibold transition-colors ml-auto"
          >
            <RefreshCw className="w-4 h-4 text-rose-600" />
            <span>Reset to Factory Seed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
