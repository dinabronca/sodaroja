import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Luz volumétrica de fondo */}
      <div className="light-rays" />
      
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-soda-deep via-soda-night to-soda-deep"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Logo animado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-12"
        >
          <div className="relative inline-block">
            {/* SVG del sifón de soda */}
            <svg
              width="200"
              height="300"
              viewBox="0 0 200 300"
              className="mx-auto mb-8 filter drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 40px rgba(139, 58, 58, 0.3))' }}
            >
              {/* Botella */}
              <path
                d="M 70 50 L 70 200 Q 70 240 100 240 Q 130 240 130 200 L 130 50 Z"
                fill="rgba(139, 58, 58, 0.6)"
                stroke="rgba(212, 197, 176, 0.8)"
                strokeWidth="2"
              />
              
              {/* Cuello */}
              <rect
                x="85"
                y="30"
                width="30"
                height="20"
                fill="rgba(139, 58, 58, 0.7)"
                stroke="rgba(212, 197, 176, 0.8)"
                strokeWidth="2"
              />
              
              {/* Tapa/Sifón */}
              <circle
                cx="100"
                cy="25"
                r="15"
                fill="rgba(107, 122, 158, 0.6)"
                stroke="rgba(212, 197, 176, 0.8)"
                strokeWidth="2"
              />
              
              {/* Tubo del sifón */}
              <rect
                x="97"
                y="10"
                width="6"
                height="15"
                fill="rgba(212, 197, 176, 0.6)"
                stroke="rgba(212, 197, 176, 0.8)"
                strokeWidth="1"
              />
              
              {/* Brillo en la botella */}
              <ellipse
                cx="90"
                cy="100"
                rx="15"
                ry="40"
                fill="rgba(212, 197, 176, 0.2)"
                style={{ filter: 'blur(8px)' }}
              />
              
              {/* Burbujas */}
              <motion.circle
                cx="100"
                cy="180"
                r="4"
                fill="rgba(212, 197, 176, 0.5)"
                animate={{ y: [0, -150], opacity: [1, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.circle
                cx="90"
                cy="200"
                r="3"
                fill="rgba(212, 197, 176, 0.4)"
                animate={{ y: [0, -180], opacity: [1, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.5 }}
              />
              <motion.circle
                cx="110"
                cy="190"
                r="3"
                fill="rgba(212, 197, 176, 0.4)"
                animate={{ y: [0, -170], opacity: [1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8, delay: 1 }}
              />
            </svg>
            
            {/* Resplandor alrededor del logo */}
            <div className="absolute inset-0 bg-soda-red rounded-full opacity-20 blur-3xl animate-pulse-slow" />
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-7xl md:text-8xl font-serif font-light tracking-wider text-soda-glow mb-6"
            style={{ textShadow: '0 0 30px rgba(212, 197, 176, 0.3)' }}
          >
            SODAROJA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-soda-lamp text-xl md:text-2xl font-light tracking-wide mb-4"
          >
            un podcast narrativo
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
            className="text-soda-fog text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Historias reales de ciudades lejanas.
            <br />
            Cada episodio es un viaje nocturno que no olvidarás.
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

      {/* Ondas de frecuencia decorativas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-px bg-soda-accent opacity-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{ bottom: `${i * 8}px` }}
          />
        ))}
      </div>
    </section>
  );
};
