import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Cpu, 
  ShieldCheck, 
  Printer, 
  FileText, 
  User, 
  Laptop, 
  ArrowRight,
  ExternalLink,
  RotateCw,
  MessageCircle
} from 'lucide-react';
import { MOCK_REPAIR_TICKETS, COMPANY_INFO } from '../data/mockData';
import { RepairTicket } from '../types';

export const RepairTracker: React.FC = () => {
  const [searchCode, setSearchCode] = useState<string>('MC-8421');
  const [activeTicket, setActiveTicket] = useState<RepairTicket | null>(MOCK_REPAIR_TICKETS['MC-8421']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || searchCode).trim().toUpperCase();
    if (!code) {
      setErrorMessage('Por favor ingresa un código de orden o ticket (ej: MC-8421).');
      return;
    }

    setIsSearching(true);
    setErrorMessage('');

    setTimeout(() => {
      if (MOCK_REPAIR_TICKETS[code]) {
        setActiveTicket(MOCK_REPAIR_TICKETS[code]);
        setSearchCode(code);
        setErrorMessage('');
      } else {
        setActiveTicket(null);
        setErrorMessage(`No se encontró ninguna orden con el código "${code}". Verifica el ticket entregado en sucursal.`);
      }
      setIsSearching(false);
    }, 350);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Listo para Retiro':
      case 'Entregado':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
      case 'Control de Calidad':
      case 'En Reparación':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
      case 'Aprobación de Presupuesto':
      case 'En Diagnóstico':
        return 'bg-amber-950 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="reparaciones" className="py-16 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Laboratorio & Servicio Técnico M&C</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Consulta de Estado de Reparación en Tiempo Real
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Ingresa el número de orden de tu equipo (Notebook, PC, Impresora, Servidor) para verificar el diagnóstico técnico y avance de laboratorio.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="max-w-2xl mx-auto bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="repair-ticket-input"
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                placeholder="Ejemplo: MC-8421, MC-9052, MC-7114"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
              />
            </div>
            <button
              id="search-ticket-submit-btn"
              type="submit"
              disabled={isSearching}
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md"
            >
              {isSearching ? <RotateCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Consultar Orden</span>
            </button>
          </form>

          {/* Quick Demo Ticket Chips */}
          <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Tickets de prueba:</span>
            {Object.keys(MOCK_REPAIR_TICKETS).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleSearch(code)}
                className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold transition-all ${
                  searchCode === code
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Ticket Details Visualizer */}
        {activeTicket && (
          <div className="bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-cyan-400">
                      Orden #{activeTicket.ticketCode}
                    </span>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusColor(activeTicket.currentStatus)}`}>
                      {activeTicket.currentStatus}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {activeTicket.deviceType}: {activeTicket.model}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                    `Hola M&C Informática! Quiero consultar sobre mi Orden #${activeTicket.ticketCode} (${activeTicket.deviceType}: ${activeTicket.model}) a nombre de ${activeTicket.clientName}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Consultar por WhatsApp (+54 370 464-6635)</span>
                </a>
                <button
                  id="print-certificate-btn"
                  onClick={() => setShowCertificateModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ver Informe Técnico Digital</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="my-6">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Progreso de Reparación y Pruebas</span>
                <span className="text-cyan-400 font-bold">{activeTicket.progressPercentage}% Completado</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${activeTicket.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Key Specs & Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-xs">
              <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Titular del Equipo</span>
                <strong className="text-slate-100 text-sm">{activeTicket.clientName}</strong>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Fecha de Ingreso</span>
                <strong className="text-slate-100 text-sm">{activeTicket.entryDate}</strong>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Fecha Estimada de Entrega</span>
                <strong className="text-cyan-300 text-sm">{activeTicket.estimatedDeliveryDate}</strong>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Técnico Responsable</span>
                <strong className="text-slate-100 text-sm">{activeTicket.technicianAssigned}</strong>
              </div>
            </div>

            {/* Diagnostic Details and Parts Replaced */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Problema Reportado & Diagnóstico de Laboratorio
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong className="text-slate-100">Falla inicial:</strong> {activeTicket.reportedIssue}</p>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <strong className="text-cyan-300 block mb-1">Informe del Microscopio & Banco de Pruebas:</strong>
                    <p className="text-slate-300 leading-relaxed">{activeTicket.diagnosticNotes}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Componentes Reparados / Sustituidos
                </h4>
                <div className="space-y-2 text-xs">
                  {activeTicket.partsReplaced.map((part, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{part}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
                    <span>Presupuesto total estimado:</span>
                    <span className="text-base font-black text-white">
                      ${activeTicket.costEstimate.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Bitácora de Trazabilidad en Tiempo Real
              </h4>
              <div className="space-y-3">
                {activeTicket.timeline.map((event, idx) => {
                  const isCompleted = event.status === 'completed';
                  const isInProgress = event.status === 'in_progress';

                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCompleted
                          ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                          : isInProgress
                          ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200 ring-1 ring-cyan-500/20'
                          : 'bg-slate-950/40 border-slate-900 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : isInProgress
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{event.title}</span>
                            {isInProgress && (
                              <span className="text-[10px] bg-cyan-900 text-cyan-300 px-1.5 py-0.2 rounded font-semibold">
                                En Proceso
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{event.description}</p>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-slate-400 shrink-0 font-mono">
                        <div>{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Digital Certificate / Receipt Modal */}
        {showCertificateModal && activeTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
              <div className="text-center pb-4 border-b border-slate-800">
                <div className="inline-flex items-center gap-1.5 text-cyan-400 font-extrabold text-lg">
                  <ShieldCheck className="w-5 h-5" />
                  M&C Informática - Certificado de Servicio Técnico
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Documento de trazabilidad de laboratorio y garantía escrita
                </p>
              </div>

              <div className="py-4 space-y-3 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Orden de Trabajo:</span>
                  <span className="font-mono font-bold text-white">{activeTicket.ticketCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Cliente:</span>
                  <span className="font-semibold text-white">{activeTicket.clientName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Equipo:</span>
                  <span className="font-semibold text-white">{activeTicket.deviceType} - {activeTicket.model}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Número de Serie / IMEI:</span>
                  <span className="font-mono text-slate-300">{activeTicket.serialOrImei}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Garantía Otorgada:</span>
                  <span className="font-bold text-emerald-400">90 Días sobre mano de obra y repuestos</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Importe Final:</span>
                  <span className="text-base font-black text-cyan-300">${activeTicket.costEstimate.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
