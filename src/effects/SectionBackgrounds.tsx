import React from 'react';
import { motion } from 'framer-motion';

// ============================================================
// EL EQUIPO — Tormenta eléctrica distante + lluvia diagonal
// ============================================================
export const LightningFlickers: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Flashes de relámpago */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`flash-${i}`}
        className="absolute"
        style={{ left: `${10 + i * 22}%`, top: `${5 + (i % 3) * 20}%`, width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.04) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ opacity: [0, 0, 0, 0.8, 0, 0.4, 0, 0, 0] }}
        transition={{ duration: 7 + i * 3, repeat: Infinity, delay: i * 5, ease: "easeInOut" }}
      />
    ))}
    {/* Lluvia diagonal */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`rain-${i}`}
        className="absolute"
        style={{ left: `${Math.random() * 120 - 10}%`, top: '-10%', width: '1px', height: `${40 + Math.random() * 60}px`, background: 'linear-gradient(to bottom, transparent, rgba(138, 155, 196, 0.06), transparent)', transform: 'rotate(15deg)' }}
        animate={{ y: ['0%', '1200%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 6, ease: "linear" }}
      />
    ))}
    {/* Neblina baja */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-48"
      style={{ background: 'linear-gradient(to top, rgba(10, 14, 26, 0.4), transparent)' }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ============================================================
// EPISODIOS — Cenizas ascendentes + humo lateral
// ============================================================
export const FloatingAsh: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Cenizas que suben */}
    {[...Array(30)].map((_, i) => {
      const size = 1 + Math.random() * 2.5;
      const colors = ['rgba(196, 85, 85, 0.18)', 'rgba(212, 197, 176, 0.12)', 'rgba(138, 155, 196, 0.1)', 'rgba(255, 200, 100, 0.08)'];
      return (
        <motion.div
          key={`ash-${i}`}
          className="absolute rounded-full"
          style={{ left: `${Math.random() * 100}%`, bottom: '-2%', width: `${size}px`, height: `${size}px`, background: colors[i % 4] }}
          animate={{ y: [0, -(400 + Math.random() * 600)], x: [0, (Math.random() - 0.5) * 60], opacity: [0, 0.6, 0.3, 0], rotate: [0, 360] }}
          transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 15, ease: "linear" }}
        />
      );
    })}
    {/* Humo lateral */}
    <motion.div
      className="absolute top-1/3 -left-20 w-96 h-64"
      style={{ background: 'radial-gradient(ellipse, rgba(138, 155, 196, 0.03) 0%, transparent 70%)', filter: 'blur(30px)' }}
      animate={{ x: [0, 200, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ============================================================
// SHOP — Interferencia de señal vintage + scan lines
// ============================================================
export const SignalInterference: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Bandas horizontales que se mueven */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`band-${i}`}
        className="absolute left-0 right-0"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196, 85, 85, 0.05), rgba(138, 155, 196, 0.03), transparent)', top: `${10 + i * 16}%` }}
        animate={{ y: [0, 100, -50, 80, 0], opacity: [0.2, 0.6, 0.1, 0.4, 0.2] }}
        transition={{ duration: 10 + i * 3, repeat: Infinity, delay: i * 2, ease: "easeInOut" }}
      />
    ))}
    {/* Glitch flashes */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`glitch-${i}`}
        className="absolute left-0 right-0"
        style={{ height: '3px', background: 'rgba(196, 85, 85, 0.03)', top: `${25 + i * 25}%` }}
        animate={{ x: [0, 8, -5, 0], opacity: [0, 0.4, 0, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 + i * 3 }}
      />
    ))}
    {/* Vignette rojo sutil */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(196, 85, 85, 0.02) 100%)' }} />
  </div>
);

// ============================================================
// CONTACTO — Ondas de radio expandiéndose
// ============================================================
export const RadioWaves: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`wave-${i}`}
        className="absolute rounded-full border border-soda-accent"
        style={{ left: '50%', top: '30%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px' }}
        animate={{ scale: [0.5, 8 + i * 2], opacity: [0.15, 0] }}
        transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
      />
    ))}
    {/* Ruido de fondo sutil */}
    <motion.div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(138, 155, 196, 0.02) 0%, transparent 60%)' }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
  </div>
);
