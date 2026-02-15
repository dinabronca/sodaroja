import React from 'react';
import { motion } from 'framer-motion';
import { Package, Mail } from 'lucide-react';
import { getContent } from '../data/content';
import { EditorialHeader } from './Editorial';

export const Shop: React.FC = () => {
  const shop = getContent().shop;

  return (
    <section id="shop" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <EditorialHeader
          label="Merch"
          title={shop.title}
          subtitle={shop.subtitle}
          center
        />

        {/* Coming soon item */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-soda-night/50 border border-soda-mist/10 rounded-sm p-10 text-center max-w-md mx-auto mb-12">
          <Package size={32} className="text-soda-fog/30 mb-4 mx-auto" />
          <h3 className="text-xl font-serif text-soda-glow mb-2">Pack de Stickers</h3>
          <p className="text-soda-fog/40 text-sm mb-4">Colección de stickers del culto</p>
          <span className="text-soda-fog/25 text-[10px] tracking-[0.2em] uppercase">Próximamente</span>
        </motion.div>

        {/* Notify */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="max-w-md mx-auto text-center">
          <p className="text-soda-fog/40 text-sm mb-6">Dejanos tu email y te avisamos cuando esté disponible</p>
          <div className="flex gap-3">
            <input type="email" placeholder="tu@email.com" className="flex-1 bg-soda-night/50 border border-soda-mist/10 rounded-sm px-4 py-3 text-soda-lamp text-sm focus:border-soda-accent/30 focus:outline-none transition-colors duration-500" />
            <button className="px-5 py-3 border border-soda-mist/15 text-soda-lamp/60 rounded-sm hover:border-soda-lamp/25 hover:text-soda-lamp transition-all duration-500 text-[11px] tracking-wider flex items-center gap-2">
              <Mail size={14} />Avisame
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
