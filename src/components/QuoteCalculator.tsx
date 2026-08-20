import React, { useState } from 'react';
import { 
  Zap, 
  Network, 
  ShieldAlert, 
  Cpu, 
  Printer, 
  Wrench, 
  CheckCircle2, 
  Calculator, 
  MessageCircle, 
  Send, 
  Sparkles,
  Info
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { ServiceCategory } from '../types';

interface QuoteCalculatorProps {
  defaultService?: ServiceCategory;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ defaultService = 'redes' }) => {
  // Service Quantities & Options State
  const [networkPoints, setNetworkPoints] = useState<number>(8);
  const [includeFiber, setIncludeFiber] = useState<boolean>(false);
  
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [cameraType, setCameraType] = useState<'ip_4k' | 'hd_colorvu'>('ip_4k');
  const [includeAccessControl, setIncludeAccessControl] = useState<boolean>(false);

  const [automationNodes, setAutomationNodes] = useState<number>(6);
  const [includeUpsAutomation, setIncludeUpsAutomation] = useState<boolean>(false);

  const [pcMaintenanceCount, setPcMaintenanceCount] = useState<number>(3);
  const [includeThermalUpgrade, setIncludeThermalUpgrade] = useState<boolean>(true);

  const [printerLeasingCount, setPrinterLeasingCount] = useState<number>(1);
  const [printerType, setPrinterType] = useState<'laser_mono' | 'laser_color' | 'tinta_continua'>('laser_color');

  // Contact Info for quote dispatch
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Unit prices estimation logic (in ARS) - Customizable manually
  const [isCustomPricingOpen, setIsCustomPricingOpen] = useState<boolean>(false);
  const [pricePerNetPoint, setPricePerNetPoint] = useState<number>(22000);
  const [priceFiberUplink, setPriceFiberUplink] = useState<number>(85000);

  const [priceCam4k, setPriceCam4k] = useState<number>(75000);
  const [priceCamColorvu, setPriceCamColorvu] = useState<number>(48000);
  const [priceNvrStorage, setPriceNvrStorage] = useState<number>(120000);
  const [priceAccessControl, setPriceAccessControl] = useState<number>(145000);

  const [priceAutoNode, setPriceAutoNode] = useState<number>(28000);
  const [priceAutoHub, setPriceAutoHub] = useState<number>(65000);
  const [priceUpsAuto, setPriceUpsAuto] = useState<number>(95000);

  const [pricePcService, setPricePcService] = useState<number>(25000);
  const [priceThermalPaste, setPriceThermalPaste] = useState<number>(12000);

  const [pricePrinterColor, setPricePrinterColor] = useState<number>(68000);
  const [pricePrinterMono, setPricePrinterMono] = useState<number>(38000);
  const [pricePrinterInk, setPricePrinterInk] = useState<number>(28000);

  // Calculation Breakdown
  const totalNet = (networkPoints * pricePerNetPoint) + (includeFiber ? priceFiberUplink : 0);
  const camUnit = cameraType === 'ip_4k' ? priceCam4k : priceCamColorvu;
  const totalCctv = (cameraCount * camUnit) + (cameraCount > 0 ? priceNvrStorage : 0) + (includeAccessControl ? priceAccessControl : 0);
  const totalAuto = (automationNodes > 0 ? priceAutoHub + (automationNodes * priceAutoNode) : 0) + (includeUpsAutomation ? priceUpsAuto : 0);
  const totalPc = (pcMaintenanceCount * pricePcService) + (includeThermalUpgrade ? (pcMaintenanceCount * priceThermalPaste) : 0);
  const printerUnit = printerType === 'laser_color' ? pricePrinterColor : printerType === 'laser_mono' ? pricePrinterMono : pricePrinterInk;
  const totalPrintersMonthly = printerLeasingCount * printerUnit;

  const grandTotalInvestment = totalNet + totalCctv + totalAuto + totalPc;

  const [lastQuoteUrl, setLastQuoteUrl] = useState<string>('');

  const generateWhatsappMessage = () => {
    return `🚨 *NUEVA SOLICITUD DE COTIZACIÓN Y VISITA TÉCNICA*%0A` +
      `👤 *Cliente / Empresa:* ${encodeURIComponent(clientName || 'Cliente Web')}%0A` +
      `📧 *Email:* ${encodeURIComponent(clientEmail || 'No informado')}%0A` +
      `📱 *Teléfono:* ${encodeURIComponent(clientPhone || 'No informado')}%0A%0A` +
      `📊 *DETALLE DEL PRESUPUESTO CALCULADO:*%0A` +
      `• *Redes:* ${networkPoints} puestos + ${includeFiber ? 'Troncal Fibra' : 'Sin Fibra'} -> $${totalNet.toLocaleString('es-AR')}%0A` +
      `• *Cámaras CCTV:* ${cameraCount} cámaras (${cameraType === 'ip_4k' ? 'IP 4K IA' : 'Full-Color'}) -> $${totalCctv.toLocaleString('es-AR')}%0A` +
      `• *Domótica:* ${automationNodes} nodos inteligentes -> $${totalAuto.toLocaleString('es-AR')}%0A` +
      `• *Mantenimiento PC:* ${pcMaintenanceCount} equipos -> $${totalPc.toLocaleString('es-AR')}%0A` +
      (totalPrintersMonthly > 0 ? `• *Leasing Impresión:* ${printerLeasingCount} equipos -> $${totalPrintersMonthly.toLocaleString('es-AR')}/mes%0A` : '') +
      `💰 *TOTAL INVERSIÓN ESTIMADA:* $${grandTotalInvestment.toLocaleString('es-AR')}%0A%0A` +
      `_Deseo coordinar la visita técnica de relevamiento presencial sin cargo en Formosa._`;
  };

  const handleSendWhatsappQuote = () => {
    const text = generateWhatsappMessage();
    const targetUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`;
    window.open(targetUrl, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = generateWhatsappMessage();
    const targetUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`;
    setLastQuoteUrl(targetUrl);
    setIsSubmitted(true);

    try {
      window.open(targetUrl, '_blank');
    } catch (err) {
      console.log('Popup blocked', err);
    }
  };

  return (
    <section id="cotizador" className="py-20 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculadora de Presupuesto Transparente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cotizador Online en Tiempo Real
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Ajusta las cantidades y valores unitarios de cada trabajo manualmente para calcular presupuestos a medida al instante.
          </p>

          {/* Manual Price Customizer Toggle */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setIsCustomPricingOpen(!isCustomPricingOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 border border-cyan-500/50 text-cyan-300 hover:bg-slate-900 transition-all shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isCustomPricingOpen ? 'Ocultar Editor de Precios Unitarios' : '✏️ Ajustar Precios Unitarios Manualmente'}</span>
            </button>
          </div>
        </div>

        {/* Manual Price Editor Panel (Conditional) */}
        {isCustomPricingOpen && (
          <div className="mb-10 bg-slate-950/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  Editor Manual de Tarifas y Mano de Obra
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Modifica los importes unitarios en ARS para recalcular el costo total de los trabajos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPricePerNetPoint(22000);
                  setPriceFiberUplink(85000);
                  setPriceCam4k(75000);
                  setPriceCamColorvu(48000);
                  setPriceNvrStorage(120000);
                  setPriceAccessControl(145000);
                  setPriceAutoNode(28000);
                  setPriceAutoHub(65000);
                  setPriceUpsAuto(95000);
                  setPricePcService(25000);
                  setPriceThermalPaste(12000);
                  setPricePrinterColor(68000);
                  setPricePrinterMono(38000);
                  setPricePrinterInk(28000);
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-700"
              >
                Restablecer Valores
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 block">Redes & Fibra</span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Punto de Red Cat6A ($):</label>
                  <input
                    type="number"
                    value={pricePerNetPoint}
                    onChange={(e) => setPricePerNetPoint(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Troncal Fibra Óptica ($):</label>
                  <input
                    type="number"
                    value={priceFiberUplink}
                    onChange={(e) => setPriceFiberUplink(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 block">CCTV & Seguridad</span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Cámara 4K WizSense ($):</label>
                  <input
                    type="number"
                    value={priceCam4k}
                    onChange={(e) => setPriceCam4k(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">NVR + Almacenamiento ($):</label>
                  <input
                    type="number"
                    value={priceNvrStorage}
                    onChange={(e) => setPriceNvrStorage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 block">Laboratorio & PC</span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mantenimiento/PC ($):</label>
                  <input
                    type="number"
                    value={pricePcService}
                    onChange={(e) => setPricePcService(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Pasta Térmica MX-6 ($):</label>
                  <input
                    type="number"
                    value={priceThermalPaste}
                    onChange={(e) => setPriceThermalPaste(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">Domótica & Leasing</span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Nodo Domótico IoT ($):</label>
                  <input
                    type="number"
                    value={priceAutoNode}
                    onChange={(e) => setPriceAutoNode(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Leasing Impresora Color ($/mes):</label>
                  <input
                    type="number"
                    value={pricePrinterColor}
                    onChange={(e) => setPricePrinterColor(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box (8 cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* 1. Módulo Redes */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Network className="w-4 h-4" />
                  <span>1. Redes & Cableado Estructurado</span>
                </div>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  ${totalNet.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Cantidad de Puestos / Bocas Cat6A:</span>
                    <strong className="text-white font-mono">{networkPoints} puntos</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    step="2"
                    value={networkPoints}
                    onChange={(e) => setNetworkPoints(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={includeFiber}
                    onChange={(e) => setIncludeFiber(e.target.checked)}
                    className="rounded accent-cyan-500 w-4 h-4"
                  />
                  <span>Incluir Troncal / Enlace de Fibra Óptica (+10 Gbps)</span>
                </label>
              </div>
            </div>

            {/* 2. Módulo CCTV */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>2. Videovigilancia IP & Cámaras</span>
                </div>
                <span className="text-xs font-mono text-blue-300 font-bold">
                  ${totalCctv.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Cantidad de Cámaras:</span>
                    <strong className="text-white font-mono">{cameraCount} cámaras</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    step="2"
                    value={cameraCount}
                    onChange={(e) => setCameraCount(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setCameraType('ip_4k')}
                    className={`py-1.5 px-3 rounded-lg border text-left transition-all ${
                      cameraType === 'ip_4k'
                        ? 'bg-blue-950 text-blue-300 border-blue-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    4K IP WizSense con IA
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraType('hd_colorvu')}
                    className={`py-1.5 px-3 rounded-lg border text-left transition-all ${
                      cameraType === 'hd_colorvu'
                        ? 'bg-blue-950 text-blue-300 border-blue-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    ColorVu 24/7 Nocturna
                  </button>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={includeAccessControl}
                    onChange={(e) => setIncludeAccessControl(e.target.checked)}
                    className="rounded accent-blue-500 w-4 h-4"
                  />
                  <span>Sumar Control de Acceso Biométrico / Facial a Puerta Principal</span>
                </label>
              </div>
            </div>

            {/* 3. Módulo Domótica & IoT */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>3. Automatización, Domótica & Energía</span>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  ${totalAuto.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Nodos Inteligentes (Luces, Persianas, Clima, Sensores):</span>
                    <strong className="text-white font-mono">{automationNodes} zonas</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="1"
                    value={automationNodes}
                    onChange={(e) => setAutomationNodes(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUpsAutomation}
                    onChange={(e) => setIncludeUpsAutomation(e.target.checked)}
                    className="rounded accent-amber-500 w-4 h-4"
                  />
                  <span>Automatización y Conmutación de Respaldo Eléctrico UPS / Generador</span>
                </label>
              </div>
            </div>

            {/* 4. Módulo Reparación / Mantenimiento PC */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Wrench className="w-4 h-4" />
                  <span>4. Mantenimiento Preventivo & Reparación de PC</span>
                </div>
                <span className="text-xs font-mono text-purple-300 font-bold">
                  ${totalPc.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Cantidad de Computadoras / Laptops a Asistir:</span>
                    <strong className="text-white font-mono">{pcMaintenanceCount} equipos</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={pcMaintenanceCount}
                    onChange={(e) => setPcMaintenanceCount(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeThermalUpgrade}
                    onChange={(e) => setIncludeThermalUpgrade(e.target.checked)}
                    className="rounded accent-purple-500 w-4 h-4"
                  />
                  <span>Incluir Re-pasteado térmico de alto rendimiento (Arctic MX-6) y desinfección interna</span>
                </label>
              </div>
            </div>

            {/* 5. Módulo Impresoras */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                  <Printer className="w-4 h-4" />
                  <span>5. Impresoras & Leasing Corporativo (Mensual)</span>
                </div>
                <span className="text-xs font-mono text-pink-300 font-bold">
                  ${totalPrintersMonthly.toLocaleString('es-AR')}/mes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Equipos en Alquiler:</span>
                  <select
                    value={printerLeasingCount}
                    onChange={(e) => setPrinterLeasingCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value={0}>Sin servicio de impresión</option>
                    <option value={1}>1 Impresora Multifunción</option>
                    <option value={2}>2 Impresoras Multifunción</option>
                    <option value={4}>4 Impresoras Parque Completo</option>
                  </select>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Tipo de Tecnología:</span>
                  <select
                    value={printerType}
                    onChange={(e) => setPrinterType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value="laser_color">Láser Color Corporativa</option>
                    <option value="laser_mono">Láser Monocromo Alto Rendimiento</option>
                    <option value="tinta_continua">Tinta Continua EcoTank</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary & Submission Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Resumen Estimado del Proyecto</span>
            </div>
            <h3 className="text-2xl font-black text-white">Presupuesto Sugerido</h3>

            {/* Breakdown item list */}
            <div className="divide-y divide-slate-800/80 my-5 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Redes ({networkPoints} puestos):</span>
                <span className="text-white font-mono">${totalNet.toLocaleString('es-AR')}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Cámaras CCTV ({cameraCount} unid.):</span>
                <span className="text-white font-mono">${totalCctv.toLocaleString('es-AR')}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Automatización ({automationNodes} nodos):</span>
                <span className="text-white font-mono">${totalAuto.toLocaleString('es-AR')}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Mantenimiento PC ({pcMaintenanceCount} u.):</span>
                <span className="text-white font-mono">${totalPc.toLocaleString('es-AR')}</span>
              </div>
              {totalPrintersMonthly > 0 && (
                <div className="py-2 flex justify-between text-pink-300">
                  <span>Abono Leasing Impresión:</span>
                  <span className="font-mono font-bold">${totalPrintersMonthly.toLocaleString('es-AR')}/mes</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-6">
              <span className="text-xs text-cyan-300 block font-semibold">Total Inversión Obra / Hardware:</span>
              <div className="text-3xl font-black text-white mt-0.5 font-mono">
                ${grandTotalInvestment.toLocaleString('es-AR')}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                *Valores orientativos sujetos a inspección técnica final. Factura A o B.
              </span>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <button
              type="button"
              id="send-whatsapp-quote-btn"
              onClick={handleSendWhatsappQuote}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all mb-3"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Enviar esta Cotización por WhatsApp</span>
            </button>

            {/* Quick Contact Form */}
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-2.5 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block">O solicita visita técnica & propuesta formal:</span>
                <input
                  type="text"
                  required
                  placeholder="Tu Nombre / Empresa *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono / WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Solicitar Visita Técnica Sin Cargo</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center text-xs text-emerald-300 space-y-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <div>
                  <p className="font-bold text-white text-sm">¡Cotización & Solicitud Enviadas!</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">La solicitud ha sido registrada y notificada a nuestro equipo técnico.</p>
                </div>
                {lastQuoteUrl && (
                  <a
                    href={lastQuoteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Ver o Reenviar por WhatsApp (+54 370 464-6635)</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-[11px] text-cyan-400 hover:underline block mx-auto"
                >
                  Modificar datos de cotización
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
