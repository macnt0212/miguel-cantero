import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Building, 
  Award, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { JOB_OPENINGS } from '../data/mockData';
import { JobOpening } from '../types';

interface CareersSectionProps {
  onSelectJobForApplication: (job: JobOpening) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onSelectJobForApplication }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = [
    { id: 'all', label: 'Todas las Vacantes' },
    { id: 'Redes e Infraestructura', label: 'Redes & Infraestructura' },
    { id: 'Seguridad Electrónica', label: 'Seguridad & CCTV' },
    { id: 'Laboratorio Técnico', label: 'Laboratorio & Microelectrónica' },
    { id: 'Automatización & IoT', label: 'Domótica & Automatización' },
    { id: 'Ventas y Comercial', label: 'Ventas & Comercial' },
  ];

  const filteredJobs = JOB_OPENINGS.filter(job => 
    selectedDepartment === 'all' || job.department === selectedDepartment
  );

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Urgente':
        return 'bg-red-950/80 text-red-300 border-red-500/40';
      case 'Nuevo':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="empleos" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trabaja con Nosotros en M&C Informática</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ofertas de Trabajo & Búsquedas Laborales Activas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Sumate a nuestro equipo de técnicos, ingenieros de redes, especialistas en CCTV y ejecutivos de cuentas con excelente remuneración y plan de carrera.
          </p>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {departments.map((dept) => (
            <button
              key={dept.id}
              id={`dept-filter-btn-${dept.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDepartment === dept.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Job Cards List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-xl transition-all hover:shadow-2xl hover:shadow-cyan-950/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {job.department}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getUrgencyBadge(job.urgency)}`}>
                      {job.urgency}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{job.title}</h3>
                  
                  {/* Pills of location, type and salary */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300 font-semibold font-mono">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                <button
                  id={`apply-job-btn-${job.id}`}
                  onClick={() => onSelectJobForApplication(job)}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 shrink-0 transition-all hover:scale-102 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Postularme Ahora</span>
                </button>
              </div>

              {/* Responsibilities & Requirements in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-xs">
                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Responsabilidades Principales:
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Requisitos del Puesto:
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits list */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Beneficios:</span>
                {job.benefits.map((ben, idx) => (
                  <span key={idx} className="bg-slate-950 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 text-[11px]">
                    ✓ {ben}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spontaneous Application Callout */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-cyan-500/30 rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white">¿No encontrás una vacante que se ajuste a tu perfil?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Envíanos tu CV para futuras búsquedas en redes, microelectrónica, programación o ventas corporativas.
            </p>
          </div>
          <button
            onClick={() => onSelectJobForApplication({
              id: 'spontaneous',
              title: 'Candidatura Espontánea / Base de Talentos',
              department: 'Redes e Infraestructura',
              type: 'Tiempo Completo',
              location: 'Sede Central / En terreno',
              experience: 'A coordinar',
              salaryRange: 'A convenir según posición',
              urgency: 'Abierta',
              description: 'Envío abierto de CV para el banco de profesionales de M&C Informática.',
              responsibilities: ['A definir según el perfil seleccionado'],
              requirements: ['Curriculum Vitae actualizado'],
              benefits: ['Capacitación continua', 'Prepaga de primer nivel', 'Excelente clima laboral']
            })}
            className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 whitespace-nowrap transition-colors"
          >
            Enviar CV Espontáneo
          </button>
        </div>
      </div>
    </section>
  );
};
