import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../data/auth';

interface Episode {
  id: string;
  city: string;
  title: string;
  description: string;
  imageUrl: string;
  isPremium: boolean;
  lat?: number;
  lng?: number;
  publishDate?: string;
  links?: Record<string, string>;
  embeds?: Record<string, string>;
  spotifyUrl?: string;
  soundcloudUrl?: string;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Glitch text multicolor pixeleado
const GlitchText: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative inline-block">
    {/* Capa base */}
    <span className="text-soda-lamp text-xs tracking-wide relative z-10">{text}</span>
    {/* Glitch rojo */}
    <motion.span
      className="absolute inset-0 text-xs tracking-wide"
      style={{ color: '#ff3333', clipPath: 'inset(0 0 60% 0)' }}
      animate={{ x: [0, 3, -2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
    >{text}</motion.span>
    {/* Glitch cyan */}
    <motion.span
      className="absolute inset-0 text-xs tracking-wide"
      style={{ color: '#00ffff', clipPath: 'inset(60% 0 0 0)' }}
      animate={{ x: [0, -3, 2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
    >{text}</motion.span>
    {/* Glitch amarillo */}
    <motion.span
      className="absolute inset-0 text-xs tracking-wide"
      style={{ color: '#ffff00', clipPath: 'inset(30% 0 30% 0)' }}
      animate={{ x: [0, 2, -3, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3, delay: 0.08 }}
    >{text}</motion.span>
    {/* Pixel blocks */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)',
      }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
    />
  </div>
);

export const EpisodeCard: React.FC<{ episode: Episode; isNewest?: boolean; episodeNumber?: number }> = ({ episode, isNewest = false, episodeNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [listened, setListened] = useState(false);
  const formattedDate = formatDate(episode.publishDate);
  const user = getCurrentUser();
  const isPremiumUser = user?.isPremium === true;
  const isLocked = episode.isPremium && !isPremiumUser;
  const isUnlockedPremium = episode.isPremium && isPremiumUser;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  // Check if episode was listened
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]');
      setListened(data.includes(episode.id));
    } catch { /* */ }
  }, [episode.id]);

  const toggleListened = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data: string[] = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]');
      const next = listened ? data.filter(id => id !== episode.id) : [...data, episode.id];
      localStorage.setItem('sodaroja-listened', JSON.stringify(next));
      setListened(!listened);
    } catch { /* */ }
  };

