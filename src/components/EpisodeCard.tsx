import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';
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

export const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = formatDate(episode.publishDate);
  const user = getCurrentUser();
  const isPremiumUser = user?.isPremium === true;
  const isLocked = episode.isPremium && !isPremiumUser;
  const isUnlockedPremium = episode.isPremium && isPremiumUser;

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleCardClick = () => { if (!isLocked) setIsExpanded(true); };
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
            <motion.img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" whileHover={isLocked ? undefined : { scale: 1.05 }} transition={{ duration: 0.6 }} />

            {/* ===== PREMIUM DESBLOQUEADO: scan effect sobre imagen ===== */}
            {isUnlockedPremium && (
              <>
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(196, 85, 85, 0.04) 3px, rgba(196, 85, 85, 0.04) 4px)', mixBlendMode: 'overlay' }} />
                <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(196, 85, 85, 0.1) 50%, transparent 60%)' }} animate={{ y: ['-100%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
                {/* Sello */}
                <div className="absolute top-3 left-3 z-20 bg-soda-red px-3 py-1 rounded-sm"><span className="text-white text-[10px] font-bold tracking-widest">FRECUENCIA INTERNA</span></div>
              </>
            )}

            {/* Fecha */}
            {formattedDate && !episode.isPremium && (
              <div className="absolute top-4 left-4 glass-fog px-3 py-1.5 rounded-sm z-20">
                <div className="flex items-center gap-1.5"><Calendar size={12} className="text-soda-accent" /><span className="text-soda-lamp text-xs">{formattedDate}</span></div>
              </div>
            )}
            {formattedDate && isUnlockedPremium && (
              <div className="absolute top-3 right-3 glass-fog px-3 py-1.5 rounded-sm z-20">
                <div className="flex items-center gap-1.5"><Calendar size={12} className="text-soda-red" /><span className="text-soda-lamp text-xs">{formattedDate}</span></div>
              </div>
            )}

            {/* ===== PREMIUM BLOQUEADO: TODOS LOS EFECTOS ORIGINALES ===== */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
                {/* Fondo gradient con blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-soda-red/30 via-soda-night/70 to-soda-accent/30 backdrop-blur-md" />

                {/* Scan lines */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />

                {/* RAYOS — lineas electricas que flashean */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: '0',
                      width: '1px',
                      height: '100%',
                      background: `linear-gradient(to bottom, transparent 20%, rgba(196, 85, 85, 0.4) 50%, transparent 80%)`,
                    }}
                    animate={{ opacity: [0, 0, 0, 0.8, 0, 0.4, 0], x: [0, 2, -1, 0] }}
                    transition={{ duration: 4 + i * 2, repeat: Infinity, delay: i * 1.5 }}
                  />
                ))}

                {/* PARTICULAS DE COLORES flotando */}
                {[...Array(12)].map((_, i) => {
                  const colors = ['#ff4444', '#44aaff', '#ffaa00', '#ff44aa', '#44ffaa', '#aa44ff'];
                  const size = 2 + Math.random() * 3;
                  return (
                    <motion.div
                      key={`p-${i}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        background: colors[i % colors.length],
                        boxShadow: `0 0 ${size * 2}px ${colors[i % colors.length]}`,
                      }}
                      animate={{
                        y: [0, (Math.random() - 0.5) * 60],
                        x: [0, (Math.random() - 0.5) * 40],
                        opacity: [0, 0.7, 0],
                        scale: [0, 1.2, 0],
                      }}
                      transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
                    />
                  );
                })}

                {/* INTERFERENCIA — bandas horizontales que se mueven */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`intf-${i}`}
                    className="absolute left-0 right-0"
                    style={{ height: '2px', background: 'rgba(255,255,255,0.06)', top: `${20 + i * 20}%` }}
                    animate={{ y: [0, 30, -20, 0], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                  />
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 restore-cursor" onClick={() => setIsExpanded(false)}>
            <div className="absolute inset-0 bg-soda-night bg-opacity-90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-soda-deep border border-soda-mist border-opacity-30 rounded-sm" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsExpanded(false)} className="absolute top-4 right-4 z-50 w-10 h-10 bg-soda-night bg-opacity-80 rounded-full flex items-center justify-center text-soda-lamp hover:text-soda-glow transition-colors"><X size={20} /></button>

              {/* Header con imagen */}
              <div className="relative h-64 overflow-hidden">
                <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
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
              <div className="p-6 space-y-6">
                <p className="text-soda-lamp leading-relaxed">{episode.description}</p>
                {embeds.spotify && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">SPOTIFY</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.spotify} width="100%" height="232" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '8px' }} /></div></div>
                )}
                {embeds.soundcloud && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">SOUNDCLOUD</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.soundcloud} width="100%" height="166" frameBorder="0" allow="autoplay" loading="lazy" /></div></div>
                )}
                {embeds.ivoox && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">IVOOX</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.ivoox} width="100%" height="200" frameBorder="0" loading="lazy" /></div></div>
                )}
                {embeds.applePodcasts && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">APPLE PODCASTS</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.applePodcasts} width="100%" height="175" frameBorder="0" allow="autoplay *;" loading="lazy" /></div></div>
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
