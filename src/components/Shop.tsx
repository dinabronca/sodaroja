import React from 'react';
import { motion } from 'framer-motion';
import { Package, Shirt, Image, Coffee, Mail } from 'lucide-react';

export const Shop: React.FC = () => {
  const comingSoonItems = [
    { icon: Shirt, name: 'Remeras y Buzos', desc: 'Diseños exclusivos de SODAROJA' },
    { icon: Coffee, name: 'Tazas y Termo', desc: 'Para escuchar el podcast con estilo' },
    { icon: Image, name: 'Postales y Posters', desc: 'Mapas ilustrados de episodios' },
    { icon: Package, name: 'Stickers', desc: 'Dejá tu marca por el mundo' },
  ];

  return (
    <section id="shop" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            Objetos Encontrados
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg">
            Pronto vas a poder llevar SODAROJA con vos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comingSoonItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8 hover:border-soda-accent hover:border-opacity-40 transition-all"
            >
              <item.icon size={40} className="text-soda-accent mb-4" />
              <h3 className="text-xl font-serif text-soda-glow mb-2">{item.name}</h3>
              <p className="text-soda-fog text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-soda-night bg-opacity-60 border border-soda-red border-opacity-30 rounded-sm p-12 text-center"
        >
          <div className="text-6xl mb-6">📦</div>
          <h3 className="text-2xl font-serif text-soda-glow mb-4">
            Avisame cuando abran la tienda
          </h3>
          <p className="text-soda-fog mb-6 max-w-2xl mx-auto">
            Dejanos tu email y te avisamos cuando lancemos la tienda oficial con merchandising exclusivo
          </p>
          
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 bg-soda-slate bg-opacity-40 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors"
            />
            <button className="px-6 py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all flex items-center gap-2">
              <Mail size={18} />
              <span>Avisar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
