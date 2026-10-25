import React, { useState, useRef } from 'react';
import { MediaItem } from '../../types/content';
import { UploadCloud, Image, FileText, Trash2, Copy, CheckCircle2, Search, Filter } from 'lucide-react';

interface MediaLibraryProps {
  media: MediaItem[];
  onUploadMedia: (file: File, category: MediaItem['category'], altText: string) => Promise<boolean>;
  onDeleteMedia: (id: string) => Promise<void>;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  media,
  onUploadMedia,
  onDeleteMedia
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<MediaItem['category']>('projects');
  const [altText, setAltText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = media.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.altText?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const ok = await onUploadMedia(file, uploadCategory, altText);
      if (ok) {
        setAltText('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this media asset from library?')) {
      await onDeleteMedia(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-burgundy/15 gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-wine">
            Media &amp; Asset Library
          </h2>
          <p className="text-xs font-mono text-taupe mt-1">
            Store, categorize, and verify CAD diagrams, PCB schematics, photos, and PDF certificates.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-burgundy hover:bg-wine text-cream text-xs font-mono font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4 text-dusky" />
            <span>{isUploading ? 'Uploading...' : 'Upload Asset'}</span>
          </button>
        </div>
      </div>

      {/* Upload Metadata Settings Strip */}
      <div className="p-4 rounded-xl bg-cream-surface border border-burgundy/15 flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-taupe uppercase">Upload Target:</span>
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value as any)}
            className="p-1.5 rounded-lg bg-cream border border-burgundy/20 text-wine"
          >
            <option value="projects">Projects</option>
            <option value="certifications">Certifications</option>
            <option value="experiments">Experiments</option>
            <option value="profile">Profile</option>
            <option value="documents">Documents</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Default Alt Text / Description (optional)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full p-1.5 rounded-lg bg-cream border border-burgundy/20 text-wine outline-none"
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['all', 'projects', 'certifications', 'experiments', 'documents'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg uppercase ${
                selectedCategory === cat
                  ? 'bg-burgundy text-cream font-semibold'
                  : 'bg-cream-surface text-wine border border-burgundy/10 hover:bg-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-taupe absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-cream-surface border border-burgundy/15 text-wine outline-none"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-cream-surface rounded-2xl border border-burgundy/15 overflow-hidden flex flex-col justify-between shadow-sm group"
          >
            <div className="relative aspect-video bg-burgundy/5 flex items-center justify-center overflow-hidden">
              {item.fileType === 'pdf' ? (
                <div className="flex flex-col items-center justify-center text-taupe">
                  <FileText className="w-10 h-10 text-burgundy" />
                  <span className="text-[10px] font-mono mt-1 font-semibold uppercase">PDF DOCUMENT</span>
                </div>
              ) : (
                <img
                  src={item.fileUrl}
                  alt={item.altText || item.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              )}
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-wine/80 text-cream uppercase">
                {item.category}
              </span>
            </div>

            <div className="p-3 space-y-2">
              <div className="font-mono text-xs font-semibold text-wine truncate" title={item.fileName}>
                {item.fileName}
              </div>
              <div className="text-[10px] font-mono text-taupe flex justify-between">
                <span>{(item.fileSize / 1024).toFixed(0)} KB</span>
                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
              </div>

              <div className="pt-2 border-t border-burgundy/10 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleCopyUrl(item.fileUrl, item.id)}
                  className="inline-flex items-center gap-1 text-burgundy hover:text-wine font-medium"
                >
                  {copiedId === item.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded text-rose-600 hover:text-rose-800"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
