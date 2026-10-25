import React from 'react';
import { FlaskConical, Calendar, ArrowRight, Code2 } from 'lucide-react';
import { Experiment } from '../../types/content';

interface ExperimentsSectionProps {
  experiments: Experiment[];
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({ experiments }) => {
  if (!experiments || experiments.length === 0) return null;

  return (
    <section id="experiments" className="py-24 bg-cream relative border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 06 // LAB NOTES &amp; MICRO-BUILDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-wine tracking-tight">
              Engineering Lab Experiments
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-mono text-taupe max-w-sm">
            Quick technical evaluations, kinematics algorithms, and circuit tests documented directly from the workbench.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm transition-all duration-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-burgundy/10 text-burgundy uppercase">
                  {exp.category}
                </span>
                <span className="text-[10px] font-mono text-taupe flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.date}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-wine text-lg">
                  {exp.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-taupe-dark font-sans leading-relaxed">
                  {exp.summary}
                </p>
              </div>

              {/* Technical Details Box */}
              <div className="p-3.5 rounded-xl bg-cream border border-burgundy/10 text-xs font-mono text-wine space-y-1">
                <div className="text-[10px] text-taupe uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-dusky" />
                  <span>Workbench Evaluation:</span>
                </div>
                <p className="text-taupe-dark font-sans text-xs">{exp.technicalDetails}</p>
              </div>

              {/* Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-cream-surface border border-burgundy/15 text-taupe-dark"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
