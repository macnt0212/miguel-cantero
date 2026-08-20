import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert,
  Building
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('redes');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo funciona la garantía de reparaciones y equipamiento?',
      a: 'Todas las reparaciones realizadas en nuestro laboratorio de microelectrónica cuentan con 90 a 180 días de garantía escrita. Los equipos nuevos y hardware disponen de 12 a 36 meses de garantía oficial de fábrica con factura.'
    },
    {
      q: '¿Realizan visitas y relevamiento técnico previo sin cargo?',
      a: 'Sí, para proyectos de cableado estructurado, fibra óptica, cámaras de seguridad y sistemas de automatización corporativa, realizamos una visita de relevamiento técnico sin costo en el área metropolitana.'
    },
    {
      q: '¿Tienen servicio de atención de emergencias los fines de semana?',
      a: 'Disponemos de guardia de emergencia 24/7 para empresas con contrato de mantenimiento activo y clientes con infraestructuras de misión crítica (servidores, redes troncales, cámaras de seguridad de plantas).'
    },
    {
      q: '¿Puedo llevar mi equipo directamente a sucursal para diagnóstico?',
      a: 'Sí, podés acercar tu notebook, PC o impresora a nuestra sede central de Lunes a Viernes de 08:30 a 18:30 y Sábados de 09:00 a 13:30. Se genera un código de orden de trabajo con el que podrás seguir el estado online.'
    },
  ];

  const [lastNotificationUrl, setLastNotificationUrl] = useState<string>('');

  const serviceLabels: Record<string, string> = {
    redes: 'Redes & Fibra Óptica',
    camaras: 'Cámaras de Seguridad & CCTV IP',
    automatizacion: 'Automatización & Domótica',
    impresoras: 'Impresoras & Leasing Corporativo',
    reparacion: 'Reparación de PC & Laboratorio SMD',
    ventas: 'Ventas de Hardware & Equipos',
    otro: 'Otro / Consulta General'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceName = serviceLabels[service] || service;
    const dateStr = new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });

    const whatsappMessage = 
      `🚨 *NUEVA SOLICITUD DE CONTACTO - M&C INFORMÁTICA*%0A` +
      `📅 *Fecha:* ${encodeURIComponent(dateStr)}%0A` +
      `👤 *Cliente:* ${encodeURIComponent(name)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `📱 *Teléfono:* ${encodeURIComponent(phone || 'No especificado')}%0A` +
      `💼 *Área de Interés:* ${encodeURIComponent(serviceName)}%0A` +
      `📝 *Mensaje / Proyecto:*%0A${encodeURIComponent(message)}%0A%0A` +
      `_Enviado desde el sitio web de M&C Informática_`;

    const targetUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`;
    setLastNotificationUrl(targetUrl);
    setIsSent(true);

    // Automatically trigger notification to WhatsApp
    try {
      window.open(targetUrl, '_blank');
    } catch (err) {
      console.log('Popup blocked, available via button', err);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Atención Comercial y Soporte Técnico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contactate con M&C Informática
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Estamos a tu disposición para asesorarte sobre proyectos de infraestructura, presupuestos y soporte de laboratorio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact details & Location & Emergency box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white mb-2">Información Central</h3>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Sede Central & Laboratorio:</strong>
                  <p className="text-slate-400">{COMPANY_INFO.address}</p>
                  <p className="text-slate-400">{COMPANY_INFO.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Teléfono Comercial & Mesa de Ayuda:</strong>
                  <p className="text-cyan-300 font-mono text-sm">{COMPANY_INFO.phone}</p>
                  <p className="text-slate-400">Atención personalizada inmediata</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Correos Electrónicos:</strong>
                  <p className="text-slate-300">{COMPANY_INFO.email} (Consultas generales)</p>
                  <p className="text-slate-300">{COMPANY_INFO.supportEmail} (Tickets técnicos)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Horarios de Atención:</strong>
                  <p className="text-slate-400">{COMPANY_INFO.hours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20deseo%20hacer%20una%20consulta`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chatear por WhatsApp Ahora</span>
                </a>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 rounded-2xl p-5 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-300 block text-sm font-bold">Guardia de Emergencias Críticas 24/7</strong>
                <p className="text-slate-300 mt-0.5">
                  Para caídas de servidores, enlaces troncales de fibra o fallas en sistemas de seguridad bancarios/industriales.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Interactive FAQs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Form */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Envíanos un Mensaje Directo</h3>
              <p className="text-xs text-slate-400 mb-6">Completa el formulario y te responderemos en un plazo máximo de 2 horas hábiles.</p>

              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Email de Contacto *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="juan@empresa.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Teléfono / Celular</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+54 11 ..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Área de Interés</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500"
                      >
                        <option value="redes">Redes & Fibra Óptica</option>
                        <option value="camaras">Cámaras de Seguridad & CCTV</option>
                        <option value="automatizacion">Automatización & Domótica</option>
                        <option value="impresoras">Impresoras & Leasing</option>
                        <option value="reparacion">Reparación de PC & Laboratorio</option>
                        <option value="ventas">Ventas de Hardware & Equipos</option>
                        <option value="otro">Otro / Consulta General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Detalle de tu Proyecto o Consulta *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describí brevemente tu requerimiento, cantidad de puestos, cámaras o falla de equipo..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all hover:scale-101"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje a M&C Informática</span>
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                      Muchas gracias por contactarte con M&C Informática. La notificación se ha generado para nuestra línea oficial de atención técnica.
                    </p>
                  </div>

                  {/* WhatsApp Notification Direct Alert Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-left space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>Notificación directa a WhatsApp: +54 370 464-6635</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Se abrió la ventana de WhatsApp para enviar de forma instantánea todos los datos de tu consulta. Si no se abrió automáticamente, puedes tocar el botón a continuación:
                    </p>
                    {lastNotificationUrl && (
                      <a
                        href={lastNotificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-slate-950" />
                        <span>Abrir y Notificar por WhatsApp (+54 370 464-6635)</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              )}
            </div>

            {/* Interactive FAQs Accordion */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Preguntas Frecuentes de Clientes
              </h4>
              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/60"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left text-xs font-bold text-slate-200 hover:text-cyan-300 flex items-center justify-between gap-3 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2 animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
