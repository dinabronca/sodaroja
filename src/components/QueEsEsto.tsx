import React from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';

const colorMap: Record<string, { border: string; text: string }> = {
  red: { border: 'border-soda-red', text: 'text-soda-red' },
  accent: { border: 'border-soda-accent', text: 'text-soda-accent' },
  lamp: { border: 'border-soda-lamp', text: 'text-soda-lamp' },
  glow: { border: 'border-soda-glow', text: 'text-soda-glow' },
};

export const QueEsEsto: React.FC = () => {
  const content = getContent();
  const { queEsEsto } = content;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  const smokeCount = isMobile ? 1 : 4;
  const bokehCount = isMobile ? 3 : 10;
  const lineCount = isMobile ? 0 : 20;

  return (
    <section id="que-es-esto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {/* ===== FONDO ANTENAS — paisaje cyberpunk traslúcido ===== */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Imagen base con tratamiento */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/antenas-bg.jpg)',
            filter: 'saturate(0.3) brightness(0.15) contrast(1.3) sepia(0.4) hue-rotate(200deg)',
            opacity: 0.35,
            mixBlendMode: 'screen',
          }}
        />
        {/* Overlay gradiente para fundirlo con la sección */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.7) 0%, transparent 25%, transparent 75%, rgba(10,14,26,0.8) 100%)' }} />
        {/* Tinte cyberpunk — rojo/azul */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(196,85,85,0.06) 0%, transparent 50%, rgba(138,155,196,0.05) 100%)' }} />

        {/* Lucecitas de antena parpadeando */}
        {!isMobile && [...Array(12)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${8 + (i / 12) * 84}%`,
              top: `${25 + (i % 3) * 18 + Math.random() * 8}%`,
              width: `${4 + Math.random() * 3}px`,
              height: `${4 + Math.random() * 3}px`,
              background: i % 3 === 0 ? '#c45555' : i % 3 === 1 ? '#ff6b6b' : '#c45555',
              boxShadow: `0 0 ${8 + Math.random() * 12}px ${i % 2 === 0 ? 'rgba(196,85,85,0.6)' : 'rgba(255,107,107,0.4)'}`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
        {isMobile && [...Array(5)].map((_, i) => (
          <motion.div
            key={`light-m-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + (i % 2) * 20}%`,
              width: '4px', height: '4px',
              background: '#c45555',
              boxShadow: '0 0 10px rgba(196,85,85,0.5)',
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      {/* Humo / niebla flotando */}
      {[...Array(smokeCount)].map((_, i) => (
        <motion.div
          key={`smoke-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${-20 + i * 30}%`,
            top: `${20 + i * 15}%`,
            width: '50%',
            height: '200px',
            background: `radial-gradient(ellipse, rgba(${i % 2 === 0 ? '196, 85, 85' : '138, 155, 196'}, 0.03) 0%, transparent 70%)`,
            filter: 'blur(50px)',
            zIndex: 0,
          }}
          animate={{
            x: [0, 60 + i * 20, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
        />
      ))}

      {/* Bokeh sutil de fondo */}
      {[...Array(bokehCount)].map((_, i) => (
        <motion.div
          key={`qbk-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${80 + Math.random() * 120}px`,
            height: `${80 + Math.random() * 120}px`,
            background: i % 3 === 0
              ? 'radial-gradient(circle, rgba(196, 85, 85, 0.04) 0%, transparent 70%)'
              : i % 3 === 1
                ? 'radial-gradient(circle, rgba(138, 155, 196, 0.03) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(212, 197, 176, 0.025) 0%, transparent 70%)',
            filter: 'blur(25px)',
            zIndex: 0,
          }}
          animate={{
            x: [(Math.random()-0.5)*30, (Math.random()-0.5)*30],
            y: [(Math.random()-0.5)*20, (Math.random()-0.5)*20],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 5 }}
        />
      ))}

      {/* Efectos de fondo — lineas verticales sutiles */}
      {lineCount > 0 && <div className="absolute inset-0 opacity-10">
        {[...Array(lineCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-soda-accent to-transparent"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">{queEsEsto.title}</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg font-light max-w-4xl mx-auto leading-relaxed">{queEsEsto.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-serif text-soda-glow mb-4">{queEsEsto.structureTitle}</h3>
          <p className="text-soda-fog text-sm">{queEsEsto.structureSubtitle}</p>
        </motion.div>

        <div className="space-y-6">
          {queEsEsto.estructura.map((item, index) => {
            const colors = colorMap[item.color] || colorMap.accent;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`relative bg-soda-slate bg-opacity-40 backdrop-blur-sm rounded-sm p-8 border transition-all duration-300 hover:scale-[1.02] group ${
                  item.destacado
                    ? 'border-soda-red border-opacity-40 hover:border-opacity-60 hover:shadow-lg hover:shadow-soda-red/10'
                    : 'border-soda-mist border-opacity-20 hover:border-soda-accent hover:border-opacity-40'
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full ${item.destacado ? 'bg-soda-red' : 'bg-soda-accent'}`}
                      style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
                      animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>

                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-sm border-2 flex items-center justify-center font-serif text-2xl ${colors.border} ${colors.text}`}>
                    {item.numero}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <h4 className="text-2xl font-serif text-soda-glow">{item.titulo}</h4>
                        {item.subtitulo && (
                          <p className={`text-sm ${colors.text}`}>{item.subtitulo}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-soda-lamp text-base leading-relaxed font-light mb-3">{item.descripcion}</p>
                    <p className="text-soda-fog text-sm leading-relaxed font-light italic">{item.detalles}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-serif text-soda-glow mb-8 text-center">Temas que exploramos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {queEsEsto.temas.map((tema, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={undefined}
                className="px-4 py-3 bg-soda-night bg-opacity-60 border border-soda-accent border-opacity-30 rounded-sm text-soda-accent text-sm text-center cursor-default"
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
