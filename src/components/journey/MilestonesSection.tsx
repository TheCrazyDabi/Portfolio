import React from 'react';
import { Milestone } from '../../types/content';
import { Calendar, Award, GraduationCap, MapPin, CheckCircle } from 'lucide-react';

interface MilestonesSectionProps {
  milestones: Milestone[];
}

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({ milestones }) => {
  return (
    <section id="journey" className="py-24 bg-cream relative border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 04 // ENGINEERING TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-wine tracking-tight">
              Academic &amp; Project Milestones
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-mono text-taupe max-w-sm">
            Education, project work, and team experience in chronological order.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-burgundy/20 space-y-12 max-w-4xl mx-auto">
          {milestones.map((item, index) => {
            const isEducation = item.category === 'Education';
            const isCompetition = item.category === 'Competition';

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Axis Node Marker */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 rounded-full bg-cream border-2 border-burgundy flex items-center justify-center text-burgundy shadow-sm group-hover:scale-110 group-hover:bg-burgundy group-hover:text-cream transition-all duration-200">
                  {isEducation ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : isCompetition ? (
                    <Award className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Milestone Card */}
                <div className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm transition-all duration-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-burgundy/10 text-burgundy uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-semibold text-taupe flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-dusky" />
                      <span>{item.year}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-wine">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-burgundy font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Highlights Bulleted List */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-burgundy/10 text-xs font-sans text-taupe-dark">
                      {item.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-dusky mt-1.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-taupe">
                    <MapPin className="w-3 h-3 text-dusky" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
