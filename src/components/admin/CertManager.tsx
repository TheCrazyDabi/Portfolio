import React, { useState } from 'react';
import { Certification } from '../../types/content';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, Award, Save, X, ExternalLink } from 'lucide-react';

interface CertManagerProps {
  certifications: Certification[];
  onSaveCert: (cert: Certification) => Promise<void>;
  onDeleteCert: (id: string) => Promise<void>;
}

export const CertManager: React.FC<CertManagerProps> = ({
  certifications,
  onSaveCert,
  onDeleteCert
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState<Partial<Certification>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = () => {
    setCurrentCert({
      id: '',
      title: '',
      issuingOrganization: '',
      issueDate: new Date().toISOString().slice(0, 7),
      expiryDate: '',
      verificationUrl: '',
      credentialId: '',
      certificateFileUrl: '',
      status: 'published'
    });
    setIsEditing(true);
  };

  const handleEdit = (cert: Certification) => {
    setCurrentCert({ ...cert });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      await onDeleteCert(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCert.title || !currentCert.issuingOrganization) {
      alert('Please enter both title and issuing organization.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveCert(currentCert as Certification);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Error saving certificate.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Certifications Manager
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Maintain verified credentials, issuing bodies, IDs, and document attachments.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-dusky" />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-cream-surface border border-burgundy/15 flex flex-col justify-between space-y-3 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream border border-burgundy/10 text-wine">
                  {cert.issueDate}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    cert.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {cert.status.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display font-bold text-wine text-base">{cert.title}</h3>
              <p className="text-xs font-mono text-burgundy">{cert.issuingOrganization}</p>
              {cert.credentialId && (
                <p className="text-[11px] font-mono text-taupe">ID: {cert.credentialId}</p>
              )}
            </div>

            <div className="pt-3 border-t border-burgundy/10 flex items-center justify-between text-xs font-mono">
              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-burgundy flex items-center gap-1 hover:underline"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : <span />}

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleEdit(cert)}
                  className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
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
          <div className="bg-cream w-full max-w-lg rounded-2xl border border-burgundy/30 shadow-2xl overflow-hidden p-6 text-xs font-mono">
            <div className="flex items-center justify-between pb-4 border-b border-burgundy/15 mb-4">
              <h3 className="font-display font-bold text-wine text-base">
                {currentCert.id ? 'Edit Credential' : 'Add New Credential'}
              </h3>
              <button onClick={() => setIsEditing(false)}>
                <X className="w-5 h-5 text-taupe" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-taupe uppercase mb-1">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={currentCert.title || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Issuing Organization</label>
                <input
                  type="text"
                  required
                  value={currentCert.issuingOrganization || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, issuingOrganization: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-taupe uppercase mb-1">Issue Date (YYYY-MM)</label>
                  <input
                    type="text"
                    value={currentCert.issueDate || ''}
                    onChange={(e) => setCurrentCert({ ...currentCert, issueDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block text-taupe uppercase mb-1">Status</label>
                  <select
                    value={currentCert.status || 'published'}
                    onChange={(e) => setCurrentCert({ ...currentCert, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={currentCert.credentialId || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, credentialId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-surface border border-burgundy/20 text-wine outline-none"
                />
              </div>

              <div>
                <label className="block text-taupe uppercase mb-1">Verification URL (Optional)</label>
                <input
                  type="url"
                  value={currentCert.verificationUrl || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, verificationUrl: e.target.value })}
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
                  {isSaving ? 'Saving...' : 'Save Credential'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
