/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyCharts } from './components/CompanyCharts';
import { ServicesSection } from './components/ServicesSection';
import { SampleShowcaseGallery } from './components/SampleShowcaseGallery';
import { RepairTracker } from './components/RepairTracker';
import { ProductsSection } from './components/ProductsSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { CareersSection } from './components/CareersSection';
import { AboutAndTestimonials } from './components/AboutAndTestimonials';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { JobApplicationModal } from './components/JobApplicationModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { CartItem, ProductItem, JobOpening, ServiceCategory } from './types';
import { MessageCircle, Zap, Wrench } from 'lucide-react';
import { COMPANY_INFO } from './data/mockData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);
  const [selectedQuoteService, setSelectedQuoteService] = useState<ServiceCategory>('redes');

  // Navigation Handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Management
  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, product, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleUpdateItemPrice = (productId: string, newPrice: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, product: { ...item.product, price: newPrice } }
          : item
      )
    );
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Service Quote Selection from Service Section
  const handleSelectServiceForQuote = (category: ServiceCategory) => {
    setSelectedQuoteService(category);
    handleNavigate('cotizador');
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Main Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      <main>
        {/* 1. Hero Presentation */}
        <Hero 
          onNavigate={handleNavigate}
          onOpenRepairLookup={() => handleNavigate('reparaciones')}
        />

        {/* 2. Gráficos de la Empresa & Métricas */}
        <CompanyCharts />

        {/* 3. Servicios Especializados (Redes, CCTV, Automatización, Impresoras, Reparación, Ventas) */}
        <ServicesSection 
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* 4. Galería Técnica: Fotos de Muestras de Insumos y Reparaciones */}
        <SampleShowcaseGallery 
          onSelectQuote={() => handleNavigate('cotizador')}
        />

        {/* 5. Portal de Seguimiento de Reparaciones de Laboratorio */}
        <RepairTracker />

        {/* 6. Tienda & Ventas de Hardware / Insumos */}
        <ProductsSection 
          onAddToCart={handleAddToCart}
        />

        {/* 6. Calculadora / Cotizador en Línea */}
        <QuoteCalculator 
          defaultService={selectedQuoteService}
        />

        {/* 7. Ofertas de Trabajo & Búsquedas Laborales */}
        <CareersSection 
          onSelectJobForApplication={(job) => setSelectedJobForModal(job)}
        />

        {/* 8. Acerca de, Certificaciones y Testimonios de Clientes */}
        <AboutAndTestimonials />

        {/* 9. Contacto, Ubicación y FAQs */}
        <ContactSection />
      </main>

      {/* Floating Action Button: WhatsApp Quick Shortcut (Left Side) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20deseo%20hacer%20una%20consulta%20técnica`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105"
          aria-label="Atención por WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <span>WhatsApp Directo</span>
        </a>
      </div>

      {/* Interactive AI Chatbot Widget (TecnoBot M&C) */}
      <ChatbotWidget onNavigate={handleNavigate} />

      {/* Cart & Quotation Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onUpdatePrice={handleUpdateItemPrice}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Job Application Modal */}
      <JobApplicationModal
        job={selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
