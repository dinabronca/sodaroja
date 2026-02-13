import React, { useState, useEffect } from 'react';
import { getContent } from '../data/content';

export const Hero: React.FC = () => {
  const content = getContent();
  const { hero } = content;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay then show everything with a fade
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0e1220, #0a0e1a, #0e1220)' }} />

      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 45%, rgba(196,85,85,0.06) 0%, transparent 60%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '72rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>

        {hero.imageUrl ? (
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2.5rem', maxWidth: '28rem' }}>
            {/* Pulsing glow behind image */}
            <div className="pulse-glow" style={{ position: 'absolute', inset: '-24px', borderRadius: '4px', background: 'radial-gradient(ellipse, rgba(196,85,85,0.15) 0%, transparent 70%)' }} />
            <img src={hero.imageUrl} alt={hero.title || 'sodaroja'} style={{ position: 'relative', zIndex: 10, width: '100%', borderRadius: '4px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', filter: 'brightness(0.9) contrast(1.05)' }} />
          </div>
        ) : (
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2.5rem' }}>
            {/* Glow behind carita */}
            <div className="pulse-glow" style={{ position: 'absolute', inset: '-32px', background: 'radial-gradient(circle, rgba(196,85,85,0.12) 0%, transparent 60%)' }} />
            <div style={{ width: '12rem', height: '12rem', margin: '0 auto', position: 'relative' }}>
              <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
                <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(196, 85, 85, 0.08)" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(138, 155, 196, 0.06)" strokeWidth="0.3" />
                {[...Array(48)].map((_, i) => {
                  const angle = (i * 7.5) * Math.PI / 180;
                  const isMajor = i % 4 === 0;
                  const len = isMajor ? 5 : 2;
                  return <line key={i} x1={60 + 52 * Math.cos(angle)} y1={60 + 52 * Math.sin(angle)} x2={60 + (52 - len) * Math.cos(angle)} y2={60 + (52 - len) * Math.sin(angle)} stroke={isMajor ? "rgba(196, 85, 85, 0.3)" : "rgba(138, 155, 196, 0.12)"} strokeWidth="0.5" />;
                })}
                <circle cx="60" cy="60" r="20" fill="rgba(196, 85, 85, 0.12)" />
                <circle cx="54" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <circle cx="66" cy="57" r="2" fill="rgba(212, 197, 176, 0.6)" />
                <path d="M 53 65 Q 60 70 67 65" stroke="rgba(212, 197, 176, 0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 38 50 Q 35 60 38 70" stroke="rgba(196, 85, 85, 0.2)" strokeWidth="1.5" fill="none" />
                <path d="M 82 50 Q 85 60 82 70" stroke="rgba(196, 85, 85, 0.2)" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
        )}

        {hero.title && (
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontFamily: "'Crimson Pro', serif", fontWeight: 300, letterSpacing: '0.05em', color: '#fef8ed', marginBottom: '1.5rem', textShadow: '0 0 30px rgba(212, 197, 176, 0.3)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
            {hero.title}
          </h1>
        )}

        {hero.subtitle && (
          <div style={{ color: '#d4c5b0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '1rem', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}>
            {hero.subtitle}
          </div>
        )}

        {(hero.title || hero.subtitle) && hero.description && (
          <div style={{ width: '200px', height: '1px', background: 'linear-gradient(to right, transparent, #d4c5b0, transparent)', margin: '0 auto 2rem', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.6s' }} />
        )}

        {hero.description && (
          <p style={{ color: '#8b9ab5', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', fontWeight: 300, maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7, whiteSpace: 'pre-line' as any, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.8s' }}>
            {hero.description}
          </p>
        )}
      </div>
    </section>
  );
};
