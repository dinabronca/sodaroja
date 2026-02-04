import React from 'react';
import { motion } from 'framer-motion';

export const Shop: React.FC = () => {
  return (
    <section id="shop" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            Objetos Encontrados
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-16"
        >
          <div className="text-8xl mb-8">🏗️</div>
          <h3 className="text-2xl font-serif text-soda-lamp mb-4">
            Estamos preparando algo especial
          </h3>
          <p className="text-soda-fog text-lg font-light max-w-2xl mx-auto">
            Pronto vas a poder encontrar objetos únicos del universo SODAROJA. 
            Stickers, postales, mapas impresos y más.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
