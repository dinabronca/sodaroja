import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Youtube } from 'lucide-react';

export const Contacto: React.FC = () => {
  return (
    <section id="contacto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night to-soda-deep">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            Contacto
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg font-light">
            ¿Tenés una historia para contar? ¿Querés colaborar? Hablemos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <motion.a
            href="mailto:hola@sodaroja.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hoverable bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8 text-center hover:border-soda-accent hover:border-opacity-40 transition-all group"
          >
            <Mail size={32} className="mx-auto mb-4 text-soda-accent group-hover:text-soda-lamp transition-colors" />
            <h3 className="text-xl font-serif text-soda-glow mb-2">Email</h3>
            <p className="text-soda-fog text-sm">hola@sodaroja.com</p>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/sodaroja"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hoverable bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8 text-center hover:border-soda-accent hover:border-opacity-40 transition-all group"
          >
            <Instagram size={32} className="mx-auto mb-4 text-soda-accent group-hover:text-soda-lamp transition-colors" />
            <h3 className="text-xl font-serif text-soda-glow mb-2">Instagram</h3>
            <p className="text-soda-fog text-sm">@sodaroja</p>
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://youtube.com/@sodaroja"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hoverable bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8 text-center hover:border-soda-accent hover:border-opacity-40 transition-all group"
          >
            <Youtube size={32} className="mx-auto mb-4 text-soda-accent group-hover:text-soda-lamp transition-colors" />
            <h3 className="text-xl font-serif text-soda-glow mb-2">YouTube</h3>
            <p className="text-soda-fog text-sm">@sodaroja</p>
          </motion.a>
        </div>

        {/* Mensaje adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-soda-fog text-sm font-light">
            Respondemos todos los mensajes. Puede que tarde un poco, pero llegamos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
