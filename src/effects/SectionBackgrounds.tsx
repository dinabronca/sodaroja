import React from 'react';
import { motion } from 'framer-motion';

// ============================================================
// EFECTO 1: EL EQUIPO — Relámpagos lejanos + lluvia sutil
// ============================================================
export const LightningFlickers: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 20}%`,
            top: `${10 + (i % 3) * 25}%`,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(138, 155, 196, 0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            opacity: [0, 0, 0, 0.6, 0, 0.3, 0, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            delay: i * 4,
            ease: "easeInOut"
          }}
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: '-5%',
            width: '1px',
            height: '15%',
            background: 'linear-gradient(to bottom, transparent, rgba(138, 155, 196, 0.04), transparent)',
          }}
          animate={{
            y: ['0%', '700%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// ============================================================
// EFECTO 2: EPISODIOS — Cenizas flotantes / Polvo de ciudad
// ============================================================
export const FloatingAsh: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(25)].map((_, i) => {
        const size = 1 + Math.random() * 2;
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 30;
        const colorVariant = i % 3;
        const color = colorVariant === 0
          ? 'rgba(196, 85, 85, 0.2)'
          : colorVariant === 1
            ? 'rgba(212, 197, 176, 0.15)'
            : 'rgba(138, 155, 196, 0.12)';
        return (
          <motion.div
            key={`ash-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${startX}%`,
              bottom: '-2%',
              width: `${size}px`,
              height: `${size}px`,
              background: color,
            }}
            animate={{
              y: [0, -(500 + Math.random() * 500)],
              x: [0, drift, drift * 0.5],
              opacity: [0, 0.5, 0.3, 0],
              rotate: [0, 180 + Math.random() * 180],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: "linear"
            }}
          />
        );
      })}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(10, 14, 26, 0.3), transparent)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// ============================================================
// EFECTO 3: SHOP — Interferencia de señal / Estática vintage
// ============================================================
export const SignalInterference: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`band-${i}`}
          className="absolute left-0 right-0"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(196, 85, 85, 0.04) 20%, rgba(138, 155, 196, 0.03) 50%, rgba(196, 85, 85, 0.04) 80%, transparent 100%)',
            top: `${15 + i * 18}%`,
          }}
          animate={{
            y: [0, 80, -40, 60, 0],
            opacity: [0.2, 0.5, 0.1, 0.4, 0.2],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`glitch-${i}`}
          className="absolute left-0 right-0"
          style={{
            height: `${2 + Math.random() * 4}px`,
            background: 'rgba(196, 85, 85, 0.02)',
            top: `${30 + i * 20}%`,
          }}
          animate={{
            x: [0, 5, -3, 0],
            opacity: [0, 0.3, 0, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 6 + i * 4,
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196, 85, 85, 0.015) 0%, transparent 60%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
