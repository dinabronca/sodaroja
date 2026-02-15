import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, CheckCircle, AlertCircle, Loader2, MessageSquare, Lightbulb, Briefcase, HelpCircle, Heart, Bug } from 'lucide-react';
import { getContent } from '../data/content';
import { EditorialHeader } from './Editorial';

const subjectOptions = [
  { id: 'mensaje', label: 'Mensaje', icon: MessageSquare },
  { id: 'sugerencia', label: 'Sugerencia', icon: Lightbulb },
  { id: 'patrocinio', label: 'Patrocinio', icon: Briefcase },
  { id: 'historias', label: 'Una historia', icon: Heart },
  { id: 'problema', label: 'Problema', icon: Bug },
  { id: 'otro', label: 'Otro', icon: HelpCircle },
];

export const Contacto: React.FC = () => {
  const contacto = getContent().contacto;
  const meta = getContent().meta;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subjectLabel = subjectOptions.find(s => s.id === formData.subject)?.label || 'Mensaje';
    const fullSubject = `[${subjectLabel}] Contacto de ${formData.name}`;
    const ejsService = meta?.emailjsServiceId || '';
    const ejsTemplate = meta?.emailjsTemplateId || '';
    const ejsKey = meta?.emailjsPublicKey || '';

    if (ejsService && ejsTemplate && ejsKey) {
      setStatus('sending');
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ service_id: ejsService, template_id: ejsTemplate, user_id: ejsKey,
            template_params: { from_name: formData.name, from_email: formData.email, subject: fullSubject, message: formData.message, to_email: contacto.email } }),
        });
        if (res.ok) { setStatus('sent'); setFormData({ name: '', email: '', subject: '', message: '' }); setTimeout(() => setStatus('idle'), 4000); }
        else { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
      } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
    } else {
      const subject = encodeURIComponent(fullSubject);
      const body = encodeURIComponent(`De: ${formData.name} (${formData.email})\n\n${formData.message}`);
      window.location.href = `mailto:${contacto.email}?subject=${subject}&body=${body}`;
      setStatus('sent'); setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const ic = "w-full bg-soda-night/50 border border-soda-mist/10 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent/30 focus:outline-none transition-colors duration-500 text-sm font-light";

  return (
    <section id="contacto" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Editorial header */}
        <EditorialHeader
          label="Hablemos"
          title="Contacto"
          subtitle="Tenés una historia para contar? Querés colaborar? Escribinos."
          center
        />

        {/* Atmospheric quote */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-16">
          <p className="text-soda-fog/30 text-sm italic font-serif max-w-xl mx-auto">"Las mejores historias empiezan con alguien que se anima a contarlas"</p>
        </motion.div>

        {/* Form — single column, compact */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Subject pills */}
            <div>
              <span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-3">Asunto</span>
              <div className="flex flex-wrap gap-2">
                {subjectOptions.map((opt) => {
                  const selected = formData.subject === opt.id;
                  return (
                    <button type="button" key={opt.id} onClick={() => setFormData({ ...formData, subject: opt.id })}
                      className={`px-4 py-2 rounded-sm text-[11px] tracking-wider transition-all duration-500 border ${
                        selected
                          ? 'border-soda-red/30 text-soda-lamp bg-soda-red/5'
                          : 'border-soda-mist/10 text-soda-fog/40 hover:text-soda-fog/60 hover:border-soda-mist/20'
                      }`}
                    >{opt.label}</button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">Nombre</span><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={ic} placeholder="Tu nombre" /></div>
              <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">Email</span><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={ic} placeholder="tu@email.com" /></div>
            </div>

            <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">Mensaje</span><textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className={ic + ' resize-none'} placeholder="Contanos..." /></div>

            <button type="submit" disabled={status === 'sending' || !formData.subject} className={`w-full py-4 border rounded-sm transition-all duration-500 tracking-[0.2em] flex items-center justify-center gap-2 text-[11px] uppercase ${
              status === 'sent' ? 'border-emerald-400/30 text-emerald-400/70'
              : status === 'error' ? 'border-red-400/30 text-red-400/60'
              : !formData.subject ? 'border-soda-mist/10 text-soda-fog/25 cursor-not-allowed'
              : 'border-soda-mist/15 text-soda-lamp/60 hover:border-soda-lamp/25 hover:text-soda-lamp'
            }`}>
              {status === 'idle' && <><Send size={14} />Enviar</>}
              {status === 'sending' && <><Loader2 size={14} className="animate-spin" />Enviando</>}
              {status === 'sent' && <><CheckCircle size={14} />Enviado</>}
              {status === 'error' && <><AlertCircle size={14} />Error</>}
            </button>
          </form>

          {/* Direct lines — below form */}
          <div className="mt-12 pt-8 border-t border-soda-mist/8 flex flex-col sm:flex-row justify-center gap-8">
            <a href={`mailto:${contacto.email}`} className="flex items-center gap-3 text-soda-fog/40 hover:text-soda-lamp/60 transition-colors duration-500 text-sm">
              <Mail size={16} /><span>{contacto.email}</span>
            </a>
            <a href={`https://instagram.com/${contacto.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-soda-fog/40 hover:text-soda-lamp/60 transition-colors duration-500 text-sm">
              <Instagram size={16} /><span>{contacto.instagram}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
