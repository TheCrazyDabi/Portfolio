import React, { useState } from 'react';
import { Box, Cpu, Layers, Eye, ShieldCheck, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { Skill, SkillCategory } from '../../types/content';
import { SpiderLily } from '../common/SpiderLily';

interface SkillsDiagramProps {
  skills: Skill[];
}

export const SkillsDiagram: React.FC<SkillsDiagramProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Robotics & Automation');

  const categories: { name: SkillCategory; icon: any; color: string; desc: string }[] = [
    {
      name: 'Robotics & Automation',
      icon: Layers,
      color: 'bg-burgundy text-cream',
      desc: 'Kinematic transformations, ROS 2 distributed nodes, PWM motion control, and multi-axis manipulator teleoperation.'
    },
    {
      name: 'CAD & Mechanical',
      icon: Box,
      color: 'bg-wine text-cream',
      desc: 'SolidWorks parametric modeling, Ackermann steering synthesis, GD&T tolerancing, and rapid additive prototyping.'
    },
    {
      name: 'Embedded Systems',
      icon: Cpu,
      color: 'bg-burgundy-light text-cream',
      desc: 'Real-time firmware on STM32/ESP32, CAN-bus 2.0B networks, FreeRTOS deterministic task scheduling, and isolated power rails.'
    },
    {
      name: 'AI & Computer Vision',
      icon: Eye,
      color: 'bg-dusky text-cream',
      desc: '6-DoF pose estimation with OpenCV, ArUco fiducials for robotic docking, and local-first LLM inference engines.'
    },
    {
      name: 'Cybersecurity',
      icon: ShieldCheck,
      color: 'bg-wine text-cream',
      desc: 'Protecting cyber-physical actuator interfaces, mitigating unauthorized CAN injection attacks, and firmware cryptographic verification.'
    },
    {
      name: 'Core Engineering & Tools',
      icon: Terminal,
      color: 'bg-taupe text-cream',
      desc: 'High-performance C/C++, Python systems programming, Git version control, Linux environments, and test harnesses.'
    }
  ];

  const activeSkills = skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-cream relative border-t border-burgundy/10 cad-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-burgundy/15">
          <div>
            <div className="text-xs font-mono text-dusky uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-burgundy"></span>
              <span>SECTION 03 // SYSTEMS ARCHITECTURE &amp; COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-wine tracking-tight flex items-center gap-3">
              <span>Skills &amp; <i className="text-burgundy font-serif font-normal">toolkit</i></span>
              <SpiderLily variant="icon" className="w-6 h-6 opacity-75" />
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs font-mono text-taupe max-w-sm">
            Organized as interdependent systems engineering domains rather than arbitrary percentage bars.
          </p>
        </div>

        {/* Interactive Systems Topology Diagram */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-cream-surface border border-burgundy/20 shadow-cad">
          <div className="flex items-center justify-between pb-4 border-b border-burgundy/10 text-xs font-mono text-taupe">
            <span className="text-burgundy font-semibold">SYSTEMS TOPOLOGY INTERACTION</span>
            <span>CLICK A NODE TO REVEAL TOOLS &amp; ARCHITECTURES</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`p-4 rounded-xl flex flex-col items-center text-center transition-all duration-200 border ${
                    isSelected
                      ? 'bg-burgundy text-cream border-burgundy shadow-cad scale-105'
                      : 'bg-cream text-wine hover:bg-cream-darker/60 border-burgundy/15'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 ${
                    isSelected ? 'bg-wine text-dusky' : 'bg-burgundy/10 text-burgundy'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold leading-tight">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Node Deep Dive */}
          <div className="mt-8 pt-6 border-t border-burgundy/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-dusky uppercase tracking-wider font-semibold">
                ACTIVE DOMAIN SPECIFICATION
              </span>
              <h3 className="font-display font-bold text-xl text-wine">
                {activeCategory}
              </h3>
              <p className="text-xs text-taupe-dark max-w-2xl font-sans">
                {categories.find(c => c.name === activeCategory)?.desc}
              </p>
            </div>
            <div className="px-3 py-1.5 rounded bg-cream border border-burgundy/15 text-xs font-mono text-wine whitespace-nowrap">
              <span>{activeSkills.length} Verified Modules</span>
            </div>
          </div>
        </div>

        {/* Detailed Competency Cards for Selected Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-cream-surface border border-burgundy/15 hover:border-burgundy/40 shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-burgundy/10 text-burgundy uppercase">
                    {skill.level || 'Proficient'}
                  </span>
                  <span className="text-[10px] font-mono text-taupe">MODULE #{skill.orderIndex}</span>
                </div>

                <h4 className="font-display font-bold text-wine text-lg mb-2">
                  {skill.name}
                </h4>

                {skill.description && (
                  <p className="text-xs text-taupe-dark font-sans leading-relaxed mb-4">
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Tool / Concept Pills */}
              <div className="pt-3 border-t border-burgundy/10">
                <span className="block text-[10px] font-mono text-taupe uppercase mb-1.5">
                  Verified Tools &amp; Methods:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cream border border-burgundy/10 text-wine"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{tool}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
