import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign,
  MessageCircle
} from 'lucide-react';
import { JobOpening } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface JobApplicationModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('2');
  const [linkedinOrPortfolio, setLinkedinOrPortfolio] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastNotificationUrl, setLastNotificationUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const experienceLabels: Record<string, string> = {
    junior: 'Junior / Trainee (< 1 año)',
    '1-2': '1 a 2 años',
    '3-5': '3 a 5 años (Semi-Senior)',
    '5+': 'Más de 5 años (Senior / Especialista)'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expText = experienceLabels[experienceYears] || experienceYears;
    const dateStr = new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });

    const whatsappMessage =
      `💼 *NUEVA POSTULACIÓN LABORAL - M&C INFORMÁTICA*%0A` +
      `📅 *Fecha:* ${encodeURIComponent(dateStr)}%0A` +
      `📌 *Vacante:* ${encodeURIComponent(job.title)} (${encodeURIComponent(job.department)})%0A` +
      `👤 *Candidato:* ${encodeURIComponent(fullName)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `📱 *Teléfono / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
      `⭐ *Experiencia:* ${encodeURIComponent(expText)}%0A` +
      `🔗 *LinkedIn / Portfolio:* ${encodeURIComponent(linkedinOrPortfolio || 'No adjuntado')}%0A` +
      `📎 *CV Archivo:* ${encodeURIComponent(fileName || 'Adjunto digitalmente')}%0A` +
      `📝 *Carta / Presentación:*%0A${encodeURIComponent(coverNote || 'Sin comentarios adicionales')}%0A%0A` +
      `_Notificación automática enviada desde Portal de Empleos M&C_`;

    const targetUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`;
    setLastNotificationUrl(targetUrl);
    setIsSubmitted(true);

    try {
      window.open(targetUrl, '_blank');
    } catch (err) {
      console.log('Popup blocked', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Postulación Laboral • {job.department}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {job.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Completa tus datos para que el equipo de Recursos Humanos y Dirección Técnica evalúe tu perfil.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Lucas Álvarez"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="lucas@email.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 11 ..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Años de Experiencia en el Rubro</label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:border-cyan-500"
                  >
                    <option value="junior">Menos de 1 año (Junior / Trainee)</option>
                    <option value="1-2">1 a 2 años</option>
                    <option value="3-5">3 a 5 años (Semi-Senior)</option>
                    <option value="5+">Más de 5 años (Senior / Especialista)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Enlace a LinkedIn o Portafolio (Opcional)</label>
                <input
                  type="url"
                  value={linkedinOrPortfolio}
                  onChange={(e) => setLinkedinOrPortfolio(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:border-cyan-500"
                />
              </div>

              {/* CV File Upload simulation */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Adjuntar Curriculum Vitae (PDF o DOCX) *</label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl bg-slate-950/60 cursor-pointer transition-colors">
                  <UploadCloud className="w-7 h-7 text-cyan-400 mb-1" />
                  <span className="text-slate-300 font-medium">
                    {fileName ? fileName : 'Haz clic para seleccionar tu CV o arrástralo aquí'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Máx. 10MB (PDF, DOC, DOCX)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Carta de Presentación o Comentarios</label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Contanos brevemente por qué te gustaría sumarte a M&C Informática..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Postulación</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">¡Postulación Recibida con Éxito!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mt-1">
                Muchas gracias <strong>{fullName}</strong>. Tu postulación para la vacante de <strong>{job.title}</strong> ha sido ingresada y se ha generado la notificación correspondiente.
              </p>
            </div>

            {/* WhatsApp notification card */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <MessageCircle className="w-4 h-4" />
                <span>Notificación de RRHH a WhatsApp: +54 370 464-6635</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Se envió el resumen de tu perfil profesional y datos de contacto a la línea de selección de M&C Informática.
              </p>
              {lastNotificationUrl && (
                <a
                  href={lastNotificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Ver o Notificar por WhatsApp (+54 370 464-6635)</span>
                </a>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-md transition-colors"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
