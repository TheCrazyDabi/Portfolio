import React, { useState, useEffect, useRef } from 'react';

interface RoboticArmCADProps {
  interactive?: boolean;
}

export const RoboticArmCAD: React.FC<RoboticArmCADProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angles, setAngles] = useState({
    base: 0,
    shoulder: 58,
    elbow: -42,
    wrist: -16,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for subtle forward kinematics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 650;
    const deltaX = (x - 400) / 400;
    const deltaY = (y - 300) / 300;

    setAngles({
      base: deltaX * 12,
      shoulder: 58 - deltaY * 14,
      elbow: -42 + deltaY * 18 + deltaX * 8,
      wrist: -16 - deltaY * 10,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return to resting CAD equilibrium pose
    setAngles({
      base: 0,
      shoulder: 58,
      elbow: -42,
      wrist: -16,
    });
  };

  // Autonomous breathing / subtle micro-motion when not interacting
  useEffect(() => {
    if (isHovered) return;
    let frameId: number;
    let t = 0;
    const loop = () => {
      t += 0.02;
      setAngles(prev => ({
        ...prev,
        shoulder: 58 + Math.sin(t) * 3,
        elbow: -42 + Math.cos(t * 0.8) * 4,
        wrist: -16 + Math.sin(t * 1.2) * 2,
      }));
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  // Kinematic calculations for links
  const baseOrigin = { x: 260, y: 520 };
  const l1Length = 190;
  const l2Length = 160;
  const l3Length = 80;

  const rad = (deg: number) => (deg * Math.PI) / 180;

  // Shoulder Joint J1
  const j1 = { x: baseOrigin.x, y: baseOrigin.y - 60 };

  // Elbow Joint J2
  const shoulderRad = rad(-angles.shoulder);
  const j2 = {
    x: j1.x + l1Length * Math.cos(shoulderRad),
    y: j1.y + l1Length * Math.sin(shoulderRad),
  };

  // Wrist Joint J3
  const elbowRad = shoulderRad + rad(angles.elbow);
  const j3 = {
    x: j2.x + l2Length * Math.cos(elbowRad),
    y: j2.y + l2Length * Math.sin(elbowRad),
  };

  // Gripper Tool Center Point (TCP)
  const wristRad = elbowRad + rad(angles.wrist);
  const tcp = {
    x: j3.x + l3Length * Math.cos(wristRad),
    y: j3.y + l3Length * Math.sin(wristRad),
  };

  // End-effector jaw tips
  const jawSpread = 16;
  const jawAngle = wristRad + Math.PI / 2;
  const jawLeft = {
    x: tcp.x + Math.cos(wristRad) * 25 + Math.cos(jawAngle) * jawSpread,
    y: tcp.y + Math.sin(wristRad) * 25 + Math.sin(jawAngle) * jawSpread,
  };
  const jawRight = {
    x: tcp.x + Math.cos(wristRad) * 25 - Math.cos(jawAngle) * jawSpread,
    y: tcp.y + Math.sin(wristRad) * 25 - Math.sin(jawAngle) * jawSpread,
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto rounded-2xl bg-cream-surface/70 border border-burgundy/15 p-2 sm:p-4 shadow-cad backdrop-blur-sm select-none overflow-hidden transition-all duration-300"
    >
      {/* Top CAD Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-burgundy/10 text-[10px] font-mono text-taupe uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-dusky animate-pulse"></span>
          <span>ARM-6DOF KINEMATICS SIMULATOR // REV 2.4</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3">
          <span>TOL: ISO 2768-m</span>
          <span>SCALE: 1:2.5</span>
          <span className="text-burgundy font-semibold">STATUS: ACTIVE</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 800 650"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Engineering grid pattern */}
          <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#641F36"
              strokeWidth="0.5"
              strokeOpacity="0.08"
            />
            <circle cx="0" cy="0" r="1" fill="#641F36" fillOpacity="0.15" />
          </pattern>

          {/* Linear gradient for metallic link rendering */}
          <linearGradient id="linkBurgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#641F36" />
            <stop offset="50%" stopColor="#7F2745" />
            <stop offset="100%" stopColor="#451425" />
          </linearGradient>

          <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C28B9A" />
            <stop offset="50%" stopColor="#DFB9BF" />
            <stop offset="100%" stopColor="#826D72" />
          </linearGradient>

          {/* Crosshair marker */}
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#826D72" />
          </marker>
        </defs>

        {/* Blueprint Grid Background */}
        <rect width="800" height="650" fill="url(#cadGrid)" />

        {/* Outer Reference Borders with Dimension Ticks */}
        <rect
          x="30"
          y="30"
          width="740"
          height="590"
          fill="none"
          stroke="#641F36"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="36"
          y="36"
          width="728"
          height="578"
          fill="none"
          stroke="#C28B9A"
          strokeWidth="0.5"
          strokeDasharray="4,4"
          strokeOpacity="0.4"
        />

        {/* Coordinate Center Crosshairs */}
        <g stroke="#C28B9A" strokeWidth="0.75" strokeDasharray="6,4" opacity="0.35">
          <line x1="30" y1={baseOrigin.y} x2="770" y2={baseOrigin.y} />
          <line x1={baseOrigin.x} y1="30" x2={baseOrigin.x} y2="620" />
        </g>

        {/* Base Platform / Foundation */}
        <g>
          {/* Ground hatch lines */}
          <path
            d={`M 140 ${baseOrigin.y + 35} L 380 ${baseOrigin.y + 35}`}
            stroke="#641F36"
            strokeWidth="3"
          />
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={150 + i * 18}
              y1={baseOrigin.y + 36}
              x2={140 + i * 18}
              y2={baseOrigin.y + 48}
              stroke="#826D72"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          ))}

          {/* Cast iron foundation block */}
          <polygon
            points={`180,${baseOrigin.y + 35} 340,${baseOrigin.y + 35} 320,${baseOrigin.y} 200,${baseOrigin.y}`}
            fill="#451425"
            stroke="#641F36"
            strokeWidth="2"
          />
          {/* Base mounting bolts */}
          <circle cx="215" cy={baseOrigin.y + 18} r="4" fill="#F7F0E7" stroke="#451425" strokeWidth="2" />
          <circle cx="305" cy={baseOrigin.y + 18} r="4" fill="#F7F0E7" stroke="#451425" strokeWidth="2" />

          {/* Rotary Turntable Plinth */}
          <rect
            x="220"
            y={baseOrigin.y - 30}
            width="80"
            height="30"
            rx="4"
            fill="url(#linkBurgundyGrad)"
            stroke="#C28B9A"
            strokeWidth="1.5"
          />
          {/* Angular Degree Ticks */}
          {[-30, -15, 0, 15, 30].map((deg, idx) => (
            <line
              key={idx}
              x1={260 + deg}
              y1={baseOrigin.y - 25}
              x2={260 + deg}
              y2={baseOrigin.y - 18}
              stroke="#DFB9BF"
              strokeWidth="1"
            />
          ))}
          {/* Pedestal Riser */}
          <path
            d={`M 235 ${baseOrigin.y - 30} L 245 ${j1.y} L 275 ${j1.y} L 285 ${baseOrigin.y - 30} Z`}
            fill="#330D1B"
            stroke="#641F36"
            strokeWidth="1.5"
          />
        </g>

        {/* Joint J1 (Shoulder) Housing */}
        <circle cx={j1.x} cy={j1.y} r="28" fill="#451425" stroke="#C28B9A" strokeWidth="2" />
        <circle cx={j1.x} cy={j1.y} r="20" fill="#641F36" stroke="#DFB9BF" strokeWidth="1" strokeDasharray="3,2" />
        <circle cx={j1.x} cy={j1.y} r="8" fill="#F7F0E7" stroke="#330D1B" strokeWidth="2" />

        {/* Shoulder Actuator Cylinder (Piston) */}
        <g opacity="0.9">
          <line
            x1={j1.x + 10}
            y1={j1.y + 10}
            x2={j1.x + (j2.x - j1.x) * 0.45 + 15}
            y2={j1.y + (j2.y - j1.y) * 0.45 + 15}
            stroke="#C28B9A"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <line
            x1={j1.x + (j2.x - j1.x) * 0.45 + 15}
            y1={j1.y + (j2.y - j1.y) * 0.45 + 15}
            x2={j1.x + (j2.x - j1.x) * 0.75}
            y2={j1.y + (j2.y - j1.y) * 0.75}
            stroke="#DFB9BF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* LINK 1 (Shoulder Arm Beam) */}
        <g>
          {/* Outer Link Outline */}
          <line
            x1={j1.x}
            y1={j1.y}
            x2={j2.x}
            y2={j2.y}
            stroke="url(#linkBurgundyGrad)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Internal Structural Pocket Cutouts */}
          <line
            x1={j1.x + (j2.x - j1.x) * 0.25}
            y1={j1.y + (j2.y - j1.y) * 0.25}
            x2={j1.x + (j2.x - j1.x) * 0.75}
            y2={j1.y + (j2.y - j1.y) * 0.75}
            stroke="#F7F0E7"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Centerline Construction Dash */}
          <line
            x1={j1.x}
            y1={j1.y}
            x2={j2.x}
            y2={j2.y}
            stroke="#C28B9A"
            strokeWidth="1"
            strokeDasharray="8,4"
          />
        </g>

        {/* Joint J2 (Elbow) Housing */}
        <circle cx={j2.x} cy={j2.y} r="22" fill="#451425" stroke="#C28B9A" strokeWidth="2" />
        <circle cx={j2.x} cy={j2.y} r="14" fill="#641F36" stroke="#DFB9BF" strokeWidth="1" />
        <circle cx={j2.x} cy={j2.y} r="5" fill="#F7F0E7" stroke="#330D1B" strokeWidth="1.5" />

        {/* LINK 2 (Forearm Beam) */}
        <g>
          <line
            x1={j2.x}
            y1={j2.y}
            x2={j3.x}
            y2={j3.y}
            stroke="url(#linkBurgundyGrad)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <line
            x1={j2.x + (j3.x - j2.x) * 0.3}
            y1={j2.y + (j3.y - j2.y) * 0.3}
            x2={j2.x + (j3.x - j2.x) * 0.7}
            y2={j2.y + (j3.y - j2.y) * 0.7}
            stroke="#F7F0E7"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1={j2.x}
            y1={j2.y}
            x2={j3.x}
            y2={j3.y}
            stroke="#DFB9BF"
            strokeWidth="1"
            strokeDasharray="6,4"
          />
        </g>

        {/* Joint J3 (Wrist Pitch & Roll) */}
        <circle cx={j3.x} cy={j3.y} r="16" fill="#451425" stroke="#C28B9A" strokeWidth="1.5" />
        <circle cx={j3.x} cy={j3.y} r="9" fill="#7F2745" stroke="#DFB9BF" strokeWidth="1" />
        <circle cx={j3.x} cy={j3.y} r="3" fill="#F7F0E7" />

        {/* Wrist Extension to TCP */}
        <line
          x1={j3.x}
          y1={j3.y}
          x2={tcp.x}
          y2={tcp.y}
          stroke="#641F36"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Gripper Tool Center & Jaws */}
        <g>
          {/* Gripper Body Mount */}
          <circle cx={tcp.x} cy={tcp.y} r="8" fill="#451425" stroke="#C28B9A" strokeWidth="1" />

          {/* Left Gripper Finger */}
          <path
            d={`M ${tcp.x} ${tcp.y} L ${jawLeft.x} ${jawLeft.y} L ${jawLeft.x + 10} ${jawLeft.y + 6}`}
            fill="none"
            stroke="#641F36"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Left Tactile Pad */}
          <circle cx={jawLeft.x + 10} cy={jawLeft.y + 6} r="3.5" fill="#C28B9A" />

          {/* Right Gripper Finger */}
          <path
            d={`M ${tcp.x} ${tcp.y} L ${jawRight.x} ${jawRight.y} L ${jawRight.x + 10} ${jawRight.y - 6}`}
            fill="none"
            stroke="#641F36"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Right Tactile Pad */}
          <circle cx={jawRight.x + 10} cy={jawRight.y - 6} r="3.5" fill="#C28B9A" />

          {/* Optical Targeting Crosshair projected from End Effector */}
          <g stroke="#C28B9A" strokeWidth="1" strokeDasharray="2,3" opacity="0.75">
            <line x1={tcp.x} y1={tcp.y} x2={tcp.x + 70} y2={tcp.y + 20} />
            <circle cx={tcp.x + 70} cy={tcp.y + 20} r="12" fill="none" stroke="#641F36" strokeWidth="1" strokeDasharray="3,2" />
            <circle cx={tcp.x + 70} cy={tcp.y + 20} r="2" fill="#641F36" />
          </g>
        </g>

        {/* CAD Dimension & Technical Annotations */}
        <g className="text-[10px] font-mono fill-taupe">
          {/* L1 Dimension Arc */}
          <path
            d={`M ${j1.x - 30} ${j1.y} A 40 40 0 0 1 ${j1.x - 10} ${j1.y - 35}`}
            fill="none"
            stroke="#826D72"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          <text x={j1.x - 65} y={j1.y - 15} fill="#641F36" fontWeight="bold">
            θ₁: {angles.shoulder.toFixed(1)}°
          </text>

          {/* L2 Dimension Callout */}
          <text x={j2.x + 18} y={j2.y - 12} fill="#641F36" fontWeight="bold">
            θ₂: {angles.elbow.toFixed(1)}°
          </text>

          {/* TCP Coordinate Indicator */}
          <text x={tcp.x + 15} y={tcp.y - 18} fill="#451425" fontWeight="600" className="text-[11px]">
            TCP (X: {tcp.x.toFixed(0)}, Y: {tcp.y.toFixed(0)})
          </text>

          {/* Geometric Dimensioning & Tolerancing (GD&T) Box */}
          <g transform="translate(560, 480)">
            <rect x="0" y="0" width="180" height="70" fill="#F7F0E7" stroke="#641F36" strokeWidth="1.2" />
            <line x1="0" y1="24" x2="180" y2="24" stroke="#641F36" strokeWidth="0.8" />
            <text x="10" y="16" fill="#641F36" fontWeight="bold" fontSize="10">
              FEATURE CONTROL FRAME
            </text>
            <rect x="10" y="32" width="24" height="24" fill="#451425" />
            <text x="17" y="48" fill="#F7F0E7" fontWeight="bold">⌖</text>
            <text x="42" y="48" fill="#451425" fontSize="11" fontWeight="bold">
              Ø 0.05 | A | B | C
            </text>
          </g>

          {/* CAD Title Block (Bottom Right) */}
          <g transform="translate(480, 560)">
            <rect x="0" y="0" width="260" height="48" fill="#F7F0E7" stroke="#641F36" strokeWidth="1" />
            <line x1="0" y1="24" x2="260" y2="24" stroke="#641F36" strokeWidth="0.5" />
            <line x1="140" y1="0" x2="140" y2="48" stroke="#641F36" strokeWidth="0.5" />
            <text x="8" y="16" fontSize="9" fill="#826D72">DESIGNER:</text>
            <text x="65" y="16" fontSize="9" fontWeight="bold" fill="#641F36">VASUDEV SARAS K M</text>
            <text x="8" y="38" fontSize="9" fill="#826D72">SYSTEM:</text>
            <text x="65" y="38" fontSize="9" fontWeight="bold" fill="#641F36">ARTICULATED 6-DOF</text>
            <text x="148" y="16" fontSize="9" fill="#826D72">INSTITUTION:</text>
            <text x="148" y="38" fontSize="9" fontWeight="bold" fill="#641F36">SAINTGITS COLLEGE</text>
          </g>
        </g>
      </svg>

      {/* Bottom Live Kinematics Telemetry Readout */}
      <div className="mt-2 pt-2 border-t border-burgundy/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-taupe">
        <div className="flex items-center space-x-3">
          <span className="text-burgundy font-medium">REALTIME INVERSE KINEMATICS:</span>
          <span className="bg-cream px-2 py-0.5 rounded border border-burgundy/15 text-wine">
            J1: {angles.shoulder.toFixed(1)}°
          </span>
          <span className="bg-cream px-2 py-0.5 rounded border border-burgundy/15 text-wine">
            J2: {angles.elbow.toFixed(1)}°
          </span>
          <span className="bg-cream px-2 py-0.5 rounded border border-burgundy/15 text-wine">
            J3: {angles.wrist.toFixed(1)}°
          </span>
        </div>
        <div className="text-dusky flex items-center gap-1.5 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          <span>{isHovered ? 'Tracking Cursor' : 'Harmonic Idle Loop'}</span>
        </div>
      </div>
    </div>
  );
};
