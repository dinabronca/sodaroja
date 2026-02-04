import React from 'react';
import { motion } from 'framer-motion';

export const QueEsEsto: React.FC = () => {
  return (
    <section id="que-es-esto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            ¿Qué es SODAROJA?
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto" />
        </motion.div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-soda-lamp text-lg md:text-xl leading-relaxed font-light">
              SODAROJA es un podcast narrativo argentino que viaja por las ciudades del mundo 
              contando historias reales con sensibilidad, calma y profundidad.
            </p>
            
            <p className="text-soda-fog text-base md:text-lg leading-relaxed font-light mt-6">
              No es periodismo tradicional, no es documental rígido y no es entretenimiento rápido. 
              Se siente como una charla nocturna entre amigos donde alguien cuenta historias reales 
              que nunca olvidarás.
            </p>
          </div>

          {/* Estructura del programa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <h3 className="text-2xl font-serif text-soda-glow mb-4">Ventana Roja</h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">
                El segmento principal. Historias profundas que investigan crímenes reales, 
                hechos históricos olvidados, personajes únicos y misterios urbanos de cada ciudad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <h3 className="text-2xl font-serif text-soda-glow mb-4">Prismas</h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">
                Historias complementarias, curiosidades culturales y detalles que te hacen 
                entender mejor la ciudad. Lo que no podés encontrar en guías turísticas.
              </p>
            </motion.div>
          </div>

          {/* Tono del programa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-serif text-soda-glow mb-6">El tono</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['misterio suave', 'cercanía emocional', 'humor inteligente', 'sensibilidad estética', 'curiosidad cultural'].map((item, i) => (
                <span
                  key={i}
                  className="px-6 py-2 bg-soda-night bg-opacity-60 border border-soda-accent border-opacity-30 rounded-sm text-soda-accent text-sm tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Experiencia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center border-t border-soda-mist border-opacity-20 pt-12"
          >
            <p className="text-soda-lamp text-lg italic font-light">
              "Es voz baja. Noche. Lluvia. Café. Ciudad lejana."
            </p>
            <p className="text-soda-fog text-sm mt-4">
              El oyente debe sentir que viajó sin moverse, que hizo nuevas amistades 
              y encontró compañía en momentos de soledad.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
