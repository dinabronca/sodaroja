import React from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';

export const Hero: React.FC = () => {
  const content = getContent();
  const { hero, brand } = content;
  const heroLogo = brand?.heroLogoUrl;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soda-deep via-soda-night to-soda-deep" />

      {/* Subtle ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: '60%', height: '60%', left: '20%', top: '20%', background: 'radial-gradient(ellipse, rgba(196,85,85,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center justify-center">

        {/* Brand logotipo or hero image or SVG fallback */}
        {hero.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative inline-block mb-10 max-w-md mx-auto"
          >
            <motion.div
              className="absolute -inset-6 rounded-sm"
              style={{ background: 'radial-gradient(ellipse, rgba(196,85,85,0.08) 0%, transparent 70%)' }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img src={hero.imageUrl} alt={hero.title || 'sodaroja'} className="relative z-10 w-full rounded-sm shadow-2xl" style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
          </motion.div>
        ) : heroLogo ? (
          /* Logotipo brand — the main brand display */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="relative inline-block mb-12"
          >
            <motion.div
              className="absolute -inset-12"
              style={{ background: 'radial-gradient(ellipse, rgba(196,85,85,0.05) 0%, transparent 65%)' }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img src={heroLogo} alt="sodaroja" className="relative z-10 h-20 sm:h-28 md:h-36 mx-auto object-contain" style={{ filter: 'brightness(1.1)' }} />
          </motion.div>
        ) : (
          /* Fallback: SVG carita */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative inline-block mb-10"
          >
            <motion.div
              className="absolute -inset-8"
              style={{ background: 'radial-gradient(circle, rgba(196,85,85,0.07) 0%, transparent 60%)' }}
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.97, 1.05, 0.97] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto relative">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(196, 85, 85, 0.08)" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="20" fill="rgba(196, 85, 85, 0.12)" />
                <circle cx="54" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <circle cx="66" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <path d="M 53 65 Q 60 70 67 65" stroke="rgba(212, 197, 176, 0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        )}

        {hero.title && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-7xl font-serif font-light tracking-wider text-soda-glow mb-6"
          >
            {hero.title}
          </motion.h1>
        )}

        {hero.subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-soda-fog/60 text-base md:text-lg font-light tracking-wide mb-4"
          >
            {hero.subtitle}
          </motion.div>
        )}

        {(hero.title || hero.subtitle) && hero.description && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="w-[100px] h-px bg-soda-red/30 mx-auto mb-8"
          />
        )}

        {hero.description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-soda-fog/50 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed whitespace-pre-line"
          >
            {hero.description}
          </motion.p>
        )}
      </div>
    </section>
  );
};
