import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Project } from '../../types/content';
import { CaseStudyModal } from '../common/CaseStudyModal';
import { SpiderLily } from '../common/SpiderLily';
import { getAssetUrl } from '../../utils/assets';

interface ProjectShowcaseProps {
  projects: Project[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Robotics',
    'CAD & Mechanical',
    'Software & AI',
    'Cybersecurity',
    'Embedded & IoT',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-cream relative border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 02 // ENGINEERING ARTIFACTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-wine tracking-tight flex items-center gap-3">
              <span>Selected <i className="text-burgundy font-serif font-normal">projects</i></span>
              <SpiderLily variant="icon" className="w-6 h-6 opacity-75" />
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-mono text-taupe max-w-sm">
            Each one is a system I designed, built and shipped across robotics, CAD kinematics, AI, and cybersecurity.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-burgundy/5">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-taupe mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-dusky" />
            <span>DISCIPLINE:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-burgundy text-cream font-semibold shadow-sm'
                  : 'bg-cream-surface text-wine hover:bg-cream-darker/60 border border-burgundy/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid or Empty Staging State */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-burgundy/20 bg-cream-surface/80 p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center mx-auto text-burgundy shadow-sm">
              <Layers className="w-8 h-8 text-burgundy" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-wine">
                Projects Staging in Progress
              </h3>
              <p className="text-sm font-sans text-taupe-dark max-w-md mx-auto leading-relaxed">
                Project case studies, telemetry logs, and CAD models are currently being curated and will be uploaded sequentially.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="px-3.5 py-1.5 rounded-full bg-cream border border-burgundy/15 text-taupe font-medium">
                [PIPELINE: ACTIVE]
              </span>
              <a
                href="#veda"
                className="px-4 py-1.5 rounded-full bg-burgundy text-cream font-semibold hover:bg-wine shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Query V.E.D.A. AI Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-dusky" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group bg-cream-surface rounded-2xl border border-burgundy/15 hover:border-burgundy/40 shadow-sm hover:shadow-cad transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Card Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-burgundy/5 border-b border-burgundy/10">
                  <img
                    src={getAssetUrl(project.coverImage)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Status Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-wine/90 text-cream backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-cream/90 text-wine backdrop-blur-sm border border-burgundy/20">
                      {project.projectState}
                    </span>
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-burgundy text-cream shadow-sm">
                        <Sparkles className="w-3 h-3 text-dusky" />
                        <span>FEATURED</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-wine group-hover:text-burgundy transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-cream border border-burgundy/10 text-wine"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-taupe">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Action Row */}
                  <div className="pt-4 border-t border-burgundy/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-burgundy font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-dusky" />
                    </span>

                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      {project.sourceCodeUrl && (
                        <a
                          href={project.sourceCodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream-darker/60 transition-colors"
                          title="View GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-taupe hover:text-wine hover:bg-cream-darker/60 transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
