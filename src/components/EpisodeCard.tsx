import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../data/auth';

interface Episode {
  id: string; city: string; title: string; description: string; imageUrl: string;
  isPremium: boolean; lat?: number; lng?: number; publishDate?: string;
  links?: Record<string, string>; embeds?: Record<string, string>;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const d = new Date(dateStr + 'T00:00:00');
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const epNum = (n?: number) => n !== undefined ? `EP. ${String(n).padStart(3, '0')}` : '';

export const EpisodeCard: React.FC<{ episode: Episode; isNewest?: boolean; episodeNumber?: number }> = ({ episode, isNewest = false, episodeNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [listened, setListened] = useState(false);
  const [showListenPrompt, setShowListenPrompt] = useState(false);
  const formattedDate = formatDate(episode.publishDate);
  const user = getCurrentUser();
  const isPremiumUser = user?.isPremium === true;
  const isLocked = episode.isPremium && !isPremiumUser;
  const isUnlockedPremium = episode.isPremium && isPremiumUser;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]'); setListened(d.includes(episode.id)); } catch {}
  }, [episode.id]);

  const markListened = (val: boolean) => {
    try {
      const d: string[] = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]');
      const next = val ? (d.includes(episode.id) ? d : [...d, episode.id]) : d.filter(id => id !== episode.id);
      localStorage.setItem('sodaroja-listened', JSON.stringify(next));
      setListened(val); setShowListenPrompt(false);
    } catch {}
  };

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleCardClick = () => {
    if (!isLocked) { setIsExpanded(true); if (!listened) setShowListenPrompt(true); }
  };

  const links = episode.links || {};
  const embeds = episode.embeds || {};

  return (
    <>
      {/* === CARD: Classic style — image top, info below === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={!isLocked ? { y: -4, transition: { duration: 0.5, ease: 'easeOut' } } : undefined}
        className="relative group h-full"
        onClick={handleCardClick}
        style={{ cursor: isLocked ? 'default' : 'pointer' }}
      >
        <div className={`relative overflow-hidden rounded-sm h-full transition-all duration-700 ${
          isLocked
            ? 'bg-soda-slate/30 border border-soda-mist/10'
            : isUnlockedPremium
            ? 'bg-soda-slate/40 border border-soda-red/20 hover:border-soda-red/35'
            : 'bg-soda-slate/40 border border-soda-mist/15 hover:border-soda-mist/30'
        }`}
          style={isLocked ? { animation: 'premiumBreathe 6s ease-in-out infinite' } : undefined}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-soda-red/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-sm" />

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-soda-deep">
            <img src={episode.imageUrl} alt={episode.city}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              style={isLocked ? { filter: 'saturate(0.2) brightness(0.4) blur(2px)' } : isUnlockedPremium ? { filter: 'contrast(1.05) saturate(1.1)' } : {}} />

            {/* VHS scanline for premium */}
            {(isUnlockedPremium || isLocked) && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, width: '100%', height: '30%', background: 'linear-gradient(transparent, rgba(196,85,85,0.06) 40%, rgba(196,85,85,0.12) 50%, rgba(196,85,85,0.06) 60%, transparent)', animation: 'vhsScan 5s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />
              </div>
            )}

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-soda-night/60 via-transparent to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              {isNewest && (
                <span className="bg-soda-red/90 text-soda-glow text-[10px] tracking-wider px-3 py-1 rounded-sm font-medium shadow-lg shadow-soda-red/20">NUEVO</span>
              )}
              {isUnlockedPremium && (
                <span className="bg-soda-red/20 border border-soda-red/40 text-soda-red text-[10px] tracking-wider px-3 py-1 rounded-sm">FRECUENCIA INTERNA</span>
              )}
            </div>

            {/* EP number badge */}
            {episodeNumber !== undefined && (
              <div className="absolute top-3 right-3 z-20">
                <span className="text-soda-glow/60 text-[10px] font-mono tracking-wider bg-soda-night/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">{epNum(episodeNumber)}</span>
              </div>
            )}

            {/* Listened dot */}
            {listened && (
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-soda-night/50 backdrop-blur-sm px-2 py-1 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-400/80 text-[9px] tracking-wider">Escuchado</span>
              </div>
            )}

            {/* Locked center overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-15 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full border border-soda-red/40 flex items-center justify-center bg-soda-red/10"
                  >
                    <div className="w-3 h-3 rounded-full bg-soda-red" style={{ boxShadow: '0 0 12px rgba(196,85,85,0.6)' }} />
                  </motion.div>
                  <span className="text-soda-glow/80 text-[10px] tracking-[0.2em] uppercase font-medium">Frecuencia Interna</span>
                </div>
              </div>
            )}
          </div>

          {/* Info below image */}
          <div className="p-5 relative z-10">
            {/* City + Date row */}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] tracking-[0.15em] uppercase font-medium ${isUnlockedPremium ? 'text-soda-red' : 'text-soda-accent'}`}>
                {episode.city}
              </span>
              {formattedDate && !isLocked && (
                <span className="text-soda-fog/40 text-[11px]">{formattedDate}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-serif text-soda-glow mb-2 leading-tight group-hover:text-soda-glow/90 transition-colors">
              "{episode.title}"
            </h3>

            {/* Description */}
            <p className="text-soda-fog text-sm font-light leading-relaxed mb-4 line-clamp-2">
              {episode.description}
            </p>

            {/* CTA */}
            {isLocked ? (
              <Link to="/frecuencia-interna" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-2 text-soda-red/70 text-[11px] tracking-wider hover:text-soda-red transition-colors duration-500 group/cta">
                Desbloquear <ChevronRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-soda-accent/70 text-[11px] tracking-wider group-hover:text-soda-lamp transition-colors duration-500">
                Escuchar <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* === MODAL === */}
      {isExpanded && !isLocked && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8" onClick={() => setIsExpanded(false)}>
          <div className="absolute inset-0 bg-soda-night/95 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-soda-deep border border-soda-mist/15 rounded-sm"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setIsExpanded(false)} className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center text-soda-fog/50 hover:text-soda-lamp transition-colors duration-500 bg-soda-night/60"><X size={18} /></button>

            {/* Modal header image */}
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
              {/* VHS on premium modal */}
              {isUnlockedPremium && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, width: '100%', height: '30%', background: 'linear-gradient(transparent, rgba(196,85,85,0.06) 40%, rgba(196,85,85,0.1) 50%, rgba(196,85,85,0.06) 60%, transparent)', animation: 'vhsScan 5s linear infinite' }} />
                </div>
              )}
            </div>

            <div className="p-5 sm:p-8 -mt-16 relative z-10">
              {/* Meta row */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {episodeNumber !== undefined && <span className="text-soda-red/80 text-[10px] font-mono tracking-wider bg-soda-red/10 px-2.5 py-1 rounded-sm">{epNum(episodeNumber)}</span>}
                <span className={`text-[11px] tracking-wider ${isUnlockedPremium ? 'text-soda-red' : 'text-soda-accent'}`}>{episode.city}</span>
                {formattedDate && <span className="text-soda-fog/40 text-[11px]">{formattedDate}</span>}
                {isUnlockedPremium && <span className="text-soda-red text-[9px] tracking-wider bg-soda-red/10 px-2 py-0.5 rounded-sm">FRECUENCIA INTERNA</span>}
                {isNewest && <span className="text-soda-glow text-[9px] tracking-wider bg-soda-red/80 px-2 py-0.5 rounded-sm">NUEVO</span>}
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-soda-glow mb-2">"{episode.title}"</h2>
              <p className="text-soda-lamp text-sm font-light leading-relaxed mb-6">{episode.description}</p>

              {/* Embeds */}
              <div className="space-y-4">
                {embeds.spotify && <div><span className="text-soda-fog/40 text-[10px] tracking-wider block mb-2">SPOTIFY</span><iframe src={embeds.spotify} width="100%" height={isMobile ? "152" : "232"} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '8px' }} /></div>}
                {embeds.soundcloud && <div><span className="text-soda-fog/40 text-[10px] tracking-wider block mb-2">SOUNDCLOUD</span><iframe src={embeds.soundcloud} width="100%" height={isMobile ? "120" : "166"} frameBorder="0" allow="autoplay" loading="lazy" /></div>}
                {embeds.ivoox && <div><span className="text-soda-fog/40 text-[10px] tracking-wider block mb-2">IVOOX</span><iframe src={embeds.ivoox} width="100%" height={isMobile ? "150" : "200"} frameBorder="0" loading="lazy" /></div>}
                {embeds.applePodcasts && <div><span className="text-soda-fog/40 text-[10px] tracking-wider block mb-2">APPLE PODCASTS</span><iframe src={embeds.applePodcasts} width="100%" height={isMobile ? "150" : "175"} frameBorder="0" allow="autoplay *;" loading="lazy" /></div>}
              </div>

              {/* External links */}
              {Object.keys(links).length > 0 && (
                <div className="mt-6">
                  <span className="text-soda-fog/40 text-[10px] tracking-wider block mb-3">TAMBIÉN DISPONIBLE EN</span>
                  <div className="flex flex-wrap gap-3">
                    {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 border border-soda-mist/15 rounded-sm text-soda-lamp/70 text-xs tracking-wider hover:border-soda-accent/30 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />YouTube</a>}
                    {links.spotify && !embeds.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 border border-soda-mist/15 rounded-sm text-soda-lamp/70 text-xs tracking-wider hover:border-soda-accent/30 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />Spotify</a>}
                    {links.soundcloud && !embeds.soundcloud && <a href={links.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 border border-soda-mist/15 rounded-sm text-soda-lamp/70 text-xs tracking-wider hover:border-soda-accent/30 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />SoundCloud</a>}
                  </div>
                </div>
              )}

              {/* Listen prompt */}
              {showListenPrompt && !listened && (
                <div className="border-t border-soda-mist/10 pt-5 mt-6">
                  <p className="text-soda-lamp text-sm text-center mb-3">¿Ya escuchaste este episodio?</p>
                  <div className="flex justify-center gap-3">
                    <button onClick={() => markListened(true)} className="px-5 py-2.5 bg-soda-red/10 border border-soda-red/30 rounded-sm text-soda-lamp text-sm hover:bg-soda-red/20 transition-all duration-500">Sí, ya lo escuché</button>
                    <button onClick={() => setShowListenPrompt(false)} className="px-5 py-2.5 border border-soda-mist/15 rounded-sm text-soda-fog text-sm hover:text-soda-lamp transition-all duration-500">Todavía no</button>
                  </div>
                </div>
              )}
              {listened && !showListenPrompt && (
                <div className="border-t border-soda-mist/10 pt-4 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400/70" /><span className="text-emerald-400/60 text-xs">Escuchado</span></div>
                  <button onClick={() => markListened(false)} className="text-soda-fog/30 text-[10px] hover:text-soda-fog/50 transition-colors">desmarcar</button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
