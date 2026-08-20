import React, { useState } from 'react';
import { Cpu, Network, Shield, Zap, Sparkles } from 'lucide-react';

interface RotatingCubeLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
  speed?: 'normal' | 'slow' | 'fast';
  interactive?: boolean;
}

export const RotatingCubeLogo: React.FC<RotatingCubeLogoProps> = ({
  size = 'md',
  showGlow = true,
  className = '',
  speed = 'normal',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations in pixels
  const sizeMap = {
    xs: { container: 28, cube: 14, translateZ: 7, text: 'text-[7px]', border: 'border-[0.75px]' },
    sm: { container: 40, cube: 20, translateZ: 10, text: 'text-[9px]', border: 'border' },
    md: { container: 48, cube: 24, translateZ: 12, text: 'text-[10px]', border: 'border' },
    lg: { container: 72, cube: 36, translateZ: 18, text: 'text-xs', border: 'border-[1.5px]' },
    xl: { container: 120, cube: 60, translateZ: 30, text: 'text-base', border: 'border-2' },
  };

  const currentSize = sizeMap[size];
  const { container, cube, translateZ, text, border } = currentSize;

  const animationDuration = isHovered 
    ? '6s' 
    : speed === 'fast' 
      ? '8s' 
      : speed === 'slow' 
        ? '18s' 
        : '12s';

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: `${container}px`,
        height: `${container}px`,
        perspective: '600px',
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      title="M&C Informática - Cubo 3D Dinámico"
    >
      {/* Background Soft Glow Aura - Highly luminous */}
      {showGlow && (
        <div
          className={`absolute rounded-full pointer-events-none transition-all duration-700 ${
            isHovered
              ? 'w-full h-full bg-cyan-400/50 blur-md scale-125'
              : 'w-3/4 h-3/4 bg-cyan-400/35 blur-sm scale-110'
          }`}
        />
      )}

      {/* Vertex Pivot Stand / Floor Shadow for Vertex rotation */}
      <div 
        className="absolute -bottom-0.5 w-2/3 h-2 bg-cyan-400/30 rounded-full blur-[2px] pointer-events-none transform scale-y-50"
      />

      {/* 3D Cube Container - Pivoting from Bottom Vertex */}
      <div
        className="relative"
        style={{
          width: `${cube}px`,
          height: `${cube}px`,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 100% 0px', // Vertex-centered bottom anchor
          animation: `spinFromVertex 10s linear infinite`,
          animationDuration: animationDuration,
        }}
      >
        {/* Face 1: Front (M&C Monogram - Brilliant Neon White & Cyan) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-800 to-slate-900 ${border} border-cyan-200 rounded-[2px] shadow-[inset_0_0_10px_rgba(255,255,255,0.7),0_0_10px_rgba(6,182,212,0.8)] backdrop-blur-sm`}
          style={{
            transform: `translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <span className={`font-black tracking-tighter text-white ${text} drop-shadow-[0_0_6px_#06b6d4]`}>
            M&C
          </span>
          <div className="w-2/3 h-[1.5px] bg-gradient-to-r from-amber-400 via-white to-cyan-300 mt-0.5 shadow-[0_0_4px_#38bdf8]" />
        </div>

        {/* Face 2: Back (Cyber Microchip Icon - Luminous Gold & Cyan) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-cyan-800 to-sky-700 ${border} border-amber-300 rounded-[2px] shadow-[inset_0_0_10px_rgba(251,191,36,0.6),0_0_8px_rgba(251,191,36,0.5)] backdrop-blur-sm`}
          style={{
            transform: `rotateY(180deg) translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <Cpu className="text-amber-300 drop-shadow-[0_0_4px_#fbbf24]" style={{ width: `${cube * 0.55}px`, height: `${cube * 0.55}px` }} />
        </div>

        {/* Face 3: Right (Network & Fiber Trace - Bright Emerald & Cyan) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-cyan-900 to-sky-800 ${border} border-emerald-300 rounded-[2px] shadow-[inset_0_0_8px_rgba(52,211,153,0.6),0_0_8px_rgba(52,211,153,0.5)] backdrop-blur-sm`}
          style={{
            transform: `rotateY(90deg) translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <Network className="text-emerald-300 drop-shadow-[0_0_4px_#34d399]" style={{ width: `${cube * 0.52}px`, height: `${cube * 0.52}px` }} />
        </div>

        {/* Face 4: Left (Security & Shield - Bright Cyan & Silver) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-800 via-slate-800 to-sky-900 ${border} border-cyan-200 rounded-[2px] shadow-[inset_0_0_8px_rgba(6,182,212,0.8),0_0_8px_rgba(255,255,255,0.4)] backdrop-blur-sm`}
          style={{
            transform: `rotateY(-90deg) translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <Shield className="text-white drop-shadow-[0_0_4px_#38bdf8]" style={{ width: `${cube * 0.52}px`, height: `${cube * 0.52}px` }} />
        </div>

        {/* Face 5: Top (Tech Circuit Grid with Radiant Amber Bolt) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-600 via-cyan-700 to-slate-900 ${border} border-amber-200 rounded-[2px] shadow-[inset_0_0_10px_rgba(255,255,255,0.8),0_0_10px_rgba(251,191,36,0.8)] backdrop-blur-sm`}
          style={{
            transform: `rotateX(90deg) translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <div className="relative flex items-center justify-center">
            <Zap className="text-amber-200 fill-amber-300 drop-shadow-[0_0_6px_#f59e0b]" style={{ width: `${cube * 0.55}px`, height: `${cube * 0.55}px` }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          </div>
        </div>

        {/* Face 6: Bottom (Anchor Vertex Point) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-slate-900 ${border} border-cyan-300 rounded-[2px] shadow-[inset_0_0_6px_rgba(6,182,212,0.8)] backdrop-blur-sm`}
          style={{
            transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
            backfaceVisibility: 'visible',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8]" />
        </div>
      </div>
    </div>
  );
};
