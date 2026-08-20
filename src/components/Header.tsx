import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  ShoppingCart, 
  Search, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Wrench, 
  ShieldAlert, 
  Network 
} from 'lucide-react';
import { COMPANY_INFO, COMPANY_LOGO_URL } from '../data/mockData';
import { RotatingCubeLogo } from './RotatingCubeLogo';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  openRepairModalWithCode?: (code?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'muestras', label: 'Muestras & Trabajos' },
    { id: 'graficos', label: 'Métricas' },
    { id: 'reparaciones', label: 'Estado de Reparación' },
    { id: 'tienda', label: 'Ventas & Insumos' },
    { id: 'cotizador', label: 'Cotizador' },
    { id: 'empleos', label: 'Empleos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Bar for Quick Contact & Emergencies */}
      <div id="top-announcement-bar" className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Laboratorio Técnico y Soporte de Infraestructura Activo
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-400" />
              Guardia 24/7 Corporativa: <strong className="text-slate-200">{COMPANY_INFO.phone}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">{COMPANY_INFO.hours}</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20deseo%20hacer%20una%20consulta`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/20 shadow-xl shadow-slate-950/40 py-3' 
            : 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 border-2 border-cyan-300/80 shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/30 group-hover:border-cyan-200 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center transition-all shrink-0">
              <RotatingCubeLogo size="sm" speed="normal" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  M&C
                </span>
                <span className="text-xl font-black text-cyan-300 tracking-tight drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                  INFORMÁTICA
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase font-bold text-slate-300">
                Tecnología & Infraestructura
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Repair Lookup Button */}
            <button
              id="quick-repair-btn"
              onClick={() => handleNavClick('reparaciones')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-cyan-500/40 transition-all"
              title="Consultar número de orden de reparación"
            >
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ver Ticket</span>
            </button>

            {/* Shopping / Quote Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={openCart}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-colors"
              aria-label="Abrir carrito de compras o cotización"
            >
              <ShoppingCart className="w-5 h-5 text-slate-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct CTA */}
            <button
              id="header-quote-cta-btn"
              onClick={() => handleNavClick('cotizador')}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all hover:scale-102 active:scale-98"
            >
              Cotizar Proyecto
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-dropdown" className="lg:hidden bg-slate-900/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                id="mobile-cta-cotizar"
                onClick={() => handleNavClick('cotizador')}
                className="w-full py-2.5 px-4 rounded-xl text-center font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md"
              >
                Calculadora de Presupuesto Online
              </button>
              <a
                id="mobile-cta-whatsapp"
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20deseo%20hacer%20una%20consulta`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-sm bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
