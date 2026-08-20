import React, { useState } from 'react';
import { 
  Camera, 
  Wrench, 
  PackageCheck, 
  Cpu, 
  Network, 
  Printer, 
  ShieldCheck, 
  ZoomIn, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  MessageCircle,
  Clock
} from 'lucide-react';
import { SAMPLES_GALLERY, COMPANY_INFO } from '../data/mockData';
import { SampleItem } from '../types';

interface SampleShowcaseGalleryProps {
  onSelectQuote?: () => void;
}

export const SampleShowcaseGallery: React.FC<SampleShowcaseGalleryProps> = ({ onSelectQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalSample, setActiveModalSample] = useState<SampleItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas las Muestras', icon: Layers },
    { id: 'reparaciones', label: 'Muestras de Reparación', icon: Wrench },
    { id: 'insumos', label: 'Muestras de Insumos & Repuestos', icon: PackageCheck },
    { id: 'redes_cctv', label: 'Redes, Fibra & CCTV', icon: Network },
    { id: 'impresoras', label: 'Insumos de Impresión', icon: Printer },
  ];

  const filteredSamples = selectedCategory === 'todos'
    ? SAMPLES_GALLERY
    : SAMPLES_GALLERY.filter((s) => s.category === selectedCategory);

  return (
    <section id="muestras" className="py-20 bg-slate-900 border-b border-slate-800 relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.08),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-3 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Galería Técnica de Laboratorio & Insumos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Fotos de Muestras: Reparaciones e Insumos
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Inspecciona nuestros trabajos de microelectrónica en banco de pruebas, instrumental de soldadura 4K, cableados e insumos oficiales garantizados.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-sample-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-102'
                    : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="group bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zoom Badge & Overlay */}
                <div 
                  className="relative h-56 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveModalSample(sample)}
                >
                  <img
                    src={sample.image}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-bold text-cyan-300 shadow-md">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {sample.badge}
                    </span>
                  </div>

                  {/* Zoom Icon Button on hover */}
                  <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-xl bg-slate-900/90 text-white hover:text-cyan-300 border border-slate-700 flex items-center gap-1 text-xs font-semibold backdrop-blur-sm shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ver Detalle</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                      {sample.categoryLabel}
                    </span>
                    {sample.dateOrCode && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {sample.dateOrCode}
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => setActiveModalSample(sample)}
                    className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {sample.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {sample.description}
                  </p>

                  {/* Quick specs / tools bullets */}
                  {sample.toolsUsedOrSpecs && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {sample.toolsUsedOrSpecs.map((tool, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveModalSample(sample)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explorar Ficha Técnica & Procedimiento</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Consulting */}
        <div className="mt-12 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              ¿Tienes un equipo con falla compleja o necesitas insumos específicos?
            </h4>
            <p className="text-xs text-slate-400">
              Nuestro laboratorio de microelectrónica recibe equipos de todo el país con diagnóstico sin cargo previo a la reparación.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20tengo%20un%20equipo%20para%20reparar%20o%20deseo%20consultar%20por%20insumos`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar al Laboratorio por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Sample Technical Inspection */}
      {activeModalSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalSample(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-slate-800 bg-slate-950 max-h-72">
              <img
                src={activeModalSample.image}
                alt={activeModalSample.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-xs font-bold text-cyan-300">
                  {activeModalSample.badge}
                </span>
              </div>
            </div>

            {/* Modal Text Content */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  {activeModalSample.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeModalSample.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {activeModalSample.description}
                </p>
              </div>

              {/* Technical Step Details */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Procedimiento Técnico & Especificaciones Aplicadas:
                </h4>
                <ul className="space-y-1.5">
                  {activeModalSample.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools and Components */}
              {activeModalSample.toolsUsedOrSpecs && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Instrumental & Materiales Utilizados:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalSample.toolsUsedOrSpecs.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-slate-800 text-xs font-mono font-semibold text-cyan-300 border border-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  {activeModalSample.dateOrCode}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveModalSample(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cerrar
                  </button>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20vi%20la%20muestra%20"${encodeURIComponent(activeModalSample.title)}"%20y%20quiero%20hacer%20una%20consulta`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Consultar por este trabajo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
