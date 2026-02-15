import React from 'react';
import { motion } from 'framer-motion';

// ============================================================
// Backgrounds — atmospheric, subtle but present
// ============================================================

export const TeamAmbience: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(196, 85, 85, 0.04) 0%, transparent 60%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(138, 155, 196, 0.03) 0%, transparent 50%)' }} />
  </div>
);

export const EpisodeVibes: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(196, 85, 85, 0.04) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(138, 155, 196, 0.03) 0%, transparent 50%)' }} />
      {/* Subtle animated glow */}
      {!isMobile && (
        <motion.div className="absolute"
          style={{ left: '30%', top: '30%', width: '40%', height: '40%', background: 'radial-gradient(ellipse, rgba(196,85,85,0.03) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export const BlueprintEffects: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Blueprint grid */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(138, 155, 196, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 155, 196, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      )}
      {/* Animated glow */}
      <motion.div className="absolute"
        style={{ left: '50%', top: '50%', width: '60%', height: '60%', marginLeft: '-30%', marginTop: '-30%', background: 'radial-gradient(ellipse, rgba(138,155,196,0.04) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export const MailEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(138, 155, 196, 0.04) 0%, transparent 50%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(196, 85, 85, 0.03) 0%, transparent 50%)' }} />
  </div>
);
