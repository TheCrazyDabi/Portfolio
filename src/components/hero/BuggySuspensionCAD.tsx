import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sliders, Activity, Wrench, Shield, CheckCircle2 } from 'lucide-react';

interface BuggySuspensionCADProps {
  interactive?: boolean;
}

export const BuggySuspensionCAD: React.FC<BuggySuspensionCADProps> = ({ interactive = true }) => {
  // Suspension State: travel (-50mm to +50mm) and steering (-30° to +30°)
  const [bumpTravel, setBumpTravel] = useState(0); // in mm
  const [steeringAngle, setSteeringAngle] = useState(0); // in degrees
  const [isPlayingScrutiny, setIsPlayingScrutiny] = useState(true);
  const [showKinematicLines, setShowKinematicLines] = useState(true);

  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Automated dynamic track scrutiny simulation loop
  useEffect(() => {
    if (!isPlayingScrutiny) return;

    const animate = () => {
      timeRef.current += 0.035;
      const t = timeRef.current;

      // Realistic suspension bump over off-road undulations + counter-steering
      const bump = Math.sin(t * 1.4) * 28 + Math.sin(t * 2.8) * 12;
      const steer = Math.sin(t * 0.9) * 18 + Math.cos(t * 0.4) * 6;

      setBumpTravel(bump);
      setSteeringAngle(steer);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlayingScrutiny]);

  // Derived Kinematics calculations (Lotus SHARK model emulation)
  // Scale factor: 1mm travel = 1.2px in SVG coordinate space
  const travelPx = bumpTravel * 1.15;
  const steerRad = (steeringAngle * Math.PI) / 180;

  // Static Chassis Hardpoints (Chassis Subframe)
  const chassisUCA = { x: 175, y: 145 }; // Upper Control Arm Chassis Pivot
  const chassisLCA = { x: 155, y: 315 }; // Lower Control Arm Chassis Pivot
  const chassisShockTower = { x: 260, y: 105 }; // Shock Tower Top Mount
  const chassisRack = { x: 195, y: 235 }; // Steering Rack Housing

  // Dynamic Upright & Wheel Hardpoints (affected by bump travel and steering)
  // Camber gain during bump: -0.045 deg per mm
  const dynamicCamberDeg = -1.2 + bumpTravel * -0.038;
  const camberRad = (dynamicCamberDeg * Math.PI) / 180;

  // Upright Hardpoints
  const uprightCenter = {
    x: 485 + Math.sin(camberRad) * 15,
    y: 235 - travelPx
  };

  const ballJointUpper = {
    x: uprightCenter.x - 25 - dynamicCamberDeg * 1.8,
    y: uprightCenter.y - 75
  };

  const ballJointLower = {
    x: uprightCenter.x - 30 + dynamicCamberDeg * 0.8,
    y: uprightCenter.y + 78
  };

  // Shock lower mount on Lower Control Arm (~60% along arm)
  const shockLower = {
    x: chassisLCA.x + (ballJointLower.x - chassisLCA.x) * 0.58,
    y: chassisLCA.y + (ballJointLower.y - chassisLCA.y) * 0.58
  };

  // Steering Tie-Rod and Rack Clevis
  const rackClevis = {
    x: chassisRack.x + steeringAngle * 0.85,
    y: chassisRack.y
  };

  const tieRodKnuckle = {
    x: uprightCenter.x - 42 + steeringAngle * 0.35,
    y: uprightCenter.y - 12
  };

  // Wheel & Tyre Assembly
  const wheelHub = { x: uprightCenter.x + 25, y: uprightCenter.y };

  // Calculate Instantaneous Center (IC) for display
  // Intersection of UCA line and LCA line
  const m_uca = (ballJointUpper.y - chassisUCA.y) / (ballJointUpper.x - chassisUCA.x);
  const m_lca = (ballJointLower.y - chassisLCA.y) / (ballJointLower.x - chassisLCA.x);
  const ic_x = (chassisLCA.y - chassisUCA.y + m_uca * chassisUCA.x - m_lca * chassisLCA.x) / (m_uca - m_lca);
  const ic_y = chassisUCA.y + m_uca * (ic_x - chassisUCA.x);

  // Shock spring compression length
  const shockLength = Math.hypot(shockLower.x - chassisShockTower.x, shockLower.y - chassisShockTower.y);

  // Generate coilover spring zigzag path
  const numCoils = 9;
  const springStartRatio = 0.22;
  const springEndRatio = 0.82;
  const shockDx = shockLower.x - chassisShockTower.x;
  const shockDy = shockLower.y - chassisShockTower.y;
  const shockAngle = Math.atan2(shockDy, shockDx);
  const shockPerp = shockAngle + Math.PI / 2;

  let springPathD = '';
  const springStart = {
    x: chassisShockTower.x + shockDx * springStartRatio,
    y: chassisShockTower.y + shockDy * springStartRatio
  };
  springPathD += `M ${springStart.x} ${springStart.y}`;

  const coilLength = (shockLength * (springEndRatio - springStartRatio)) / numCoils;
  for (let i = 0; i < numCoils; i++) {
    const fraction = springStartRatio + (i / numCoils) * (springEndRatio - springStartRatio);
    const midFraction = fraction + coilLength / (2 * shockLength);
    const side = i % 2 === 0 ? 1 : -1;
    const peakX = chassisShockTower.x + shockDx * midFraction + Math.cos(shockPerp) * (14 * side);
    const peakY = chassisShockTower.y + shockDy * midFraction + Math.sin(shockPerp) * (14 * side);
    const endX = chassisShockTower.x + shockDx * (fraction + coilLength / shockLength);
    const endY = chassisShockTower.y + shockDy * (fraction + coilLength / shockLength);
    springPathD += ` Q ${peakX} ${peakY} ${endX} ${endY}`;
  }

  // Calculated Real-time Telemetry Metrics
  const calculatedBumpSteer = (0.24 + Math.abs(bumpTravel) * 0.003).toFixed(2);
  const calculatedAckermann = (88.4 - Math.abs(steeringAngle) * 0.08).toFixed(1);
  const calculatedRollCentre = (48.2 + bumpTravel * 0.32).toFixed(1);
  const calculatedSpringLoad = Math.round(1850 + bumpTravel * 24);

  return (
    <div
      className="buggy-cad-container w-full rounded-2xl bg-cream-surface/95 dark:bg-[#200A13]/95 border-2 border-burgundy/25 dark:border-white/20 shadow-cad overflow-hidden text-wine dark:text-cream flex flex-col select-none"
      aria-label="Automotive Buggy Suspension & Steering Kinematic Simulation"
    >
      {/* Title Block Header */}
      <div className="px-4 py-3 bg-cream dark:bg-[#1A0610] border-b border-burgundy/15 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold tracking-wider text-burgundy dark:text-blush">
              EQUINOX_SAE // SUSPENSION &amp; STEERING CAD
            </span>
            <span className="font-mono text-[9px] text-taupe dark:text-dusky uppercase">
              Lotus SHARK · SolidWorks Ackermann Synthesis · MSC Adams Car
            </span>
          </div>
        </div>

        {/* Scrutiny Run Toggle */}
        <div className="flex items-center space-x-1.5 text-xs font-mono">
          <button
            onClick={() => setIsPlayingScrutiny(!isPlayingScrutiny)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              isPlayingScrutiny
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-cream hover:bg-cream-darker text-wine border border-burgundy/20'
            }`}
            title={isPlayingScrutiny ? 'Pause track scrutiny' : 'Play dynamic simulation'}
          >
            {isPlayingScrutiny ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Simulating Track</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-600" />
                <span>Run Scrutiny</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setBumpTravel(0);
              setSteeringAngle(0);
              setIsPlayingScrutiny(false);
            }}
            className="p-1 rounded-lg text-taupe hover:text-wine hover:bg-cream-darker/60 transition-colors"
            title="Reset to resting equilibrium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main SVG Simulation Canvas */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-cream to-[#F2E8DC] dark:from-[#240A15] dark:to-[#17050E] overflow-hidden border-b border-burgundy/15 dark:border-white/10">
        {/* Subtle CAD Grid Backdrop */}
        <div className="absolute inset-0 cad-grid-bg opacity-30 pointer-events-none" />

        <svg
          viewBox="0 0 680 440"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Tyre Rubber Linear Gradient */}
            <linearGradient id="tyreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E2328" />
              <stop offset="50%" stopColor="#1B1317" />
              <stop offset="100%" stopColor="#0F0A0D" />
            </linearGradient>

            {/* Aluminum Alloy Control Arm Gradient */}
            <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C2C4E" />
              <stop offset="50%" stopColor="#C28B9A" />
              <stop offset="100%" stopColor="#641F36" />
            </linearGradient>

            {/* Coilover Damper Cylinder Gradient */}
            <linearGradient id="shockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A1525" />
              <stop offset="100%" stopColor="#7F2745" />
            </linearGradient>

            {/* Spherical Rod End Marker */}
            <marker
              id="rodEnd"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
            >
              <circle cx="5" cy="5" r="4" fill="#C28B9A" stroke="#641F36" strokeWidth="1.5" />
            </marker>
          </defs>

          {/* Ground Plane Datum Line */}
          <line
            x1="80"
            y1="390"
            x2="660"
            y2="390"
            stroke="#826D72"
            strokeWidth="1.5"
            strokeDasharray="8 5"
            opacity="0.4"
          />
          <text x="90" y="405" fill="#826D72" fontSize="9" fontFamily="monospace" opacity="0.7">
            GROUND_DATUM // Z = 0.00 mm
          </text>

          {/* Kinematic Instantaneous Centre (IC) Projection Lines */}
          {showKinematicLines && (
            <g opacity="0.35">
              <line
                x1={chassisUCA.x}
                y1={chassisUCA.y}
                x2={ic_x}
                y2={ic_y}
                stroke="#641F36"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={chassisLCA.x}
                y1={chassisLCA.y}
                x2={ic_x}
                y2={ic_y}
                stroke="#641F36"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle cx={ic_x} cy={ic_y} r="4" fill="none" stroke="#641F36" strokeWidth="1.5" />
              <text x={ic_x + 8} y={ic_y + 4} fill="#641F36" fontSize="9" fontFamily="monospace">
                IC (Kinematic)
              </text>
            </g>
          )}

          {/* Vehicle Chassis Structural Subframe Mounting Bulkhead */}
          <g>
            <path
              d={`M 140 80 L 190 80 L 180 360 L 130 360 Z`}
              fill="#EAD1D5"
              className="dark:fill-[#341221]"
              stroke="#641F36"
              strokeWidth="2"
              opacity="0.85"
            />
            {/* Chassis Mounting Hardpoint Bosses */}
            <circle cx={chassisUCA.x} cy={chassisUCA.y} r="8" fill="#641F36" />
            <circle cx={chassisUCA.x} cy={chassisUCA.y} r="3.5" fill="#FAF6F0" />
            <text x={chassisUCA.x - 65} y={chassisUCA.y - 8} fill="#826D72" fontSize="8" fontFamily="monospace">
              HP_UCA_CHASSIS
            </text>

            <circle cx={chassisLCA.x} cy={chassisLCA.y} r="8" fill="#641F36" />
            <circle cx={chassisLCA.x} cy={chassisLCA.y} r="3.5" fill="#FAF6F0" />
            <text x={chassisLCA.x - 65} y={chassisLCA.y + 16} fill="#826D72" fontSize="8" fontFamily="monospace">
              HP_LCA_CHASSIS
            </text>

            {/* Shock Tower Bracket */}
            <path
              d={`M ${chassisShockTower.x - 18} ${chassisShockTower.y + 20} L ${chassisShockTower.x} ${chassisShockTower.y - 12} L ${chassisShockTower.x + 18} ${chassisShockTower.y + 20} Z`}
              fill="#641F36"
              opacity="0.9"
            />
            <circle cx={chassisShockTower.x} cy={chassisShockTower.y} r="6" fill="#C28B9A" stroke="#451425" strokeWidth="1.5" />
          </g>

          {/* Lower Control Arm (Double Wishbone A-Arm) */}
          <g>
            <polygon
              points={`
                ${chassisLCA.x},${chassisLCA.y - 8}
                ${ballJointLower.x},${ballJointLower.y - 7}
                ${ballJointLower.x},${ballJointLower.y + 7}
                ${chassisLCA.x},${chassisLCA.y + 8}
              `}
              fill="url(#armGrad)"
              stroke="#451425"
              strokeWidth="1.5"
            />
            {/* Lightening holes & gusset truss */}
            <circle
              cx={chassisLCA.x + (ballJointLower.x - chassisLCA.x) * 0.3}
              cy={chassisLCA.y + (ballJointLower.y - chassisLCA.y) * 0.3}
              r="4.5"
              fill="#FAF6F0"
              className="dark:fill-[#200A13]"
            />
            <circle
              cx={chassisLCA.x + (ballJointLower.x - chassisLCA.x) * 0.78}
              cy={chassisLCA.y + (ballJointLower.y - chassisLCA.y) * 0.78}
              r="5"
              fill="#FAF6F0"
              className="dark:fill-[#200A13]"
            />
          </g>

          {/* Upper Control Arm (Double Wishbone A-Arm) */}
          <g>
            <polygon
              points={`
                ${chassisUCA.x},${chassisUCA.y - 6}
                ${ballJointUpper.x},${ballJointUpper.y - 6}
                ${ballJointUpper.x},${ballJointUpper.y + 6}
                ${chassisUCA.x},${chassisUCA.y + 6}
              `}
              fill="url(#armGrad)"
              stroke="#451425"
              strokeWidth="1.5"
            />
            <circle
              cx={chassisUCA.x + (ballJointUpper.x - chassisUCA.x) * 0.45}
              cy={chassisUCA.y + (ballJointUpper.y - chassisUCA.y) * 0.45}
              r="4"
              fill="#FAF6F0"
              className="dark:fill-[#200A13]"
            />
          </g>

          {/* Coilover Shock Absorber & Helical Spring Assembly */}
          <g>
            {/* Damper Piston Body & Reservoir */}
            <line
              x1={chassisShockTower.x}
              y1={chassisShockTower.y}
              x2={shockLower.x}
              y2={shockLower.y}
              stroke="#451425"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Chrome Piston Rod */}
            <line
              x1={chassisShockTower.x}
              y1={chassisShockTower.y}
              x2={shockLower.x}
              y2={shockLower.y}
              stroke="#E0D2D7"
              strokeWidth="5"
            />
            {/* Burgundy Tuned Coil Spring */}
            <path
              d={springPathD}
              fill="none"
              stroke="#A83256"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-sm"
            />
            {/* Lower Shock Eyelet Clevis */}
            <circle cx={shockLower.x} cy={shockLower.y} r="6.5" fill="#C28B9A" stroke="#451425" strokeWidth="1.5" />
          </g>

          {/* Steering Rack & Tie-Rod Linkage */}
          <g>
            {/* Steering Rack Housing */}
            <rect
              x={chassisRack.x - 30}
              y={chassisRack.y - 7}
              width="60"
              height="14"
              rx="4"
              fill="#451425"
            />
            <text x={chassisRack.x - 28} y={chassisRack.y + 3} fill="#FAF6F0" fontSize="7" fontFamily="monospace">
              RACK
            </text>

            {/* Tie-Rod Clevis & Arm */}
            <line
              x1={rackClevis.x}
              y1={rackClevis.y}
              x2={tieRodKnuckle.x}
              y2={tieRodKnuckle.y}
              stroke="#D97706"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={rackClevis.x} cy={rackClevis.y} r="4" fill="#F59E0B" />
            <circle cx={tieRodKnuckle.x} cy={tieRodKnuckle.y} r="4.5" fill="#F59E0B" stroke="#451425" strokeWidth="1.2" />
          </g>

          {/* Steering Knuckle / Upright Assembly */}
          <g>
            <path
              d={`
                M ${ballJointUpper.x} ${ballJointUpper.y}
                L ${tieRodKnuckle.x} ${tieRodKnuckle.y}
                L ${wheelHub.x - 12} ${wheelHub.y - 20}
                L ${wheelHub.x - 12} ${wheelHub.y + 20}
                L ${ballJointLower.x} ${ballJointLower.y}
                Z
              `}
              fill="#722F37"
              stroke="#300A19"
              strokeWidth="2"
            />
            {/* Ball Joint Pivot Pins */}
            <circle cx={ballJointUpper.x} cy={ballJointUpper.y} r="6" fill="#C28B9A" stroke="#451425" strokeWidth="1.5" />
            <circle cx={ballJointLower.x} cy={ballJointLower.y} r="6" fill="#C28B9A" stroke="#451425" strokeWidth="1.5" />
          </g>

          {/* High-Performance Brake Rotor & Caliper */}
          <g>
            {/* Slotted Ventilated Brake Rotor */}
            <ellipse
              cx={wheelHub.x}
              cy={wheelHub.y}
              rx="18"
              ry="45"
              fill="#D6C6CC"
              stroke="#826D72"
              strokeWidth="1.5"
            />
            {/* Red Racing Caliper */}
            <rect
              x={wheelHub.x - 10}
              y={wheelHub.y - 36}
              width="14"
              height="26"
              rx="4"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1"
            />
          </g>

          {/* All-Terrain Buggy Knobby Tyre & Beadlock Rim Assembly */}
          <g transform={`rotate(${steeringAngle * 0.45}, ${wheelHub.x}, ${wheelHub.y})`}>
            {/* Outer Tyre Contour (Front Profile) */}
            <rect
              x={wheelHub.x - 2}
              y={wheelHub.y - 120}
              width="60"
              height="240"
              rx="28"
              fill="url(#tyreGrad)"
              stroke="#000000"
              strokeWidth="2.5"
              className="filter drop-shadow-md"
            />

            {/* Aggressive Off-Road Tyre Tread Lugs */}
            {[-95, -65, -35, -5, 25, 55, 85].map((yOffset, i) => (
              <g key={i}>
                <rect
                  x={wheelHub.x + 48}
                  y={wheelHub.y + yOffset}
                  width="12"
                  height="16"
                  rx="3"
                  fill="#140C10"
                />
                <rect
                  x={wheelHub.x - 10}
                  y={wheelHub.y + yOffset + 8}
                  width="10"
                  height="14"
                  rx="2"
                  fill="#140C10"
                />
              </g>
            ))}

            {/* Beadlock Lightweight Competition Rim Wheel Hub */}
            <rect
              x={wheelHub.x + 8}
              y={wheelHub.y - 65}
              width="36"
              height="130"
              rx="12"
              fill="#4A1525"
              stroke="#C28B9A"
              strokeWidth="2"
            />
            <circle cx={wheelHub.x + 26} cy={wheelHub.y} r="16" fill="#1E0711" stroke="#DFB9BF" strokeWidth="1.5" />
            <circle cx={wheelHub.x + 26} cy={wheelHub.y} r="6" fill="#C28B9A" />
          </g>

          {/* Kinematic Telemetry Dimension Callout Line */}
          <g>
            <line
              x1={ballJointUpper.x}
              y1={ballJointUpper.y - 12}
              x2={ballJointUpper.x}
              y2={ballJointUpper.y - 32}
              stroke="#826D72"
              strokeWidth="1"
            />
            <line
              x1={wheelHub.x}
              y1={wheelHub.y - 125}
              x2={wheelHub.x}
              y2={ballJointUpper.y - 32}
              stroke="#826D72"
              strokeWidth="1"
            />
            <line
              x1={ballJointUpper.x}
              y1={ballJointUpper.y - 25}
              x2={wheelHub.x}
              y2={ballJointUpper.y - 25}
              stroke="#826D72"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={(ballJointUpper.x + wheelHub.x) / 2}
              y={ballJointUpper.y - 30}
              fill="#641F36"
              fontSize="8.5"
              fontFamily="monospace"
              textAnchor="middle"
              className="font-bold dark:fill-blush"
            >
              SCRUB RADIUS: 18.5 mm
            </text>
          </g>
        </svg>

        {/* Real-time Dynamic Telemetry Badges (Floating on Canvas) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 text-right font-mono text-[10px]">
          <div className="px-2.5 py-1 rounded-lg bg-wine/85 backdrop-blur-md border border-white/15 text-cream flex items-center justify-between gap-3 shadow-sm">
            <span className="text-dusky uppercase">Roll-Centre Height:</span>
            <span className="font-bold text-blush">+{calculatedRollCentre} mm</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-wine/85 backdrop-blur-md border border-white/15 text-cream flex items-center justify-between gap-3 shadow-sm">
            <span className="text-dusky uppercase">Bump Steer (100mm):</span>
            <span className="font-bold text-emerald-400">&lt; {calculatedBumpSteer}°</span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-wine/85 backdrop-blur-md border border-white/15 text-cream flex items-center justify-between gap-3 shadow-sm">
            <span className="text-dusky uppercase">Ackermann Principle:</span>
            <span className="font-bold text-amber-300">{calculatedAckermann}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Telemetry Dashboard Footer */}
      <div className="p-3.5 bg-cream dark:bg-[#1A0610] space-y-3 font-mono text-xs">
        {/* Interactive Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Wheel Bump / Articulation Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-taupe dark:text-dusky flex items-center gap-1">
                <Activity className="w-3 h-3 text-burgundy" />
                <span>Vertical Bump / Jounce:</span>
              </span>
              <span className="font-bold text-wine dark:text-cream">
                {bumpTravel > 0 ? `+${bumpTravel.toFixed(0)}` : bumpTravel.toFixed(0)} mm
              </span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              step="1"
              value={bumpTravel}
              onChange={(e) => {
                setIsPlayingScrutiny(false);
                setBumpTravel(parseFloat(e.target.value));
              }}
              className="w-full accent-burgundy cursor-pointer h-1.5 bg-burgundy/20 rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-taupe">
              <span>-45mm Rebound</span>
              <span>0 (Ride Height)</span>
              <span>+45mm Jounce</span>
            </div>
          </div>

          {/* Steering Rack Angle Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-taupe dark:text-dusky flex items-center gap-1">
                <Sliders className="w-3 h-3 text-amber-600" />
                <span>Steering Rack Deflection:</span>
              </span>
              <span className="font-bold text-wine dark:text-cream">
                {steeringAngle > 0 ? `+${steeringAngle.toFixed(0)}° (R)` : steeringAngle < 0 ? `${steeringAngle.toFixed(0)}° (L)` : '0.0°'}
              </span>
            </div>
            <input
              type="range"
              min="-28"
              max="28"
              step="1"
              value={steeringAngle}
              onChange={(e) => {
                setIsPlayingScrutiny(false);
                setSteeringAngle(parseFloat(e.target.value));
              }}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-burgundy/20 rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-taupe">
              <span>-28° Full Left</span>
              <span>Center Line</span>
              <span>+28° Full Right</span>
            </div>
          </div>
        </div>

        {/* Verification Footer Stamp */}
        <div className="pt-2 border-t border-burgundy/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-taupe">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fabricated &amp; Tested: Team Equinox aBAJA SAE 2026 Scrutiny</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={showKinematicLines}
                onChange={(e) => setShowKinematicLines(e.target.checked)}
                className="rounded accent-burgundy"
              />
              <span>Kinematic Lines (IC)</span>
            </label>
            <span className="text-burgundy dark:text-blush font-bold">Camber: {dynamicCamberDeg.toFixed(2)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
