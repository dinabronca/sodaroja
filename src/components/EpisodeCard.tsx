import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../data/auth';

interface Episode {
  id: string; city: string; title: string; description: string; imageUrl: string;
  isPremium: boolean; lat?: number; lng?: number; publishDate?: string;
  links?: Record<string, string>; embeds?: Record<string, string>;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const m = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  return `${m[d.getMonth()]} ${d.getFullYear()}`;
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
      {/* === CARD: Overlay style — info on top of image === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={!isLocked ? { y: -4, transition: { duration: 0.5, ease: 'easeOut' } } : undefined}
        className="relative group h-full"
        onClick={handleCardClick}
        style={{ cursor: isLocked ? 'default' : 'pointer' }}
      >
        <div className={`relative overflow-hidden rounded-sm h-full transition-all duration-700 ${
          isLocked
            ? 'border border-soda-mist/10'
            : isUnlockedPremium
            ? 'border border-soda-red/20'
            : 'border border-soda-mist/10 hover:border-soda-mist/25'
        }`}
          style={isLocked ? { animation: 'premiumBreathe 6s ease-in-out infinite' } : undefined}
        >
          {/* Full-bleed image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-soda-deep" style={{ backfaceVisibility: 'hidden' }}>
            <img src={episode.imageUrl} alt={episode.city}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              style={{
                ...(isLocked ? { filter: 'saturate(0.2) brightness(0.5) blur(2px)' } : isUnlockedPremium ? { filter: 'contrast(1.05) saturate(1.05)' } : {}),
                backfaceVisibility: 'hidden',
              }} />

            {/* VHS for premium */}
            {(isUnlockedPremium || isLocked) && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, width: '100%', height: '30%', background: 'linear-gradient(transparent 0%, rgba(196,85,85,0.05) 40%, rgba(196,85,85,0.1) 50%, rgba(196,85,85,0.05) 60%, transparent 100%)', animation: 'vhsScan 5s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />
              </div>
            )}

            {/* Gradient overlay — seamless bottom */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 35%, rgba(10,14,26,0.3) 55%, rgba(10,14,26,0.75) 80%, #0a0e1a 100%)' }} />

            {/* Top badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {isNewest && (
                <span className="text-soda-red text-[9px] tracking-[0.2em] uppercase font-medium bg-soda-red/10 px-3 py-1 rounded-sm border border-soda-red/20">Nuevo</span>
              )}
              {isUnlockedPremium && (
                <span className="text-soda-red text-[9px] tracking-[0.2em] uppercase bg-soda-red/10 px-3 py-1 rounded-sm border border-soda-red/20">Frecuencia Interna</span>
              )}
            </div>

            {/* Listened indicator — subtle */}
            {listened && (
              <div className="absolute top-4 right-4 z-20 w-2 h-2 rounded-full bg-emerald-400/70" title="Ya lo escuchaste" />
            )}

            {/* Locked overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-15 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-soda-red/30 flex items-center justify-center bg-soda-red/5">
                    <div className="w-2 h-2 rounded-full bg-soda-red" style={{ boxShadow: '0 0 10px rgba(196,85,85,0.5)' }} />
                  </div>
                  <span className="text-soda-glow/70 text-[10px] tracking-[0.2em] uppercase">Frecuencia Interna</span>
                </div>
              </div>
            )}

            {/* Bottom info overlay — the editorial card style */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
              {/* EP number + date */}
              <div className="flex items-center gap-3 mb-2">
                {episodeNumber !== undefined && (
                  <span className="text-soda-red/80 text-[10px] font-mono tracking-[0.15em]">{epNum(episodeNumber)}</span>
                )}
                {formattedDate && !episode.isPremium && (
                  <span className="text-soda-fog/40 text-[10px] tracking-[0.1em]">{formattedDate}</span>
                )}
              </div>

              {/* City + Title */}
              <h3 className="text-2xl sm:text-3xl font-serif text-soda-glow leading-tight mb-1">{episode.city}</h3>
              <p className="text-soda-lamp/60 text-sm font-light italic">{episode.title}</p>
            </div>
          </div>

          {/* Locked CTA */}
          {isLocked && (
            <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
              <Link to="/frecuencia-interna" onClick={e => e.stopPropagation()} className="block w-full py-2.5 border border-soda-red/25 text-soda-red/60 rounded-sm hover:border-soda-red/40 hover:text-soda-red/80 transition-all duration-500 text-[10px] tracking-[0.2em] text-center uppercase bg-soda-night/80">
                Desbloquear
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* === MODAL === */}
      {isExpanded && !isLocked && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8" onClick={() => setIsExpanded(false)}>
          <div className="absolute inset-0 bg-soda-night/95" />
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-soda-deep border border-soda-mist/15 rounded-sm" style={{ WebkitOverflowScrolling: 'touch' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsExpanded(false)} className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center text-soda-fog/50 hover:text-soda-lamp transition-colors duration-500 bg-soda-night/50"><X size={18} /></button>

            {/* Modal header — editorial */}
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(20,24,36,0.6) 60%, rgba(20,24,36,1) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  {episodeNumber !== undefined && <span className="text-soda-red/80 text-[10px] font-mono tracking-[0.15em]">{epNum(episodeNumber)}</span>}
                  {formattedDate && <span className="text-soda-fog/40 text-[10px] tracking-[0.1em]">{formattedDate}</span>}
                  {isUnlockedPremium && <span className="text-soda-red text-[9px] tracking-[0.2em] uppercase">Frecuencia Interna</span>}
                  {isNewest && <span className="text-soda-red text-[9px] tracking-[0.2em] uppercase">Nuevo</span>}
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-soda-glow mb-1">{episode.city}</h2>
                <p className="text-soda-lamp/60 text-base font-light italic">{episode.title}</p>
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              <p className="text-soda-lamp/80 leading-relaxed text-sm">{episode.description}</p>
              {embeds.spotify && <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">Spotify</span><iframe src={embeds.spotify} width="100%" height={isMobile ? "152" : "232"} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '8px' }} /></div>}
              {embeds.soundcloud && <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">SoundCloud</span><iframe src={embeds.soundcloud} width="100%" height={isMobile ? "120" : "166"} frameBorder="0" allow="autoplay" loading="lazy" /></div>}
              {embeds.ivoox && <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">iVoox</span><iframe src={embeds.ivoox} width="100%" height={isMobile ? "150" : "200"} frameBorder="0" loading="lazy" /></div>}
              {embeds.applePodcasts && <div><span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-2">Apple Podcasts</span><iframe src={embeds.applePodcasts} width="100%" height={isMobile ? "150" : "175"} frameBorder="0" allow="autoplay *;" loading="lazy" /></div>}
              <div>
                <span className="text-soda-fog/40 text-[10px] tracking-[0.15em] uppercase block mb-3">También disponible en</span>
                <div className="flex flex-wrap gap-3">
                  {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/15 rounded-sm text-soda-lamp/60 text-[11px] tracking-wider hover:border-soda-mist/25 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />YouTube</a>}
                  {links.spotify && !embeds.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/15 rounded-sm text-soda-lamp/60 text-[11px] tracking-wider hover:border-soda-mist/25 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />Spotify</a>}
                  {links.soundcloud && !embeds.soundcloud && <a href={links.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/15 rounded-sm text-soda-lamp/60 text-[11px] tracking-wider hover:border-soda-mist/25 hover:text-soda-lamp transition-all duration-500"><ExternalLink size={12} />SoundCloud</a>}
                </div>
              </div>
              {showListenPrompt && !listened && (
                <div className="border-t border-soda-mist/10 pt-5 mt-2">
                  <p className="text-soda-lamp/60 text-[11px] tracking-wider text-center mb-3 uppercase">¿Ya escuchaste este episodio?</p>
                  <div className="flex justify-center gap-3">
                    <button onClick={() => markListened(true)} className="px-5 py-2 border border-soda-red/25 rounded-sm text-soda-lamp/70 text-[11px] tracking-wider hover:border-soda-red/40 transition-all duration-500">Sí, ya lo escuché</button>
                    <button onClick={() => setShowListenPrompt(false)} className="px-5 py-2 border border-soda-mist/15 rounded-sm text-soda-fog/50 text-[11px] tracking-wider hover:text-soda-fog transition-all duration-500">Todavía no</button>
                  </div>
                </div>
              )}
              {listened && (
                <div className="border-t border-soda-mist/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" /><span className="text-soda-fog/40 text-[11px] tracking-wider">Escuchado</span></div>
                  <button onClick={() => markListened(false)} className="text-soda-fog/30 text-[10px] hover:text-soda-fog/50 transition-colors duration-500">desmarcar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
