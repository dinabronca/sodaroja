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

            <p className="text-soda-fog text-base md:text-lg leading-relaxed font-light mt-6">
              Cada episodio tiene una duración de entre 60 y 80 minutos, perfectos para acompañar 
              un viaje, una noche de insomnio o ese momento en que necesitás escapar sin moverte de lugar.
            </p>
          </div>

          {/* Estructura del programa */}
          <div className="mt-12 mb-8">
            <h3 className="text-3xl font-serif text-soda-glow mb-8 text-center">Estructura de cada episodio</h3>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-serif text-soda-red mt-1">01</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-soda-glow mb-3">Apertura</h3>
                  <p className="text-soda-fog text-sm leading-relaxed font-light">
                    Comenzamos con una introducción atmosférica que te sitúa en la ciudad. 
                    Sonidos ambiente, contexto histórico y cultural. Te preparamos para el viaje.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-serif text-soda-red mt-1">02</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-soda-glow mb-3">Ventana Roja</h3>
                  <p className="text-soda-fog text-sm leading-relaxed font-light mb-3">
                    El segmento principal. Aquí desarrollamos la historia central del episodio: 
                    un crimen real, un hecho histórico olvidado, un personaje único o un misterio urbano.
                  </p>
                  <p className="text-soda-fog text-xs italic">
                    Duración: 35-45 minutos. Investigación profunda, narrativa cuidada, respeto por las víctimas.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-serif text-soda-red mt-1">03</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-soda-glow mb-3">Intermedio Sonoro</h3>
                  <p className="text-soda-fog text-sm leading-relaxed font-light">
                    Un respiro. Música ambiente, sonidos de la ciudad, un momento para procesar lo escuchado.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-serif text-soda-red mt-1">04</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-soda-glow mb-3">Prismas</h3>
                  <p className="text-soda-fog text-sm leading-relaxed font-light mb-3">
                    Historias complementarias de la misma ciudad. Curiosidades, anécdotas, 
                    datos que no encontrás en guías turísticas. Lo que te hace entender mejor 
                    el lugar y su gente.
                  </p>
                  <p className="text-soda-fog text-xs italic">
                    Duración: 15-25 minutos. Narrativa más ligera pero igualmente cuidada.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-serif text-soda-red mt-1">05</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-soda-glow mb-3">Cierre</h3>
                  <p className="text-soda-fog text-sm leading-relaxed font-light">
                    Reflexión final, despedida de la ciudad, adelanto del próximo destino. 
                    Te dejamos con ganas de más.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Temas que tocamos */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif text-soda-glow mb-6 text-center">Temas que exploramos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Crímenes reales',
                'Historia urbana',
                'Mitos y leyendas',
                'Personajes olvidados',
                'Arquitectura secreta',
                'Gastronomía local',
                'Música y cultura',
                'Sucesos inexplicables'
              ].map((tema, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="px-4 py-3 bg-soda-night bg-opacity-60 border border-soda-accent border-opacity-30 rounded-sm text-soda-accent text-sm text-center"
                >
                  {tema}
                </motion.div>
              ))}
            </div>
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
