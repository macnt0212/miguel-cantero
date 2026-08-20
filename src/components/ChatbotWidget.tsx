import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Wrench, 
  ShieldCheck, 
  Network, 
  Cpu, 
  PackageCheck, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  RefreshCw, 
  Minimize2, 
  Maximize2, 
  CheckCircle2, 
  FileText,
  Clock,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO, COMPANY_LOGO_URL } from '../data/mockData';
import { ChatMessage, ServiceRequestTicket } from '../types';
import { RotatingCubeLogo } from './RotatingCubeLogo';

interface ChatbotWidgetProps {
  onNavigate: (sectionId: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    text: '👋 ¡Hola! Soy **TecnoBot**, el asistente técnico inteligente de **M&C Informática**.\n\nPuedo responder tus consultas técnicas, darte presupuestos estimativos, informarte el estado de tu orden de reparación o registrar una solicitud formal de servicio.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'system'
  }
];

const SUGGESTED_PROMPTS = [
  { label: '🛠️ Consultar mi orden #MC-8421', prompt: '¿Cuál es el estado de la reparación con orden #MC-8421?' },
  { label: '📹 Presupuesto cámaras de seguridad 4K', prompt: 'Quiero un presupuesto para instalar 4 cámaras IP 4K en mi local comercial con visualización en celular.' },
  { label: '🌐 Redes de fibra y cableado Cat6A', prompt: '¿Qué incluye el servicio de cableado estructurado y fusión de fibra óptica?' },
  { label: '💻 Reparación de placa madre notebook', prompt: 'Tengo una notebook gamer que no enciende por falla en placa madre. ¿Hacen diagnóstico a nivel componente?' },
  { label: '📦 Insumos y pastas térmicas en stock', prompt: '¿Qué pastas térmicas y componentes tienen disponibles en stock?' },
  { label: '🏢 Guardia de servidores 24/7', prompt: '¿Cómo funciona el servicio de mantenimiento y soporte de emergencias 24/7 para empresas?' },
];

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'solicitud'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mc_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState<boolean>(true);

  // Direct Request Form State
  const [requestForm, setRequestForm] = useState({
    name: '',
    contact: '',
    serviceType: 'Reparación de Hardware / Notebook',
    details: ''
  });
  const [createdTicket, setCreatedTicket] = useState<ServiceRequestTicket | null>(null);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save messages to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mc_chat_messages', JSON.stringify(messages));
    } catch (e) {
      // storage full or disabled
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, activeTab]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setShowNotificationBadge(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history for backend
      const historyPayload = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error('Error de comunicación con el servidor.');
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'He recibido tu consulta. Para atención personalizada inmediata, te invitamos a escribirnos por WhatsApp.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      // Detect if user might benefit from inline navigation
      const lower = text.toLowerCase();
      if (lower.includes('reparaci') || lower.includes('ticket') || lower.includes('taller') || lower.includes('orden')) {
        assistantMsg.suggestedNav = 'reparaciones';
        assistantMsg.suggestedActionLabel = '🔎 Abrir Consulta de Tickets';
      } else if (lower.includes('cotiz') || lower.includes('precio') || lower.includes('presupuesto')) {
        assistantMsg.suggestedNav = 'cotizador';
        assistantMsg.suggestedActionLabel = '⚡ Abrir Cotizador Online';
      } else if (lower.includes('muestra') || lower.includes('foto') || lower.includes('trabajo')) {
        assistantMsg.suggestedNav = 'muestras';
        assistantMsg.suggestedActionLabel = '📸 Ver Galería de Muestras';
      } else if (lower.includes('insumo') || lower.includes('comprar') || lower.includes('hardware') || lower.includes('producto')) {
        assistantMsg.suggestedNav = 'tienda';
        assistantMsg.suggestedActionLabel = '🛒 Ver Tienda de Insumos';
      }

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: `¡Disculpa la demora! Estamos con alta demanda de consultas técnicas.\n\nPuedes contactar directamente a nuestros ingenieros por WhatsApp al **${COMPANY_INFO.phone}** o dejar tu solicitud en la pestaña **"Crear Solicitud"** arriba.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('mc_chat_messages');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.name || !requestForm.contact || !requestForm.details) return;

    setIsSubmittingRequest(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestForm)
      });
      const data = await res.json();
      
      const newTicket: ServiceRequestTicket = {
        id: data.ticketId || `SOL-${Math.floor(1000 + Math.random() * 9000)}`,
        name: requestForm.name,
        contact: requestForm.contact,
        serviceType: requestForm.serviceType,
        details: requestForm.details,
        status: 'recibido',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setCreatedTicket(newTicket);

      // Trigger automatic WhatsApp notification to the owner +54 370 464-6635
      const dateStr = new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
      const whatsappMessage =
        `🚨 *NUEVA SOLICITUD DE SERVICIO TÉCNICO - #${newTicket.id}*%0A` +
        `📅 *Fecha:* ${encodeURIComponent(dateStr)}%0A` +
        `👤 *Cliente:* ${encodeURIComponent(newTicket.name)}%0A` +
        `📞 *Contacto:* ${encodeURIComponent(newTicket.contact)}%0A` +
        `🔧 *Tipo:* ${encodeURIComponent(newTicket.serviceType)}%0A` +
        `📝 *Detalle:*%0A${encodeURIComponent(newTicket.details)}%0A%0A` +
        `_Generado desde TecnoBot M&C_`;

      const targetUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`;
      try {
        window.open(targetUrl, '_blank');
      } catch (err) {
        console.log('Popup blocked', err);
      }

      // Also append confirmation to chat
      const confirmationMsg: ChatMessage = {
        id: `bot-ticket-${Date.now()}`,
        role: 'assistant',
        text: `✅ **Solicitud #${newTicket.id} Registrada y Notificada**\n\n- **Cliente**: ${newTicket.name}\n- **Servicio**: ${newTicket.serviceType}\n- **Contacto**: ${newTicket.contact}\n\nSe ha emitido la notificación directa al equipo técnico de guardia en WhatsApp (+54 370 464-6635).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmationMsg]);
    } catch (err) {
      console.error('Error submitting request:', err);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const resetRequestForm = () => {
    setCreatedTicket(null);
    setRequestForm({
      name: '',
      contact: '',
      serviceType: 'Reparación de Hardware / Notebook',
      details: ''
    });
  };

  // Helper to parse simple markdown formatting in chat bubbles
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-[13px]">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Process bold text **text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-cyan-200">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          });

          if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>{formattedLine}</span>
              </div>
            );
          }

          if (line.trim().match(/^\d+\.\s/)) {
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1 font-medium">
                <span>{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="relative group">
          {/* Pulse ping ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-70 blur-sm group-hover:opacity-100 animate-pulse transition duration-500" />
          
          <button
            id="open-chatbot-btn"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-slate-950 border border-cyan-500/50 hover:border-cyan-400 text-white shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Abrir chat de consultas M&C"
          >
            <div className="relative w-8 h-8 rounded-full bg-slate-900 border border-cyan-400/40 flex items-center justify-center shrink-0">
              <RotatingCubeLogo size="xs" speed="normal" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
            </div>

            <div className="text-left pr-1 hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white tracking-wide">TecnoBot M&C</span>
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-950 border border-cyan-500/50 text-[9px] font-bold text-cyan-300">
                  IA
                </span>
              </div>
              <p className="text-[11px] text-cyan-300 font-medium">¿Consultas o presupuestos? Chatea aquí</p>
            </div>

            {showNotificationBadge && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[10px] font-bold text-slate-950 items-center justify-center">1</span>
              </span>
            )}
          </button>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div 
          className={`bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-xl ${
            isExpanded 
              ? 'w-[95vw] sm:w-[540px] h-[85vh] max-h-[750px]' 
              : 'w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center shrink-0 shadow-md">
                <RotatingCubeLogo size="xs" speed="normal" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-white tracking-wide">
                    TecnoBot M&C
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-[9px] font-bold text-cyan-300">
                    Asistente 24/7
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea • Respuestas al instante</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Limpiar conversación"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restaurar tamaño' : 'Expandir ventana'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs (Chat vs Direct Request Form) */}
          <div className="flex border-b border-slate-800/80 bg-slate-900/60 p-1 shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'chat'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat de Consultas</span>
            </button>

            <button
              onClick={() => setActiveTab('solicitud')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'solicitud'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Crear Solicitud</span>
              {createdTicket && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>

          {/* TAB 1: CHAT CONVERSATION */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-950">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-900 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                      )}

                      <div className={`max-w-[85%] space-y-2`}>
                        <div
                          className={`p-3.5 rounded-2xl ${
                            isUser
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-xs shadow-md'
                              : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-xs shadow-md'
                          }`}
                        >
                          {renderFormattedText(msg.text)}

                          {/* Action button if suggested */}
                          {msg.suggestedNav && (
                            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                              <button
                                onClick={() => {
                                  onNavigate(msg.suggestedNav!);
                                  setIsOpen(false);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <span>{msg.suggestedActionLabel || 'Ver Sección'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Timestamp & Meta */}
                        <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <span>{msg.timestamp}</span>
                          {!isUser && msg.source === 'gemini-3.7-flash' && (
                            <span className="text-cyan-400 font-mono flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5" /> IA
                            </span>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4 text-cyan-300" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 rounded-tl-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[11px] text-slate-400 ml-1 font-medium">TecnoBot analizando...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="p-2.5 bg-slate-950/90 border-t border-slate-900 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1 shrink-0">
                    Sugerencias:
                  </span>
                  {SUGGESTED_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      disabled={isLoading}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-medium transition-colors shrink-0 disabled:opacity-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu consulta técnica o número de orden..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 font-bold transition-all shadow-md shrink-0"
                    title="Enviar mensaje"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* WhatsApp Escalation Link */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>¿Prefieres hablar con un operador?</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola%20M%26C%20Informática,%20estaba%20en%20el%20sitio%20web%20y%20tengo%20una%20consulta`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Humano</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT SERVICE REQUEST FORM */}
          {activeTab === 'solicitud' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-950 text-left">
              {createdTicket ? (
                <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-5 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Solicitud Generada Exitosamente
                    </span>
                    <h4 className="text-xl font-black text-white mt-1">
                      Código de Seguimiento: #{createdTicket.id}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Hola <strong>{createdTicket.name}</strong>, tu requerimiento sobre <strong>{createdTicket.serviceType}</strong> ha sido ingresado al sistema de guardia técnica.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-left text-xs font-mono text-slate-300 space-y-1">
                    <div>• <strong>Orden:</strong> #{createdTicket.id}</div>
                    <div>• <strong>Contacto:</strong> {createdTicket.contact}</div>
                    <div>• <strong>Detalle:</strong> {createdTicket.details}</div>
                    <div>• <strong>Hora:</strong> {createdTicket.createdAt}</div>
                  </div>

                  {/* Direct WhatsApp notification button */}
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                      `🚨 *NOTIFICACIÓN DE SOLICITUD #${createdTicket.id}*\n` +
                      `👤 *Cliente:* ${createdTicket.name}\n` +
                      `📞 *Contacto:* ${createdTicket.contact}\n` +
                      `🔧 *Tipo:* ${createdTicket.serviceType}\n` +
                      `📝 *Detalle:* ${createdTicket.details}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Notificar por WhatsApp (+54 370 464-6635)</span>
                  </a>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
                    >
                      Volver al Chat
                    </button>
                    <button
                      onClick={resetRequestForm}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                    >
                      Cargar Otra Solicitud
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      Cargar Solicitud de Servicio Técnico / Presupuesto
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Completa el formulario para que un ingeniero o técnico especializado te contacte con diagnóstico preliminar.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Nombre y Apellido / Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={requestForm.name}
                      onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                      placeholder="Ej: Marcelo Gómez o Empresa S.A."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp o Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={requestForm.contact}
                      onChange={(e) => setRequestForm({ ...requestForm, contact: e.target.value })}
                      placeholder="Ej: +54 9 11 2345-6789 / info@empresa.com"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Tipo de Requerimiento / Unidad *
                    </label>
                    <select
                      value={requestForm.serviceType}
                      onChange={(e) => setRequestForm({ ...requestForm, serviceType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Reparación de Hardware / Notebook">Laboratorio de Microelectrónica (Notebook / PC)</option>
                      <option value="Instalación de Cámaras CCTV IP">Seguridad y Cámaras CCTV IP 4K</option>
                      <option value="Cableado y Fibra Óptica">Redes, Cableado Estructurado y Fibra Óptica</option>
                      <option value="Domótica y Automatización">Domótica e Iluminación Inteligente</option>
                      <option value="Leasing / Service de Impresoras">Leasing e Insumos de Impresoras</option>
                      <option value="Compra Mayorista de Hardware">Compra de Insumos o Hardware</option>
                      <option value="Soporte y Guardia Corporativa 24/7">Abono de Soporte para Empresas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Detalle de la Falla o Solicitud *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={requestForm.details}
                      onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
                      placeholder="Describe el síntoma del equipo, cantidad de cámaras o puestos de red a presupuestar..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingRequest}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    {isSubmittingRequest ? (
                      <span>Registrando solicitud...</span>
                    ) : (
                      <>
                        <span>Enviar Solicitud a Laboratorio</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
