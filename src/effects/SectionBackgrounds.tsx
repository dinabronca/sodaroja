import React from 'react';
import { motion } from 'framer-motion';

// Wrapper que se pone DENTRO de cualquier section/div como primer hijo
// Siempre usa absolute inset-0 z-0 pointer-events-none overflow-hidden

// ============================================================
// EL EQUIPO — Tormenta eléctrica + lluvia diagonal
// ============================================================
export const LightningFlickers: React.FC = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <motion.div key={`flash-${i}`} className="absolute pointer-events-none" style={{ left: `${10 + i * 22}%`, top: `${5 + (i % 3) * 20}%`, width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.06) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} animate={{ opacity: [0, 0, 0, 1, 0, 0.5, 0, 0, 0] }} transition={{ duration: 7 + i * 3, repeat: Infinity, delay: i * 5 }} />
    ))}
    {[...Array(25)].map((_, i) => (
      <motion.div key={`rain-${i}`} className="absolute pointer-events-none" style={{ left: `${Math.random() * 120 - 10}%`, top: '-5%', width: '1px', height: `${40 + Math.random() * 60}px`, background: 'linear-gradient(to bottom, transparent, rgba(138, 155, 196, 0.08), transparent)', transform: 'rotate(15deg)', zIndex: 0 }} animate={{ y: ['0vh', '120vh'], opacity: [0, 0.5, 0] }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }} />
    ))}
    <motion.div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10, 14, 26, 0.5), transparent)', zIndex: 0 }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 6, repeat: Infinity }} />
  </>
);

// ============================================================
// EPISODIOS — Épica: ondas de sonido + pulso de frecuencia + líneas de señal
// ============================================================
export const EpicSoundWaves: React.FC = () => (
  <>
    {/* Ondas de sonido que se expanden desde el centro */}
    {[...Array(5)].map((_, i) => (
      <motion.div key={`sw-${i}`} className="absolute pointer-events-none rounded-full" style={{ left: '50%', top: '20%', marginLeft: '-50px', marginTop: '-50px', width: '100px', height: '100px', border: '1px solid rgba(196, 85, 85, 0.08)', zIndex: 0 }} animate={{ scale: [0.5, 15], opacity: [0.2, 0] }} transition={{ duration: 10 + i * 3, repeat: Infinity, delay: i * 2.5, ease: "easeOut" }} />
    ))}
    {/* Líneas de frecuencia horizontales que se mueven como un ecualizador */}
    {[...Array(12)].map((_, i) => (
      <motion.div key={`eq-${i}`} className="absolute pointer-events-none" style={{ left: `${5 + i * 8}%`, bottom: '10%', width: '2px', background: `linear-gradient(to top, rgba(196, 85, 85, ${0.04 + (i % 3) * 0.02}), transparent)`, zIndex: 0 }} animate={{ height: [`${20 + Math.random() * 30}px`, `${60 + Math.random() * 80}px`, `${20 + Math.random() * 30}px`] }} transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
    ))}
    {/* Cenizas que suben */}
    {[...Array(20)].map((_, i) => {
      const size = 1 + Math.random() * 2;
      return (
        <motion.div key={`ash-${i}`} className="absolute rounded-full pointer-events-none" style={{ left: `${Math.random() * 100}%`, bottom: '-2%', width: `${size}px`, height: `${size}px`, background: i % 2 === 0 ? 'rgba(196, 85, 85, 0.15)' : 'rgba(212, 197, 176, 0.1)', zIndex: 0 }} animate={{ y: [0, -(300 + Math.random() * 500)], x: [0, (Math.random() - 0.5) * 40], opacity: [0, 0.5, 0], rotate: [0, 360] }} transition={{ duration: 7 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }} />
      );
    })}
    {/* Pulso de luz rojo */}
    <motion.div className="absolute pointer-events-none" style={{ left: '50%', top: '40%', width: '600px', height: '600px', marginLeft: '-300px', marginTop: '-300px', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.03) 0%, transparent 60%)', zIndex: 0 }} animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 5, repeat: Infinity }} />
  </>
);

