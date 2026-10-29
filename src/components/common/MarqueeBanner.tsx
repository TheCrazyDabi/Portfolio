import React from 'react';
const ITEMS = [
  'Robotics',
  'Automation',
  'Computer Vision',
  'Embedded Systems',
  'Cybersecurity',
  'Local AI',
  'Navigation',
  'Kinematic Control',
  'Robotics Integration',
  'Autonomous Systems',
  'Reverse Kinematics',
  'ROS 2 Humble',
];

export const MarqueeBanner: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-burgundy/15 bg-cream-surface py-3.5 select-none z-10 transition-colors"
      aria-hidden="true"
    >
      <div className="marq-track flex items-center space-x-6 text-dusky font-serif italic text-lg sm:text-xl tracking-wide">
        {/* Repeating sequence 1 */}
        {ITEMS.map((item, idx) => (
          <React.Fragment key={`m1-${idx}`}>
            <span className="whitespace-nowrap hover:text-burgundy transition-colors">
              {item}
            </span>
            <span className="inline-flex items-center text-blush text-sm">
              <span className="mx-2 text-blush text-xs">✦</span>
            </span>
          </React.Fragment>
        ))}

        {/* Repeating sequence 2 (for continuous seamless looping) */}
        {ITEMS.map((item, idx) => (
          <React.Fragment key={`m2-${idx}`}>
            <span className="whitespace-nowrap hover:text-burgundy transition-colors">
              {item}
            </span>
            <span className="inline-flex items-center text-blush text-sm">
              <span className="mx-2 text-blush text-xs">✦</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
