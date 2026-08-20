import React, { useState } from 'react';
import { 
  Network, 
  ShieldAlert, 
  Cpu, 
  Printer, 
  Wrench, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Settings, 
  HelpCircle,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceCategory: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('redes');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return Network;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Printer': return Printer;
      case 'Wrench': return Wrench;
      case 'ShoppingBag': return ShoppingBag;
      default: return Sparkles;
    }
  };

  const currentService = SERVICES_LIST.find(s => s.category === activeCategory) || SERVICES_LIST[0];
  const CurrentIcon = getServiceIcon(currentService.iconName);

  return (
    <section id="servicios" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-3">
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span>Servicios Especializados y Llave en Mano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nuestras Soluciones Tecnológicas
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Ingeniería de vanguardia, laboratorio propio de microelectrónica y atención técnica personalizada con estándares de calidad internacional.
          </p>
        </div>

        {/* Services Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SERVICES_LIST.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            const isActive = activeCategory === service.category;
            return (
              <button
                key={service.id}
                id={`service-tab-btn-${service.id}`}
                onClick={() => setActiveCategory(service.category)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-102 ring-2 ring-cyan-400/50'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{service.title.split(' ')[0]} {service.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Descriptions & Key Features */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  {currentService.badge && (
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      {currentService.badge}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                    {currentService.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {currentService.fullDesc}
              </p>

              {/* Bullet Features Grid */}
              <h4 className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Prestaciones y Capacidades Incluidas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {currentService.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Target Audience / Ideal for */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 mb-6 flex items-start gap-2.5 text-xs text-slate-300">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Ideal para:</strong> {currentService.idealFor}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id={`quote-service-btn-${currentService.id}`}
                  onClick={() => onSelectServiceForQuote(currentService.category)}
                  className="px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-102"
                >
                  <span>Cotizar este Servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#contacto"
                  className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <span>Solicitar Visita Técnica</span>
                </a>
              </div>
            </div>

            {/* Right Column: Specs Card & Guarantees */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3">
                  Ficha Técnica y Parámetros Operativos
                </h4>
                <div className="divide-y divide-slate-800 text-xs">
                  {currentService.specs.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center gap-2">
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="text-slate-100 font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="bg-slate-900/90 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compromiso de Calidad M&C</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Todos nuestros servicios cuentan con informe técnico por escrito, garantía post-servicio y soporte telefónico directo con ingenieros certificados.
                </p>
              </div>

              {/* Price reference pill */}
              {currentService.startingPrice && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Referencia de inversión:</span>
                  <span className="text-cyan-300 font-black text-sm">
                    {currentService.startingPrice}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick 6-Services Cards Grid for Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_LIST.map((srv) => {
            const Icon = getServiceIcon(srv.iconName);
            const isCurrent = activeCategory === srv.category;
            return (
              <div
                key={srv.id}
                onClick={() => setActiveCategory(srv.category)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    {srv.badge && (
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        {srv.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{srv.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Ver Especificaciones</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
