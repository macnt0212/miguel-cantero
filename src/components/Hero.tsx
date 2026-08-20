import React from 'react';
import { 
  Network, 
  ShieldAlert, 
  Cpu, 
  Printer, 
  Wrench, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Zap, 
  Briefcase, 
  Server,
  Activity
} from 'lucide-react';
import { COMPANY_INFO, COMPANY_STATS, COMPANY_LOGO_URL } from '../data/mockData';
import { Camera } from 'lucide-react';
import { RotatingCubeLogo } from './RotatingCubeLogo';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenRepairLookup: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenRepairLookup }) => {
  const quickPillServices = [
    { id: 'redes', label: 'Redes y Fibra Óptica', icon: Network, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
    { id: 'camaras', label: 'Cámaras CCTV & IA', icon: ShieldAlert, color: 'text-blue-400 border-blue-500/30 bg-blue-950/40' },
    { id: 'automatizacion', label: 'Automatización & IoT', icon: Cpu, color: 'text-amber-400 border-amber-500/30 bg-amber-950/40' },
    { id: 'impresoras', label: 'Impresoras & Leasing', icon: Printer, color: 'text-pink-400 border-pink-500/30 bg-pink-950/40' },
    { id: 'reparacion', label: 'Reparación PC & Laptops', icon: Wrench, color: 'text-purple-400 border-purple-500/30 bg-purple-950/40' },
    { id: 'ventas', label: 'Ventas de Hardware', icon: ShoppingBag, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
  ];

  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-950 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-800">
      {/* High-Tech Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_40%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill & Brand Emblem */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-slate-900 via-cyan-950/80 to-slate-900 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm">
            <RotatingCubeLogo size="xs" speed="normal" />
            <span className="text-xs font-black text-white tracking-wide">M&C INFORMÁTICA</span>
            <span className="text-cyan-400">•</span>
            <span className="text-xs font-bold text-cyan-300">Infraestructura, Redes & Laboratorio</span>
          </div>
        </div>

        {/* Main Headline & Description */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Potenciamos tu empresa con{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Tecnología, Seguridad & Conectividad
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Especialistas en <strong>redes de fibra óptica</strong>, <strong>sistemas de videovigilancia IP</strong>, 
            <strong> automatización domótica</strong>, <strong>leasing de impresión</strong>, 
            <strong> laboratorio de microelectrónica de PC</strong> y <strong>venta mayorista/minorista de hardware e insumos</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-cta-quote"
              onClick={() => onNavigate('cotizador')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-103 active:scale-98"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
              <span>Calcular Presupuesto Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-samples"
              onClick={() => onNavigate('muestras')}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-md flex items-center gap-2 transition-all hover:scale-102"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Ver Fotos de Muestras</span>
            </button>

            <button
              id="hero-cta-repair-lookup"
              onClick={() => onNavigate('reparaciones')}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 shadow-md flex items-center gap-2 transition-all"
            >
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Consultar Ticket de Taller</span>
            </button>

            <button
              id="hero-cta-jobs"
              onClick={() => onNavigate('empleos')}
              className="px-4 py-3.5 rounded-xl font-medium text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-1.5 transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Búsquedas Laborales ({5})</span>
            </button>
          </div>

          {/* Quick Service Categories Bar */}
          <div className="mt-10 pt-8 border-t border-slate-800/80">
            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">
              Nuestras 6 Divisiones Tecnológicas Especializadas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {quickPillServices.map((pill) => {
                const Icon = pill.icon;
                return (
                  <button
                    key={pill.id}
                    id={`hero-pill-${pill.id}`}
                    onClick={() => onNavigate('servicios')}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all hover:scale-103 hover:shadow-md ${pill.color} text-left`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Key Stats Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPANY_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all hover:-translate-y-1 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{stat.subtext}</p>
              {stat.change && (
                <div className="mt-2 text-[11px] font-medium text-cyan-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
