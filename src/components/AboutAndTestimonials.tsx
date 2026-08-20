import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Star, 
  Users, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Zap,
  Wrench,
  Clock
} from 'lucide-react';
import { TESTIMONIALS, PARTNER_BRANDS } from '../data/mockData';

export const AboutAndTestimonials: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Laboratorio Propio de Microelectrónica',
      desc: 'Equipado con microscopios 4K, estaciones de soldadura JBC, osciloscopios e instrumental de alta precisión para reparaciones a nivel componente.'
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Escrita y Trazabilidad',
      desc: 'Cada reparación u obra cuenta con certificado digital de garantía y seguimiento de etapas en tiempo real en nuestra plataforma.'
    },
    {
      icon: Clock,
      title: 'Respuesta Crítica SLA <15 Minutos',
      desc: 'Guardia técnica permanente para clientes con contratos de mantenimiento corporativo y soporte de infraestructura continua.'
    },
    {
      icon: Award,
      title: 'Certificaciones de Fabricante',
      desc: 'Personal técnico certificado en Cisco, MikroTik, Ubiquiti UniFi, Dahua WizSense y Microsoft Partner Network.'
    },
  ];

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Brands Grid */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider mb-6">
            Alianzas Estratégicas y Partners Oficiales
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {PARTNER_BRANDS.map((brand, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-bold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Experiencias Reales de Clientes</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Lo que opinan las empresas y usuarios de M&C
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">
                    {t.service}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
