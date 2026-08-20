import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Award, 
  Zap, 
  Server,
  Network,
  ShieldAlert,
  Wrench,
  ShoppingBag,
  Cpu,
  Printer
} from 'lucide-react';
import { COMPANY_GROWTH_DATA, SERVICE_DISTRIBUTION, SLA_METRICS } from '../data/mockData';

export const CompanyCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distribucion' | 'crecimiento' | 'sla' | 'radar'>('distribucion');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const [selectedGrowthYear, setSelectedGrowthYear] = useState<string>('2025');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return Network;
      case 'ShieldAlert': return ShieldAlert;
      case 'Wrench': return Wrench;
      case 'ShoppingBag': return ShoppingBag;
      case 'Cpu': return Cpu;
      case 'Printer': return Printer;
      default: return Activity;
    }
  };

  const currentYearData = COMPANY_GROWTH_DATA.find(d => d.year === selectedGrowthYear) || COMPANY_GROWTH_DATA[COMPANY_GROWTH_DATA.length - 1];

  return (
    <section id="graficos" className="py-16 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Transparencia y Solidez Operativa</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gráficos y Métricas de M&C Informática
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Datos auditados de proyectos ejecutados, infraestructura desplegada y cumplimiento de niveles de servicio (SLA).
            </p>
          </div>

          {/* Tab Selector */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              id="chart-tab-distribucion"
              onClick={() => setActiveTab('distribucion')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'distribucion'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Distribución de Servicios
            </button>
            <button
              id="chart-tab-crecimiento"
              onClick={() => setActiveTab('crecimiento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'crecimiento'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Crecimiento Histórico
            </button>
            <button
              id="chart-tab-sla"
              onClick={() => setActiveTab('sla')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'sla'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Rendimiento & SLA
            </button>
          </div>
        </div>

        {/* Tab 1: Distribución de Servicios */}
        {activeTab === 'distribucion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual Bar / Percentage Distribution Chart */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    Distribución de Operaciones por Especialidad
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Proporción de obras, contratos y asistencias técnicas activas
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                  Total Anual: 100%
                </span>
              </div>

              {/* Progress Stack Bar Visualizer */}
              <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-900 border border-slate-800 shadow-inner mb-6">
                {SERVICE_DISTRIBUTION.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className="h-full transition-all cursor-pointer hover:opacity-85"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                    title={`${item.name}: ${item.percentage}%`}
                  />
                ))}
              </div>

              {/* Interactive Service Breakdown Grid */}
              <div className="space-y-3">
                {SERVICE_DISTRIBUTION.map((item, idx) => {
                  const Icon = getServiceIcon(item.icon);
                  const isSelected = selectedServiceIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedServiceIndex(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                          : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: `${item.color}33`, borderColor: item.color, borderWidth: 1 }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-2">
                            <span>{item.name}</span>
                            {isSelected && (
                              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-1.5 py-0.5 rounded font-bold">
                                Seleccionado
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">{item.count}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-black text-white">{item.percentage}%</div>
                        <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(item.percentage / 30) * 100}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Service Detailed Insight Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: SERVICE_DISTRIBUTION[selectedServiceIndex].color }}
                >
                  {React.createElement(getServiceIcon(SERVICE_DISTRIBUTION[selectedServiceIndex].icon), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Detalle de Especialidad</span>
                  <h4 className="text-xl font-black text-white">
                    {SERVICE_DISTRIBUTION[selectedServiceIndex].name}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[11px] text-slate-400">Participación en Cartera</span>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {SERVICE_DISTRIBUTION[selectedServiceIndex].percentage}%
                  </p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[11px] text-slate-400">Volumen Registrado</span>
                  <p className="text-lg font-extrabold text-cyan-300 mt-0.5">
                    {SERVICE_DISTRIBUTION[selectedServiceIndex].count}
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-4 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Equipo técnico con certificación oficial de fábrica y herramientas homologadas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Monitoreo continuo y cobertura de garantía con reposición inmediata.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Presupuesto transparente y desglosado con visita técnica diagnóstica.</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">¿Necesitas este servicio?</span>
                <a
                  href="#cotizador"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md"
                >
                  Cotizar Ahora
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Crecimiento Histórico */}
        {activeTab === 'crecimiento' && (
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Evolución Histórica de Infraestructura & Servicios (2021 - 2025)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Crecimiento interanual continuo en obras, laboratorios y clientes corporativos
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {COMPANY_GROWTH_DATA.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedGrowthYear(item.year)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedGrowthYear === item.year
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Bar Comparison Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-cyan-400" />
                  Proyectos de Redes & CCTV
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  {currentYearData.projects.toLocaleString()}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentYearData.projects / 2000) * 100}%` }} 
                  />
                </div>
                <span className="text-[10px] text-cyan-400 mt-1 block">+32% vs período anterior</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-purple-400" />
                  Reparaciones en Laboratorio
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  {currentYearData.repairs.toLocaleString()}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentYearData.repairs / 10000) * 100}%` }} 
                  />
                </div>
                <span className="text-[10px] text-purple-400 mt-1 block">98.2% con diagnóstico resuelto</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Clientes Corporativos Activos
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  {currentYearData.clients.toLocaleString()}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentYearData.clients / 4000) * 100}%` }} 
                  />
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block">Tasa de retención 96.4%</span>
              </div>
            </div>

            {/* Year-by-year summary table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Año Fiscal</th>
                    <th className="py-2.5 px-3">Obras Ejecutadas</th>
                    <th className="py-2.5 px-3">Reparaciones de Microelectrónica</th>
                    <th className="py-2.5 px-3">Clientes & Pymes</th>
                    <th className="py-2.5 px-3 text-right">Estado Auditado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {COMPANY_GROWTH_DATA.map((row) => (
                    <tr 
                      key={row.year}
                      className={row.year === selectedGrowthYear ? 'bg-cyan-950/40 text-cyan-300 font-semibold' : 'hover:bg-slate-900/40'}
                    >
                      <td className="py-2.5 px-3 font-bold">{row.year}</td>
                      <td className="py-2.5 px-3">{row.projects} proyectos</td>
                      <td className="py-2.5 px-3">{row.repairs} equipos</td>
                      <td className="py-2.5 px-3">{row.clients} empresas</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Certificado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Rendimiento & SLA */}
        {activeTab === 'sla' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SLA_METRICS.map((sla, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">{sla.label}</span>
                    <div className="text-3xl font-black text-white mt-1">{sla.value}</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    {sla.status}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Objetivo de Calidad (KPI): <strong className="text-slate-200">{sla.target}</strong></span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" /> Cumplido 100%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