  // Mark as listened when modal opens (user clicked to listen)
  const markAsListened = () => {
    if (!listened) {
      try {
        const data: string[] = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]');
        if (!data.includes(episode.id)) {
          localStorage.setItem('sodaroja-listened', JSON.stringify([...data, episode.id]));
          setListened(true);
        }
      } catch { /* */ }
    }
  };

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleCardClick = () => { if (!isLocked) { setIsExpanded(true); markAsListened(); } };
  const links = episode.links || {};
  const embeds = episode.embeds || {};

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative group h-full"
        onClick={handleCardClick}
      >
        {/* Aura roja pulsante para premium desbloqueado */}
        {isUnlockedPremium && (
          <motion.div
            className="absolute -inset-1 rounded-sm pointer-events-none z-0"
            style={{ background: 'linear-gradient(135deg, rgba(196, 85, 85, 0.25), rgba(138, 155, 196, 0.12), rgba(196, 85, 85, 0.2))' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className={`relative overflow-hidden rounded-sm transition-all duration-500 h-full flex flex-col ${
          isUnlockedPremium ? 'bg-gradient-to-b from-soda-deep to-[#1a1020] border border-soda-red border-opacity-40 cursor-pointer card-hover'
          : isLocked ? 'bg-soda-deep border border-soda-mist border-opacity-30'
          : 'bg-soda-deep border border-soda-mist border-opacity-30 cursor-pointer card-hover'
        }`}>
          <div className="relative h-64 overflow-hidden">
            <motion.img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" whileHover={isLocked ? undefined : { scale: 1.05 }} transition={{ duration: 0.6 }} loading="lazy" />

            {/* ===== PREMIUM DESBLOQUEADO: scan effect sutil ===== */}
            {isUnlockedPremium && !isMobile && (
              <>
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(196, 85, 85, 0.04) 3px, rgba(196, 85, 85, 0.04) 4px)', mixBlendMode: 'overlay' }} />
                <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(196, 85, 85, 0.1) 50%, transparent 60%)' }} animate={{ y: ['-100%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
              </>
            )}
            {isUnlockedPremium && isMobile && (
              <div className="absolute inset-0 pointer-events-none z-10 border-2 border-soda-red/20 rounded-sm" />
            )}

            {/* ===== BADGES ZONA IZQUIERDA — apilados ===== */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
              {isUnlockedPremium && (
                <div className="bg-soda-red px-3 py-1 rounded-sm"><span className="text-white text-[10px] font-bold tracking-widest">FRECUENCIA INTERNA</span></div>
              )}
              {isNewest && (
                <motion.div
                  className="bg-emerald-500 px-3 py-1 rounded-sm shadow-lg shadow-emerald-500/30"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white text-[10px] font-bold tracking-widest">RECIÉN SALIDO</span>
                </motion.div>
              )}
            </div>

            {/* ===== BADGE DERECHA — número + escuchado ===== */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
              {listened && (
                <button onClick={toggleListened} className="bg-soda-night/80 backdrop-blur-sm p-1.5 rounded-sm border border-emerald-500/30" title="Escuchado">
                  <Eye size={13} className="text-emerald-400" />
                </button>
              )}
              {!listened && !isLocked && (
                <button onClick={toggleListened} className="bg-soda-night/80 backdrop-blur-sm p-1.5 rounded-sm border border-soda-mist/15 opacity-0 group-hover:opacity-100 transition-opacity" title="Marcar como escuchado">
                  <EyeOff size={13} className="text-soda-fog" />
                </button>
              )}
              {episodeNumber !== undefined && (
                <div className="bg-soda-night/80 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-soda-mist/15">
                  <span className="text-soda-lamp text-[11px] font-mono font-bold">#{episodeNumber}</span>
                </div>
              )}
            </div>

            {/* ===== PREMIUM BLOQUEADO: EFECTOS COMPLETOS ===== */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
                {/* Fondo gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-soda-red/30 via-soda-night/70 to-soda-accent/30 ${isMobile ? '' : 'backdrop-blur-md'}`} />

                {/* Scan lines — CSS only, no animation */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />

                {/* PULSO DE ENERGIA RADIAL — solo desktop */}
                {!isMobile && <>
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    left: '50%', top: '50%', marginLeft: '-80px', marginTop: '-80px',
                    width: '160px', height: '160px',
                    border: '1px solid rgba(196, 85, 85, 0.15)',
                  }}
                  animate={{ scale: [0.3, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    left: '50%', top: '50%', marginLeft: '-60px', marginTop: '-60px',
                    width: '120px', height: '120px',
                    border: '1px solid rgba(138, 155, 196, 0.12)',
                  }}
                  animate={{ scale: [0.3, 2], opacity: [0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeOut' }}
                />
                </>}

                {/* BORDE ELECTRICO — solo desktop */}
                {!isMobile && <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: '1px solid transparent' }}
                >
                  <motion.div
                    className="absolute"
                    style={{ width: '30%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(196, 85, 85, 0.6), transparent)', top: 0, left: 0 }}
                    animate={{ left: ['0%', '70%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute"
                    style={{ width: '30%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(138, 155, 196, 0.4), transparent)', bottom: 0, right: 0 }}
                    animate={{ right: ['0%', '70%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  />
                </motion.div>}

                {/* RUIDO ESTATICO — solo desktop */}
                {!isMobile && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={`noise-${i}`}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      width: `${4 + Math.random() * 12}px`,
                      height: '1px',
                      background: 'rgba(255,255,255,0.15)',
                    }}
                    animate={{ opacity: [0, 0.6, 0], scaleX: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2 + Math.random() * 5, delay: Math.random() * 3 }}
                  />
                ))}

                {/* RAYOS — solo desktop */}
                {!isMobile && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`, top: '0', width: '1px', height: '100%',
                      background: `linear-gradient(to bottom, transparent 20%, rgba(196, 85, 85, 0.4) 50%, transparent 80%)`,
                    }}
                    animate={{ opacity: [0, 0, 0, 0.8, 0, 0.4, 0], x: [0, 2, -1, 0] }}
                    transition={{ duration: 4 + i * 2, repeat: Infinity, delay: i * 1.5 }}
                  />
                ))}

                {/* PARTICULAS DE COLORES flotando */}
                {[...Array(isMobile ? 4 : 12)].map((_, i) => {
                  const colors = ['#ff4444', '#44aaff', '#ffaa00', '#ff44aa', '#44ffaa', '#aa44ff'];
                  const size = 2 + Math.random() * 3;
                  return (
                    <motion.div
                      key={`p-${i}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                        width: `${size}px`, height: `${size}px`,
                        background: colors[i % colors.length],
                        boxShadow: `0 0 ${size * 2}px ${colors[i % colors.length]}`,
                      }}
                      animate={{ y: [0, (Math.random()-0.5)*60], x: [0, (Math.random()-0.5)*40], opacity: [0, 0.7, 0], scale: [0, 1.2, 0] }}
                      transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
                    />
                  );
                })}

                {/* INTERFERENCIA — bandas horizontales */}
                {[...Array(4)].map((_, i) => (
                  <motion.div key={`intf-${i}`} className="absolute left-0 right-0" style={{ height: '2px', background: 'rgba(255,255,255,0.06)', top: `${20 + i * 20}%` }} animate={{ y: [0, 30, -20, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }} />
                ))}

                {/* Contenido central */}
                <div className="relative z-10 text-center px-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-soda-red text-6xl mb-3"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(196, 85, 85, 0.8))' }}
                  >&#9673;</motion.div>
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-soda-glow text-lg tracking-widest mb-2 font-light"
                    style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                  >FRECUENCIA INTERNA</motion.div>
                  <GlitchText text="Contenido Exclusivo" />
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-transparent to-transparent" />
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={`text-xs tracking-widest uppercase font-light ${isUnlockedPremium ? 'text-soda-red' : 'text-soda-accent'}`}>{episode.city}</div>
                {formattedDate && !episode.isPremium && <div className="text-soda-fog text-xs font-light">{formattedDate}</div>}
              </div>
              <h3 className="text-soda-glow text-2xl font-serif mb-3">"{episode.title}"</h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">{episode.description}</p>
            </div>
            {!isLocked && !isUnlockedPremium && (
              <div className="pt-4 border-t border-soda-mist border-opacity-20">
                <div className="text-soda-accent text-xs tracking-wide text-center hoverable">Click para escuchar &#9654;</div>
              </div>
            )}
            {isUnlockedPremium && (
              <div className="pt-4 border-t border-soda-red border-opacity-30">
                <div className="text-soda-red text-xs tracking-wide text-center hoverable">Click para escuchar &#9654;</div>
              </div>
            )}
            {isLocked && (
              <Link to="/frecuencia-interna" onClick={(e) => e.stopPropagation()} className="block w-full py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all duration-300 text-sm tracking-wider font-light hoverable text-center">
                UNIRME A LA FRECUENCIA
              </Link>
            )}
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-soda-red from-0% via-transparent to-transparent opacity-10" />
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isExpanded && !isLocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8 restore-cursor" onClick={() => setIsExpanded(false)}>
            <div className={`absolute inset-0 bg-soda-night/95 ${isMobile ? '' : 'backdrop-blur-md'}`} />
            <motion.div initial={isMobile ? { opacity: 0, y: 20 } : { scale: 0.95, opacity: 0 }} animate={isMobile ? { opacity: 1, y: 0 } : { scale: 1, opacity: 1 }} exit={isMobile ? { opacity: 0 } : { scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }} className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-soda-deep border border-soda-mist/30 rounded-sm" style={{ WebkitOverflowScrolling: 'touch' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsExpanded(false)} className="absolute top-3 right-3 z-50 w-10 h-10 bg-soda-night/80 rounded-full flex items-center justify-center text-soda-lamp hover:text-soda-glow transition-colors"><X size={20} /></button>

              {/* Header con imagen */}
              <div className="relative h-64 overflow-hidden">
                <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
                {/* Badges izquierda — apilados */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  {isUnlockedPremium && (
                    <div className="bg-soda-red px-4 py-1.5 rounded-sm">
                      <span className="text-white text-[11px] font-bold tracking-widest">FRECUENCIA INTERNA</span>
                    </div>
                  )}
                  {isNewest && (
                    <div className="bg-emerald-500 px-4 py-1.5 rounded-sm">
                      <span className="text-white text-[11px] font-bold tracking-widest">RECIÉN SALIDO</span>
                    </div>
                  )}
                </div>
                {/* Badge derecha — número */}
                {episodeNumber !== undefined && (
                  <div className="absolute top-4 right-14 z-20 bg-soda-night/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-soda-mist/15">
                    <span className="text-soda-lamp text-xs font-mono font-bold">#{episodeNumber}</span>
                  </div>
                )}
                {/* Barra oscura con titulo */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="bg-soda-night bg-opacity-85 px-6 py-5">
                    <div className="text-white text-xs tracking-widest uppercase mb-1">{episode.city}</div>
                    {formattedDate && <div className="text-white text-opacity-70 text-xs mb-1">{formattedDate}</div>}
                    <h2 className="text-2xl font-serif text-white">"{episode.title}"</h2>
                  </div>
                </div>
              </div>

              {/* Contenido + Embeds */}
              <div className="p-4 sm:p-6 space-y-5">
                <p className="text-soda-lamp leading-relaxed text-sm sm:text-base">{episode.description}</p>
                {embeds.spotify && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">SPOTIFY</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.spotify} width="100%" height={isMobile ? "152" : "232"} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '8px' }} /></div></div>
                )}
                {embeds.soundcloud && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">SOUNDCLOUD</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.soundcloud} width="100%" height={isMobile ? "120" : "166"} frameBorder="0" allow="autoplay" loading="lazy" /></div></div>
                )}
                {embeds.ivoox && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">IVOOX</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.ivoox} width="100%" height={isMobile ? "150" : "200"} frameBorder="0" loading="lazy" /></div></div>
                )}
                {embeds.applePodcasts && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">APPLE PODCASTS</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.applePodcasts} width="100%" height={isMobile ? "150" : "175"} frameBorder="0" allow="autoplay *;" loading="lazy" /></div></div>
                )}
                <div>
                  <h4 className="text-soda-accent text-xs tracking-wider mb-3">TAMBIEN DISPONIBLE EN</h4>
                  <div className="flex flex-wrap gap-3">
                    {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />YouTube</a>}
                    {links.spotify && !embeds.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />Spotify</a>}
                    {links.soundcloud && !embeds.soundcloud && <a href={links.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />SoundCloud</a>}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
