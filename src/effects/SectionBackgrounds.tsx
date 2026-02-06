import React from 'react';
import { motion } from 'framer-motion';

// ============================================================
// EL EQUIPO - Tormenta electrica + lluvia
// ============================================================
export const LightningFlickers: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {/* Flashes de relampago - MUY VISIBLES */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`flash-${i}`}
        className="absolute"
        style={{
          left: `${15 + i * 30}%`,
          top: `${10 + i * 15}%`,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.25) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0, 0, 0, 1, 0, 0.6, 0, 0, 0] }}
        transition={{ duration: 6 + i * 4, repeat: Infinity, delay: i * 3 }}
      />
    ))}
    {/* Lluvia diagonal - lineas visibles */}
    {[...Array(35)].map((_, i) => (
      <motion.div
        key={`rain-${i}`}
        className="absolute"
        style={{
          left: `${(i / 35) * 120 - 10}%`,
          top: '-5%',
          width: '1.5px',
          height: `${50 + Math.random() * 70}px`,
          background: 'linear-gradient(to bottom, transparent, rgba(138, 155, 196, 0.35), transparent)',
          transform: 'rotate(15deg)',
        }}
        animate={{ y: ['0vh', '110vh'] }}
        transition={{ duration: 1.8 + Math.random() * 1.5, repeat: Infinity, delay: Math.random() * 4, ease: 'linear' }}
      />
    ))}
    {/* Neblina baja */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-64"
      style={{ background: 'linear-gradient(to top, rgba(10, 14, 26, 0.7), transparent)' }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
  </div>
);

// ============================================================
// EPISODIOS - Ondas sonicas + ecualizador + cenizas
// ============================================================
export const EpicSoundWaves: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {/* Ondas sonicas grandes desde el centro */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`sw-${i}`}
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '25%',
          marginLeft: '-60px',
          marginTop: '-60px',
          width: '120px',
          height: '120px',
          border: '2px solid rgba(196, 85, 85, 0.25)',
        }}
        animate={{ scale: [0.5, 12], opacity: [0.4, 0] }}
        transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2, ease: 'easeOut' }}
      />
    ))}
    {/* Barras de ecualizador verticales */}
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={`eq-${i}`}
        className="absolute"
        style={{
          left: `${3 + i * 6}%`,
          bottom: '5%',
          width: '3px',
          borderRadius: '2px',
          background: i % 2 === 0
            ? 'linear-gradient(to top, rgba(196, 85, 85, 0.3), transparent)'
            : 'linear-gradient(to top, rgba(138, 155, 196, 0.2), transparent)',
        }}
        animate={{
          height: [`${15 + Math.random() * 25}px`, `${50 + Math.random() * 80}px`, `${15 + Math.random() * 25}px`],
        }}
        transition={{ duration: 1 + Math.random() * 1.5, repeat: Infinity, delay: Math.random() * 2 }}
      />
    ))}
    {/* Cenizas/particulas subiendo */}
    {[...Array(25)].map((_, i) => {
      const size = 2 + Math.random() * 3;
      return (
        <motion.div
          key={`ash-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-3%',
            width: `${size}px`,
            height: `${size}px`,
            background: i % 3 === 0
              ? 'rgba(196, 85, 85, 0.4)'
              : i % 3 === 1
                ? 'rgba(212, 197, 176, 0.3)'
                : 'rgba(138, 155, 196, 0.25)',
          }}
          animate={{
            y: [0, -(300 + Math.random() * 400)],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.7, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 8, ease: 'linear' }}
        />
      );
    })}
    {/* Pulso rojo grande */}
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '35%',
        width: '600px',
        height: '600px',
        marginLeft: '-300px',
        marginTop: '-300px',
        background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.08) 0%, transparent 50%)',
      }}
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

// ============================================================
// SHOP - Construccion: rayas precaucion + engranajes + chispas
// ============================================================
export const ConstructionEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {/* Rayas de precaucion amarillas */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`stripe-${i}`}
        className="absolute"
        style={{
          left: '-5%',
          top: `${8 + i * 18}%`,
          width: '110%',
          height: '2px',
          background: `repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(212, 197, 176, 0.15) 15px, rgba(212, 197, 176, 0.15) 30px)`,
          transform: `rotate(${-3 + i}deg)`,
        }}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 6 + i * 2, repeat: Infinity }}
      />
    ))}
    {/* Engranajes girando */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`gear-${i}`}
        className="absolute"
        style={{
          right: `${3 + i * 25}%`,
          top: `${10 + i * 20}%`,
          width: '80px',
          height: '80px',
          border: '2px solid rgba(196, 85, 85, 0.12)',
          borderRadius: '50%',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(8)].map((_, j) => (
          <div key={j} className="absolute" style={{ left: '50%', top: '-5px', width: '3px', height: '10px', marginLeft: '-1.5px', background: 'rgba(196, 85, 85, 0.12)', transformOrigin: '50% 45px', transform: `rotate(${j * 45}deg)` }} />
        ))}
      </motion.div>
    ))}
    {/* Chispas brillantes */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`spark-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${15 + Math.random() * 70}%`,
          top: `${15 + Math.random() * 70}%`,
          width: '3px',
          height: '3px',
          background: 'rgba(255, 200, 100, 0.6)',
          boxShadow: '0 0 6px rgba(255, 200, 100, 0.4)',
        }}
        animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 + Math.random() * 6, delay: Math.random() * 5 }}
      />
    ))}
    {/* Cono naranja pulsante */}
    <motion.div
      className="absolute"
      style={{
        left: '75%',
        bottom: '15%',
        width: '0',
        height: '0',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderBottom: '30px solid rgba(212, 150, 80, 0.15)',
      }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

// ============================================================
// CONTACTO - Sobres flotando + ondas + lineas de texto
// ============================================================
export const MailEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {/* Sobres que flotan */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`env-${i}`}
        className="absolute"
        style={{ left: `${8 + Math.random() * 84}%`, top: `${8 + Math.random() * 84}%` }}
      >
        <motion.svg
          width="30"
          height="22"
          viewBox="0 0 30 22"
          animate={{ y: [0, -20, 0], rotate: [0, 8, -5, 0], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 7 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 6 }}
        >
          <rect x="1" y="1" width="28" height="20" rx="2" fill="none" stroke="rgba(138, 155, 196, 0.35)" strokeWidth="1.5" />
          <path d="M 1 1 L 15 12 L 29 1" fill="none" stroke="rgba(138, 155, 196, 0.35)" strokeWidth="1.5" />
        </motion.svg>
      </motion.div>
    ))}
    {/* Ondas de senal expandiendose */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`cw-${i}`}
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '35%',
          marginLeft: '-50px',
          marginTop: '-50px',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(138, 155, 196, 0.15)',
        }}
        animate={{ scale: [0.5, 8], opacity: [0.3, 0] }}
        transition={{ duration: 7 + i * 2, repeat: Infinity, delay: i * 2, ease: 'easeOut' }}
      />
    ))}
    {/* Lineas de texto simuladas */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`txt-${i}`}
        className="absolute"
        style={{
          right: '5%',
          top: `${15 + i * 10}%`,
          height: '2px',
          background: 'rgba(212, 197, 176, 0.1)',
          borderRadius: '1px',
        }}
        animate={{
          width: [`${30 + Math.random() * 40}px`, `${80 + Math.random() * 60}px`, `${30 + Math.random() * 40}px`],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 1 }}
      />
    ))}
  </div>
);
