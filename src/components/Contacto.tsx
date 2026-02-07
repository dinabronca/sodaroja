import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getContent } from '../data/content';
import { MailEffects } from '../effects/SectionBackgrounds';

export const Contacto: React.FC = () => {
  const contacto = getContent().contacto;
  const meta = getContent().meta;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si hay EmailJS configurado, usar eso
    const ejsService = meta?.emailjsServiceId || '';
    const ejsTemplate = meta?.emailjsTemplateId || '';
    const ejsKey = meta?.emailjsPublicKey || '';

    if (ejsService && ejsTemplate && ejsKey) {
      setStatus('sending');
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: ejsService,
            template_id: ejsTemplate,
            user_id: ejsKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              to_email: contacto.email,
            },
          }),
        });
        if (res.ok) {
          setStatus('sent');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 4000);
        } else {
          setStatus('error');
          setTimeout(() => setStatus('idle'), 3000);
        }
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } else {
      // Fallback: mailto
      const subject = encodeURIComponent(`Contacto de ${formData.name}`);
      const body = encodeURIComponent(`De: ${formData.name} (${formData.email})\n\n${formData.message}`);
      window.location.href = `mailto:${contacto.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const ic = "w-full bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";

  return (
    <section id="contacto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night to-soda-deep overflow-hidden">
      <MailEffects />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">Contacto</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg font-light">Tenes una historia para contar? Queres colaborar? Hablemos.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><label className="block text-soda-lamp text-sm mb-2">Tu nombre</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={ic} placeholder="Juan Perez" /></div>
              <div><label className="block text-soda-lamp text-sm mb-2">Tu email</label><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={ic} placeholder="tu@email.com" /></div>
              <div><label className="block text-soda-lamp text-sm mb-2">Mensaje</label><textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={6} className={ic + ' resize-none'} placeholder="Contanos tu idea..." /></div>

              <button type="submit" disabled={status === 'sending'} className={`glow-button hoverable w-full py-4 border rounded-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 ${
                status === 'sent' ? 'bg-green-500 bg-opacity-20 border-green-500 text-green-400'
                : status === 'error' ? 'bg-red-500 bg-opacity-20 border-red-500 text-red-400'
                : 'bg-soda-accent bg-opacity-20 border-soda-accent text-soda-lamp hover:bg-opacity-30'
              }`}>
                {status === 'idle' && <><Send size={16} />ENVIAR MENSAJE</>}
                {status === 'sending' && <><Loader2 size={16} className="animate-spin" />ENVIANDO...</>}
                {status === 'sent' && <><CheckCircle size={16} />MENSAJE ENVIADO</>}
                {status === 'error' && <><AlertCircle size={16} />ERROR AL ENVIAR</>}
              </button>
              {status === 'error' && <p className="text-soda-fog text-xs text-center">No se pudo enviar. Intenta de nuevo o escribinos directamente al email.</p>}
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
              <h3 className="text-xl font-serif text-soda-glow mb-6">Lineas directas</h3>
              <div className="space-y-4">
                <a href={`mailto:${contacto.email}`} className="hoverable flex items-center gap-4 text-soda-lamp hover:text-soda-glow transition-colors group"><Mail size={24} className="text-soda-accent group-hover:text-soda-lamp transition-colors" /><span>{contacto.email}</span></a>
                <a href={`https://instagram.com/${contacto.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hoverable flex items-center gap-4 text-soda-lamp hover:text-soda-glow transition-colors group"><Instagram size={24} className="text-soda-accent group-hover:text-soda-lamp transition-colors" /><span>{contacto.instagram}</span></a>
              </div>
            </div>
            <p className="text-soda-fog text-sm font-light">Respondemos todos los mensajes. Puede que tarde un poco, pero llegamos.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
