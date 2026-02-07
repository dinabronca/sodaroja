import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const content = getContent();
  const { hero } = content;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  useEffect(() => {
    if (isMobile) return; // Skip parallax on mobile
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waveCount = isMobile ? 2 : 5;
  const particleCount = isMobile ? 4 : 15;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ondas sonoras de fondo */}
      {[...Array(waveCount)].map((_, i) => (
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
      {[...Array(particleCount)].map((_, i) => (
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
          {/* Imagen principal O dial de frecuencia */}
          {hero.imageUrl ? (
            <div className="relative inline-block mb-10 max-w-md mx-auto">
              {/* Efecto 1: Shimmer — rayo de luz que cruza */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none rounded-sm overflow-hidden"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)', backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
              {/* Efecto 2: Glow pulsante alrededor */}
              <motion.div
                className="absolute -inset-4 z-0 rounded-sm"
                style={{ background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.15) 0%, transparent 70%)' }}
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Efecto 3: Partículas flotando desde la imagen */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`img-particle-${i}`}
                  className="absolute w-1 h-1 bg-soda-red rounded-full z-30 pointer-events-none"
                  style={{ left: `${15 + Math.random() * 70}%`, bottom: '10%' }}
                  animate={{ y: [0, -(80 + Math.random() * 120)], opacity: [0, 0.6, 0], x: [0, (Math.random() - 0.5) * 40] }}
                  transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
                />
              ))}
              <img src={hero.imageUrl} alt={hero.title} className="relative z-10 w-full rounded-sm shadow-2xl" style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
            </div>
          ) : (
            <div className="relative inline-block mb-10">
            {/* Logo SVG grande con animacion */}
            <motion.div
              className="w-40 h-40 md:w-48 md:h-48 mx-auto relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Circulos de fondo */}
                <motion.circle cx="60" cy="60" r="55" fill="none" stroke="rgba(196, 85, 85, 0.08)" strokeWidth="0.5" animate={{ r: [55, 57, 55] }} transition={{ duration: 4, repeat: Infinity }} />
                <motion.circle cx="60" cy="60" r="48" fill="none" stroke="rgba(138, 155, 196, 0.06)" strokeWidth="0.3" animate={{ r: [48, 50, 48] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
                {/* Marcas de frecuencia */}
                {[...Array(48)].map((_, i) => {
                  const angle = (i * 7.5) * Math.PI / 180;
                  const isMajor = i % 4 === 0;
                  const len = isMajor ? 5 : 2;
                  const x1 = 60 + 52 * Math.cos(angle);
                  const y1 = 60 + 52 * Math.sin(angle);
                  const x2 = 60 + (52 - len) * Math.cos(angle);
                  const y2 = 60 + (52 - len) * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isMajor ? "rgba(196, 85, 85, 0.3)" : "rgba(138, 155, 196, 0.12)"} strokeWidth="0.5" />;
                })}
                {/* Carita central */}
                <circle cx="60" cy="60" r="20" fill="rgba(196, 85, 85, 0.12)" />
                <circle cx="54" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <circle cx="66" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <path d="M 53 65 Q 60 70 67 65" stroke="rgba(212, 197, 176, 0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Ondas de señal */}
                <path d="M 38 50 Q 35 60 38 70" stroke="rgba(196, 85, 85, 0.2)" strokeWidth="1.5" fill="none" />
                <path d="M 82 50 Q 85 60 82 70" stroke="rgba(196, 85, 85, 0.2)" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>

            {/* Ondas expandiendose */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="w-6 h-6 border border-soda-red rounded-full"
                  animate={{ scale: [1, 10], opacity: [0.3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
                />
              </motion.div>
            ))}

            {/* Glow */}
            <div className="absolute inset-0 bg-soda-red rounded-full opacity-5 blur-3xl animate-pulse-slow" />
          </div>
          )}

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
