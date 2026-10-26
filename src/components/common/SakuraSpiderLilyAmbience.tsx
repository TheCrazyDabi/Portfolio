import React, { useEffect, useRef, useState } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  type: 'sakura' | 'spiderlily' | 'sparkle';
  color: string;
  opacity: number;
}

export const SakuraSpiderLilyAmbience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Keep the ambient particles sparse, especially on smaller screens.
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 14 : 32;

    const sakuraColors = ['#F3DCE2', '#DFB9BF', '#E8C5CC', '#F7E7EB'];
    const lilyColors = ['#8A2244', '#641F36', '#A13355', '#C28B9A'];

    const createPetal = (initialY?: number): Petal => {
      const isSakura = Math.random() > 0.42;
      const isSparkle = Math.random() < 0.15;

      const type: 'sakura' | 'spiderlily' | 'sparkle' = isSparkle
        ? 'sparkle'
        : isSakura
        ? 'sakura'
        : 'spiderlily';

      const color =
        type === 'sakura'
          ? sakuraColors[Math.floor(Math.random() * sakuraColors.length)]
          : type === 'spiderlily'
          ? lilyColors[Math.floor(Math.random() * lilyColors.length)]
          : '#F7E4BC';

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height - 20,
        size: type === 'sparkle' ? 2 + Math.random() * 2 : 7 + Math.random() * 9,
        speedY: 0.35 + Math.random() * 0.65,
        speedX: -0.25 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.014,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.01 + Math.random() * 0.015,
        type,
        color,
        opacity: 0.35 + Math.random() * 0.45,
      };
    };

    const petals: Petal[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createPetal(Math.random() * height)
    );

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const active = e.pointerType !== 'touch' || e.buttons > 0;
      mouseRef.current = { x: e.clientX, y: e.clientY, active };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Draw functions
    const drawSakuraPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      ctx.restore();
    };

    const drawSpiderLilyPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip) * 0.7, 1.3);

      // Elongated curved recurved petal
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 1.2);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.3, p.size * 0.6, p.size * 0.8, 0, p.size * 1.3);
      ctx.bezierCurveTo(-p.size * 0.3, p.size * 0.8, -p.size * 0.4, -p.size * 0.3, 0, -p.size * 1.2);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * 0.9;
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (p: Petal) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * 0.6 * (0.6 + 0.4 * Math.sin(p.flip * 3));
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#DFB9BF';
      ctx.fill();
      ctx.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Natural descent & sway
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.flip) * 0.35;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Interactive mouse breeze dispersion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force * 0.6;
            p.rotation += (dx / dist) * 0.03;
          }
        }

        // Draw petal
        if (p.type === 'sakura') {
          drawSakuraPetal(p);
        } else if (p.type === 'spiderlily') {
          drawSpiderLilyPetal(p);
        } else {
          drawSparkle(p);
        }

        // Recycle petal when off bottom or sides
        if (p.y > height + 25) {
          petals[i] = createPetal(-20);
        }
        if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEnabled]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-80 transition-opacity duration-700"
        />
      )}
    </div>
  );
};
