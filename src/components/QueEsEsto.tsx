import React from 'react';
import { motion } from 'framer-motion';

export const QueEsEsto: React.FC = () => {
  const estructura = [
    {
      numero: '0',
      emoji: '🎙️',
      titulo: 'Apertura Ritual',
      color: 'soda-accent',
      descripcion: 'No es locución radial ni algo impostado. Es una entrada suave, íntima, como si la charla ya hubiera empezado.',
      detalles: 'Generamos clima, hacemos sentir al oyente que entra a un espacio seguro y marcamos que comienza el viaje.',
    },
    {
      numero: '1',
      emoji: '🪟',
      titulo: 'Ventana Roja',
      subtitulo: '(Bloque de actualidad)',
      color: 'soda-red',
      descripcion: 'Este bloque aparece cuando hay algo que el mundo o Argentina están atravesando y no se puede ignorar.',
      detalles: 'Eventos culturales grandes (Lollapalooza, ComicCon), fenómenos globales, muertes relevantes, hechos históricos. No es noticiero. Es charla con mirada humana.',
      destacado: true,
    },
    {
      numero: '2',
      emoji: '🌍',
      titulo: 'Introducción a la Ciudad',
      color: 'soda-accent',
      descripcion: 'Transición hacia la ciudad elegida. Atmósfera, contexto cultural, sensaciones del lugar.',
      detalles: 'Es abrir la puerta del viaje. Cómo se siente esa ciudad.',
    },
    {
      numero: '3-5',
      emoji: '🔺',
      titulo: 'Prismas',
      subtitulo: '(Historias de la ciudad)',
      color: 'soda-accent',
      descripcion: 'Dos o tres historias reales de esa ciudad. Crímenes, personajes ocultos, hechos históricos, mitos urbanos.',
      detalles: 'Narración con clima, sin morbo. Deben contrastar o complementarse: otra época, otra energía, otra mirada del lugar. El tercer prisma puede ser un invitado (charla, no entrevista).',
    },
    {
      numero: '6',
      emoji: '🕯️',
      titulo: 'Susurros del Culto',
      color: 'soda-accent',
      descripcion: 'Recomendaciones: película, serie, libro, disco, lugar, artista.',
      detalles: 'Siempre algo que encaje con la energía del episodio. Tono íntimo, como pasar un secreto.',
    },
    {
      numero: '7',
      emoji: '📍',
      titulo: 'Rastros del Culto',
      color: 'soda-accent',
      descripcion: 'Fotos que mandó la gente, dónde apareció un sticker, cómo llegó ahí.',
      detalles: 'Construye el mapa físico del culto.',
    },
    {
      numero: '8',
      emoji: '📜',
      titulo: 'Bitácora de Frecuencia Interna',
      color: 'soda-red',
      descripcion: 'Lectura de mails y mensajes. La parte más humana.',
      detalles: 'Qué sintieron, dónde escucharon, qué les pasó, si viajaron. Acá se fortalece la comunidad.',
      destacado: true,
    },
    {
      numero: '9',
      emoji: '🌙',
      titulo: 'Cierre Suave',
      color: 'soda-accent',
      descripcion: 'No es despedida radial. Es sensación de: seguimos acá, esto no termina, el viaje continúa.',
      detalles: 'Deja al oyente acompañado, no "cerrado".',
    },
  ];

  return (
    <section id="que-es-esto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-soda-accent to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Podcast de investigación narrativa. Episodios de 60-80 minutos sobre ciudades del mundo.
          </p>
        </motion.div>

        {/* Descripción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none mb-20"
        >
          <p className="text-soda-fog text-lg leading-relaxed font-light text-center max-w-3xl mx-auto">
            Historias reales de ciudades del mundo. Investigación profunda, narrativa cuidada y producción sonora envolvente.
          </p>
        </motion.div>

        {/* Título estructura */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-serif text-soda-glow mb-4">Estructura de cada episodio</h3>
          <p className="text-soda-fog text-sm">9 momentos que construyen el viaje</p>
        </motion.div>

        {/* Estructura de 9 puntos */}
        <div className="space-y-6">
          {estructura.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative bg-soda-slate bg-opacity-40 backdrop-blur-sm rounded-sm p-8 border transition-all duration-300 hover:scale-[1.02] group ${
                item.destacado 
                  ? 'border-soda-red border-opacity-40 hover:border-opacity-60 hover:shadow-lg hover:shadow-soda-red/10' 
                  : 'border-soda-mist border-opacity-20 hover:border-soda-accent hover:border-opacity-40'
              }`}
            >
              {/* Partículas en hover */}
              <div className="absolute inset-0 overflow-hidden rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${item.destacado ? 'bg-soda-red' : 'bg-soda-accent'}`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-start gap-6">
                {/* Número */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-sm border-2 flex items-center justify-center font-serif text-2xl ${
                  item.destacado ? 'border-soda-red text-soda-red' : 'border-soda-accent text-soda-accent'
                }`}>
                  {item.numero}
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <h4 className="text-2xl font-serif text-soda-glow">{item.titulo}</h4>
                      {item.subtitulo && (
                        <p className={`text-sm ${item.destacado ? 'text-soda-red' : 'text-soda-accent'}`}>
                          {item.subtitulo}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-soda-lamp text-base leading-relaxed font-light mb-3">
                    {item.descripcion}
                  </p>
                  
                  <p className="text-soda-fog text-sm leading-relaxed font-light italic">
                    {item.detalles}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sensación final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-soda-red/5 via-soda-accent/5 to-soda-red/5 rounded-sm blur-xl" />
          <div className="relative bg-soda-night bg-opacity-80 backdrop-blur-sm border border-soda-red border-opacity-30 rounded-sm p-12 text-center">
            <div className="text-6xl mb-6">✨</div>
            <h3 className="text-3xl font-serif text-soda-glow mb-6">Resultado</h3>
            <p className="text-soda-lamp text-xl mb-6 font-light">Formato completo que incluye:</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Actualidad', 'Viaje sonoro', 'Historia investigada', 'Comunidad', 'Cultura'].map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-soda-red bg-opacity-10 border border-soda-red border-opacity-40 rounded-sm text-soda-lamp font-light tracking-wide hover:bg-opacity-20 transition-all cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            
            <p className="text-soda-fog text-base italic font-light max-w-2xl mx-auto">
              Combinación de géneros que construye un ritual sonoro único.
            </p>
          </div>
        </motion.div>

        {/* Temas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-serif text-soda-glow mb-8 text-center">Temas que exploramos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Crímenes reales', 'Historia urbana', 'Mitos y leyendas', 'Personajes olvidados',
              'Arquitectura secreta', 'Gastronomía local', 'Música y cultura', 'Sucesos inexplicables',
              'Arte underground', 'Fenómenos paranormales', 'Subculturas urbanas', 'Tradiciones perdidas'
            ].map((tema, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(138, 155, 196, 0.6)' }}
                className="px-4 py-3 bg-soda-night bg-opacity-60 border border-soda-accent border-opacity-30 rounded-sm text-soda-accent text-sm text-center hover:bg-opacity-80 transition-all cursor-default"
              >
                {tema}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
