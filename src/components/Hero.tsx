import React from 'react';
import { getContent } from '../data/content';

export const Hero: React.FC = () => {
  const content = getContent();
  const { hero } = content;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soda-deep via-soda-night to-soda-deep" />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Imagen principal si existe */}
        {hero.imageUrl ? (
          <div className="relative inline-block mb-10 max-w-md mx-auto">
            <img src={hero.imageUrl} alt={hero.title} className="relative z-10 w-full rounded-sm shadow-2xl" style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
          </div>
        ) : (
          /* Carita SVG — centrada perfectamente */
          <div className="relative inline-block mb-10">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(196, 85, 85, 0.08)" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(138, 155, 196, 0.06)" strokeWidth="0.3" />
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
          <h1 className="text-7xl md:text-8xl font-serif font-light tracking-wider text-soda-glow mb-6 hero-fade"
            style={{ textShadow: '0 0 30px rgba(212, 197, 176, 0.3)', animationDelay: '0.3s' }}>
            {hero.title}
          </h1>
        )}

        {hero.subtitle && (
          <div className="text-soda-lamp text-xl md:text-2xl font-light tracking-wide mb-4 hero-fade"
            style={{ animationDelay: '0.6s' }}>
            {hero.subtitle}
          </div>
        )}

        {(hero.title || hero.subtitle) && hero.description && (
          <div className="w-[200px] h-px bg-gradient-to-r from-transparent via-soda-lamp to-transparent mx-auto mb-8 hero-fade"
            style={{ animationDelay: '0.9s' }} />
        )}

        {hero.description && (
          <p className="text-soda-fog text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed whitespace-pre-line hero-fade"
            style={{ animationDelay: '1.2s' }}>
            {hero.description}
          </p>
        )}
      </div>
    </section>
  );
};
