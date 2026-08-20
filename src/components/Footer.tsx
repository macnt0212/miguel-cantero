import React from 'react';
import { 
  Cpu, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Network, 
  ShieldAlert, 
  Wrench, 
  Printer, 
  ShoppingBag,
  ArrowUp,
  Heart
} from 'lucide-react';
import { COMPANY_INFO, COMPANY_LOGO_URL } from '../data/mockData';
import { RotatingCubeLogo } from './RotatingCubeLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 border-2 border-cyan-300/80 shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/30 flex items-center justify-center shrink-0">
                <RotatingCubeLogo size="sm" speed="normal" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  M&C <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">INFORMÁTICA</span>
                </span>
                <p className="text-[10px] tracking-wider uppercase font-bold text-slate-300">
                  Tecnología & Infraestructura
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empresa líder en diseño y ejecución de redes de fibra óptica, sistemas de videovigilancia inteligente 4K, domótica y automatización, leasing de impresoras, laboratorio de microelectrónica y venta corporativa de hardware e insumos originales.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garantía Escrita y Facturación A / B
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-cyan-400 transition-colors">
                  Inicio & Presentación
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors">
                  Nuestros Servicios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('muestras')} className="hover:text-cyan-400 text-cyan-300 font-medium transition-colors">
                  Fotos & Muestras Técnicas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('graficos')} className="hover:text-cyan-400 transition-colors">
                  Gráficos & Métricas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reparaciones')} className="hover:text-cyan-400 transition-colors">
                  Seguimiento de Reparación
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda')} className="hover:text-cyan-400 transition-colors">
                  Ventas & Insumos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cotizador')} className="hover:text-cyan-400 transition-colors">
                  Cotizador en Línea
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('empleos')} className="hover:text-cyan-400 transition-colors">
                  Bolsa de Trabajo
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Divisiones Técnicas
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Network className="w-3 h-3 text-cyan-400" /> Redes y Fibra Óptica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShieldAlert className="w-3 h-3 text-blue-400" /> Cámaras CCTV 4K & IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-amber-400" /> Automatización & Domótica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Printer className="w-3 h-3 text-pink-400" /> Impresoras & Leasing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Wrench className="w-3 h-3 text-purple-400" /> Reparación de PC & Microelectrónica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-3 h-3 text-emerald-400" /> Equipos & Componentes
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Contacto Directo
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-mono text-slate-200">{COMPANY_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </p>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20deseo%20hacer%20una%20consulta`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold pt-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Oficial
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>M&C Informática</strong>. Todos los derechos reservados. Soluciones Tecnológicas Integrales.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
