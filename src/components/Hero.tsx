import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const content = getContent();
  const { hero } = content;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ondas sonoras de fondo */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-soda-red opacity-10 rounded-full"
          style={{
            width: `${100 + i * 20}%`,
            height: `${100 + i * 20}%`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      
      <div className="light-rays" />
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-soda-deep via-soda-night to-soda-deep"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Partículas rojas flotantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-2 h-2 bg-soda-red rounded-full opacity-40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-12"
        >
          {/* Dial de frecuencia — reemplaza el sifón */}
          <div className="relative inline-block mb-10">
            {/* Círculo exterior pulsante */}
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 mx-auto relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Arco exterior */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(196, 85, 85, 0.15)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(196, 85, 85, 0.1)" strokeWidth="0.3" />
                {/* Marcas de frecuencia */}
                {[...Array(36)].map((_, i) => {
                  const angle = (i * 10) * Math.PI / 180;
                  const len = i % 3 === 0 ? 4 : 2;
                  const x1 = 50 + 44 * Math.cos(angle);
                  const y1 = 50 + 44 * Math.sin(angle);
                  const x2 = 50 + (44 - len) * Math.cos(angle);
                  const y2 = 50 + (44 - len) * Math.sin(angle);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={i % 3 === 0 ? "rgba(196, 85, 85, 0.4)" : "rgba(138, 155, 196, 0.2)"}
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
            </motion.div>
            
            {/* Punto central rojo pulsante */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 bg-soda-red rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: '0 0 30px rgba(196, 85, 85, 0.6), 0 0 60px rgba(196, 85, 85, 0.3)' }}
              />
            </div>

            {/* Onda de señal expandiéndose */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="w-4 h-4 border border-soda-red rounded-full"
                  animate={{ scale: [1, 12], opacity: [0.4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
                />
              </motion.div>
            ))}

            {/* Resplandor */}
            <div className="absolute inset-0 bg-soda-red rounded-full opacity-10 blur-3xl animate-pulse-slow" />
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-7xl md:text-8xl font-serif font-light tracking-wider text-soda-glow mb-6"
            style={{ textShadow: '0 0 30px rgba(212, 197, 176, 0.3)' }}
          >
            {hero.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-soda-lamp text-xl md:text-2xl font-light tracking-wide mb-4"
          >
            {hero.subtitle}
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-soda-lamp to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-soda-fog text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed whitespace-pre-line"
          >
            {hero.description}
          </motion.p>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-soda-lamp to-transparent"
          />
        </motion.div>
      </div>

      {/* Ondas de frecuencia en el fondo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-px bg-soda-accent opacity-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            style={{ bottom: `${i * 8}px` }}
          />
        ))}
      </div>
    </section>
  );
};
