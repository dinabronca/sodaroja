import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

// ============================================================
// EL EQUIPO — Luciérnagas + bokeh
// ============================================================
export const TeamAmbience: React.FC = () => {
  const mobile = useMemo(isMobile, []);
  const flyCount = mobile ? 4 : 18;
  const bokehCount = mobile ? 1 : 5;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {[...Array(flyCount)].map((_, i) => {
        const size = 3 + Math.random() * 4;
        const colors = ['rgba(196, 85, 85, 0.15)', 'rgba(212, 197, 176, 0.12)', 'rgba(138, 155, 196, 0.10)', 'rgba(196, 85, 85, 0.10)'];
        return (
          <motion.div key={`fly-${i}`} className="absolute rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${size}px`, height: `${size}px`, background: colors[i % 4], boxShadow: `0 0 ${size * 3}px ${colors[i % 4]}`, filter: 'blur(1px)' }}
            animate={{ x: [0, (Math.random() - 0.5) * 80, 0], y: [0, (Math.random() - 0.5) * 60, 0], opacity: [0, 0.6, 0.3, 0] }}
            transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 10, ease: 'easeInOut' }}
          />
        );
      })}
      {[...Array(bokehCount)].map((_, i) => (
        <motion.div key={`bokeh-${i}`} className="absolute rounded-full"
          style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 25}%`, width: `${100 + i * 30}px`, height: `${100 + i * 30}px`, background: i % 2 === 0 ? 'radial-gradient(circle, rgba(196, 85, 85, 0.04) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(138, 155, 196, 0.03) 0%, transparent 70%)', filter: 'blur(30px)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, delay: i * 2 }}
        />
      ))}
    </div>
  );
};

// ============================================================
// EPISODIOS — Emojis cayendo + niebla
// ============================================================
const cityEmojis = ['🏛️', '🗺️', '✈️', '🌍', '🏔️', '⛩️', '🗼', '🌙', '🔮', '📻', '🎭', '🏰', '⚓', '🕯️', '📖', '🧭'];

export const EpisodeVibes: React.FC = () => {
  const mobile = useMemo(isMobile, []);
  const emojiCount = mobile ? 8 : 28;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {[...Array(emojiCount)].map((_, i) => (
        <motion.div key={`emoji-${i}`} className="absolute select-none"
          style={{ left: `${(i / emojiCount) * 100 + Math.random() * 3}%`, top: '-5%', fontSize: `${16 + Math.random() * 10}px`, opacity: 0 }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 0.15, 0.12, 0], rotate: [0, (Math.random() - 0.5) * 40] }}
          transition={{ duration: 10 + Math.random() * 6, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
        >
          {cityEmojis[i % cityEmojis.length]}
        </motion.div>
      ))}
      {!mobile && (
        <>
          <motion.div className="absolute left-0 right-0 bottom-0 h-72"
            style={{ background: 'linear-gradient(to top, rgba(10, 14, 26, 0.5), transparent)' }}
            animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div className="absolute"
            style={{ left: '-10%', top: '30%', width: '50%', height: '200px', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
            animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 20, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
};

// ============================================================
// SHOP — Blueprints suaves
// ============================================================
export const BlueprintEffects: React.FC = () => {
  const mobile = useMemo(isMobile, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(138, 155, 196, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 155, 196, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {!mobile && [...Array(4)].map((_, i) => (
        <motion.div key={`measure-${i}`} className="absolute"
          style={{ left: `${10 + i * 20}%`, top: `${20 + i * 18}%`, height: '1px', background: 'rgba(138, 155, 196, 0.06)' }}
          animate={{ width: ['0px', `${80 + Math.random() * 120}px`, '0px'], opacity: [0, 0.4, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 3 }}
        />
      ))}
      {!mobile && [...Array(3)].map((_, i) => (
        <motion.div key={`spec-${i}`} className="absolute font-mono select-none"
          style={{ right: `${5 + i * 15}%`, bottom: `${15 + i * 20}%`, fontSize: '9px', color: 'rgba(138, 155, 196, 0.06)', letterSpacing: '2px' }}
          animate={{ opacity: [0, 0.15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 3 }}
        >
          {['REV.03 // EN CONSTRUCCION', 'PLANO GENERAL // v2.1', 'PROXIMAMENTE'][i]}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================
// CONTACTO — Cartitas flotando
// ============================================================
export const MailEffects: React.FC = () => {
  const mobile = useMemo(isMobile, []);
  const envCount = mobile ? 10 : 28;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {[...Array(envCount)].map((_, i) => (
        <motion.div key={`env-${i}`} className="absolute"
          style={{ left: `${2 + (i / envCount) * 96}%`, top: `${2 + (i % 6) * 16}%` }}
        >
          <motion.svg width="28" height="20" viewBox="0 0 28 20"
            animate={{ y: [0, -20, 0], rotate: [0, 8, -5, 0], opacity: [0.10, 0.30, 0.10] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.2 }}
          >
            <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke="rgba(138, 155, 196, 0.35)" strokeWidth="1" />
            <path d="M 1 1 L 14 11 L 27 1" fill="none" stroke="rgba(138, 155, 196, 0.35)" strokeWidth="1" />
          </motion.svg>
        </motion.div>
      ))}
      {!mobile && [...Array(5)].map((_, i) => (
        <motion.div key={`txt-${i}`} className="absolute"
          style={{ right: '6%', top: `${18 + i * 12}%`, height: '1px', background: 'rgba(212, 197, 176, 0.06)', borderRadius: '1px' }}
          animate={{ width: [`${25 + Math.random() * 30}px`, `${60 + Math.random() * 50}px`, `${25 + Math.random() * 30}px`], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
        />
      ))}
    </div>
  );
};