// ============================================================
// SHOP — En construcción: rayas de precaución + engranajes
// ============================================================
export const ConstructionEffects: React.FC = () => (
  <>
    {/* Rayas de precaución diagonales que cruzan */}
    {[...Array(6)].map((_, i) => (
      <motion.div key={`stripe-${i}`} className="absolute pointer-events-none" style={{ left: '-10%', top: `${10 + i * 16}%`, width: '120%', height: '1px', background: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(212, 197, 176, 0.04) 20px, rgba(212, 197, 176, 0.04) 40px)`, transform: 'rotate(-5deg)', zIndex: 0 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 8 + i * 2, repeat: Infinity }} />
    ))}
    {/* Engranajes girando lento */}
    {[...Array(3)].map((_, i) => (
      <motion.div key={`gear-${i}`} className="absolute pointer-events-none" style={{ right: `${5 + i * 30}%`, top: `${15 + i * 25}%`, width: '60px', height: '60px', border: '1px solid rgba(196, 85, 85, 0.04)', borderRadius: '50%', zIndex: 0 }} animate={{ rotate: [0, 360] }} transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}>
        {/* Dientes */}
        {[...Array(8)].map((_, j) => (
          <div key={j} className="absolute" style={{ left: '50%', top: '-4px', width: '2px', height: '8px', background: 'rgba(196, 85, 85, 0.04)', transformOrigin: '50% 34px', transform: `rotate(${j * 45}deg)` }} />
        ))}
      </motion.div>
    ))}
    {/* Chispas de soldadura */}
    {[...Array(8)].map((_, i) => (
      <motion.div key={`spark-${i}`} className="absolute rounded-full pointer-events-none" style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%`, width: '2px', height: '2px', background: 'rgba(255, 200, 100, 0.3)', zIndex: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 + Math.random() * 8, delay: Math.random() * 5 }} />
    ))}
  </>
);

// ============================================================
// CONTACTO — Sobres que flotan + ondas de señal
// ============================================================
export const MailEffects: React.FC = () => (
  <>
    {/* Sobres minimalistas flotando */}
    {[...Array(6)].map((_, i) => (
      <motion.div key={`env-${i}`} className="absolute pointer-events-none" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, zIndex: 0 }}>
        <motion.svg width="24" height="18" viewBox="0 0 24 18" style={{ opacity: 0.06 }} animate={{ y: [0, -15, 0], rotate: [0, 5, -3, 0] }} transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 8 }}>
          <rect x="0" y="0" width="24" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1" className="text-soda-accent" />
          <path d="M 0 0 L 12 10 L 24 0" fill="none" stroke="currentColor" strokeWidth="1" className="text-soda-accent" />
        </motion.svg>
      </motion.div>
    ))}
    {/* Ondas de señal desde el centro */}
    {[...Array(4)].map((_, i) => (
      <motion.div key={`cw-${i}`} className="absolute rounded-full pointer-events-none" style={{ left: '50%', top: '30%', marginLeft: '-40px', marginTop: '-40px', width: '80px', height: '80px', border: '1px solid rgba(138, 155, 196, 0.05)', zIndex: 0 }} animate={{ scale: [0.5, 10], opacity: [0.15, 0] }} transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2, ease: "easeOut" }} />
    ))}
    {/* Líneas de texto simuladas */}
    {[...Array(4)].map((_, i) => (
      <motion.div key={`txt-${i}`} className="absolute pointer-events-none" style={{ right: '8%', top: `${20 + i * 8}%`, width: `${40 + Math.random() * 80}px`, height: '1px', background: 'rgba(212, 197, 176, 0.03)', zIndex: 0 }} animate={{ opacity: [0, 0.5, 0], width: [`${40 + Math.random() * 30}px`, `${80 + Math.random() * 50}px`, `${40 + Math.random() * 30}px`] }} transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5 }} />
    ))}
  </>
);
