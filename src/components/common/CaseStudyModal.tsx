import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Layers, Wrench, AlertTriangle, CheckCircle, Cpu, Calendar, Image as ImageIcon } from 'lucide-react';
import { Project } from '../../types/content';
import { getAssetUrl } from '../../utils/assets';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    setActiveImage(project?.coverImage || '');
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-wine/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-cream w-full max-w-4xl rounded-2xl shadow-2xl border border-burgundy/30 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Top CAD Header Bar */}
        <div className="sticky top-0 z-20 bg-wine text-cream px-6 py-4 flex items-center justify-between border-b border-blush/20">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-dusky animate-pulse"></span>
            <span className="text-blush uppercase tracking-wider font-semibold">
              CASE STUDY SPECIFICATION // {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-cream/80 hover:text-cream hover:bg-burgundy/40 focus:outline-none transition-colors"
            aria-label="Close case study dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
              <span className="px-2.5 py-0.5 rounded bg-burgundy/10 text-burgundy font-semibold">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                {project.projectState}
              </span>
              <span className="text-taupe flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
              </span>
            </div>

            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-extrabold text-wine">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-taupe-dark leading-relaxed font-sans">
              {project.shortDescription}
            </p>
          </div>

          {/* Cover & Interactive Gallery Stage */}
          {activeImage && (
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-burgundy/15 shadow-sm max-h-[440px] bg-wine/5 flex items-center justify-center">
                <img
                  src={getAssetUrl(activeImage)}
                  alt={project.title}
                  className="w-full h-full max-h-[440px] object-contain transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Gallery Thumbnails Strip */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-taupe uppercase tracking-wider">
                    <ImageIcon className="w-3 h-3 text-burgundy" />
                    <span>Technical Gallery &amp; Photos ({project.galleryImages.length} items)</span>
                  </div>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                    {project.coverImage && (
                      <button
                        onClick={() => setActiveImage(project.coverImage)}
                        className={`relative rounded-lg overflow-hidden border-2 flex-shrink-0 w-24 h-16 transition-all ${
                          activeImage === project.coverImage
                            ? 'border-burgundy ring-2 ring-burgundy/30 scale-105 shadow-md'
                            : 'border-burgundy/20 opacity-70 hover:opacity-100'
                        }`}
                        title="Primary Cover"
                      >
                        <img
                          src={getAssetUrl(project.coverImage)}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )}
                    {project.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img.url)}
                        className={`relative rounded-lg overflow-hidden border-2 flex-shrink-0 w-24 h-16 transition-all ${
                          activeImage === img.url
                            ? 'border-burgundy ring-2 ring-burgundy/30 scale-105 shadow-md'
                            : 'border-burgundy/20 opacity-70 hover:opacity-100'
                        }`}
                        title={img.caption || `Gallery ${idx + 1}`}
                      >
                        <img
                          src={getAssetUrl(img.url)}
                          alt={img.caption || `Gallery Image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  {/* Current Caption */}
                  {project.galleryImages.find((g) => g.url === activeImage)?.caption && (
                    <p className="text-xs font-mono text-taupe-dark italic bg-cream-surface px-3 py-2 rounded-lg border border-burgundy/15">
                      ℹ {project.galleryImages.find((g) => g.url === activeImage)?.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Technical Specifications Grid */}
          {project.specifications && Object.keys(project.specifications).length > 0 && (
            <div className="p-5 rounded-xl bg-cream-surface border border-burgundy/15 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-burgundy font-semibold uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-dusky" />
                <span>Verified Engineering Specifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
                {Object.entries(project.specifications).map(([key, value]) => (
                  <div key={key} className="p-2.5 rounded bg-cream border border-burgundy/10">
                    <span className="block text-[10px] text-taupe uppercase">{key}</span>
                    <span className="font-semibold text-wine">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Narrative Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem Statement */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-wine text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>The Engineering Problem</span>
              </h3>
              <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans bg-cream-surface p-4 rounded-xl border border-burgundy/10">
                {project.problemStatement}
              </p>
            </div>

            {/* Design & CAD Process */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-wine text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-burgundy" />
                <span>Design &amp; Synthesis Process</span>
              </h3>
              <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans bg-cream-surface p-4 rounded-xl border border-burgundy/10">
                {project.designProcess}
              </p>
            </div>
          </div>

          {/* Hardware & Software Architecture */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-wine text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-burgundy" />
              <span>Hardware &amp; Software Architecture</span>
            </h3>
            <div className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans bg-cream-surface p-5 rounded-xl border border-burgundy/15 space-y-2">
              <p>{project.hardwareSoftwareArchitecture}</p>
            </div>
          </div>

          {/* Personal Contribution */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-wine text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Personal Engineering Contribution</span>
            </h3>
            <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans bg-cream-surface p-4 rounded-xl border border-burgundy/10">
              {project.personalContribution}
            </p>
          </div>

          {/* Engineering Challenges & Concrete Solutions */}
          {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-wine text-base">
                Critical Engineering Challenges &amp; Verified Solutions
              </h3>
              <div className="space-y-3">
                {project.challengesAndSolutions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-cream-surface border border-burgundy/15 text-xs font-sans space-y-2">
                    <div className="font-semibold text-rose-900 flex items-start gap-1.5">
                      <span className="font-mono text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">CHALLENGE</span>
                      <span>{item.challenge}</span>
                    </div>
                    <div className="text-emerald-950 flex items-start gap-1.5 pl-2 border-l-2 border-emerald-500">
                      <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">SOLUTION</span>
                      <span>{item.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results & Lessons Learned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <h4 className="font-mono font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Validated Results
              </h4>
              <p className="text-emerald-950 leading-relaxed font-sans">{project.results}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
              <h4 className="font-mono font-bold text-amber-900 uppercase tracking-wider mb-1">
                Engineering Lessons
              </h4>
              <p className="text-amber-950 leading-relaxed font-sans">{project.lessonsLearned}</p>
            </div>
          </div>

          {/* Technologies Used Tag Cloud */}
          <div className="pt-2">
            <span className="block text-xs font-mono text-taupe uppercase tracking-wider mb-2">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-cream-surface border border-burgundy/15 text-xs font-mono text-wine"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links & Attachments */}
          <div className="pt-4 border-t border-burgundy/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {project.sourceCodeUrl && (
                <a
                  href={project.sourceCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-burgundy hover:bg-wine text-cream text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                >
                  <Github className="w-4 h-4 text-dusky" />
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-cream-surface hover:bg-cream-darker/60 text-wine border border-burgundy/20 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-burgundy" />
                  <span>Live Deployment</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-taupe hover:text-wine transition-colors"
            >
              Close Case Study [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
