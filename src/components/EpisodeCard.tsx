import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  // Legacy
  spotifyUrl?: string;
  soundcloudUrl?: string;
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
  ivooxEmbedUrl?: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = formatDate(episode.publishDate);

  useEffect(() => {
    if (isExpanded) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleCardClick = () => { if (!episode.isPremium) setIsExpanded(true); };

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
        <div className={`relative overflow-hidden rounded-sm bg-soda-deep border border-soda-mist border-opacity-30 transition-all duration-500 h-full flex flex-col ${episode.isPremium ? '' : 'cursor-pointer card-hover'}`}>
          <div className="relative h-64 overflow-hidden">
            <motion.img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
            {formattedDate && !episode.isPremium && (
              <div className="absolute top-4 left-4 glass-fog px-3 py-1.5 rounded-sm z-20">
                <div className="flex items-center gap-1.5"><Calendar size={12} className="text-soda-accent" /><span className="text-soda-lamp text-xs">{formattedDate}</span></div>
              </div>
            )}
            {episode.isPremium && (
              <div className="absolute inset-0 bg-gradient-to-br from-soda-red/40 via-soda-night/60 to-soda-accent/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
                <div className="relative z-10 text-center px-6">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-soda-red text-6xl mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(196, 85, 85, 0.8))' }}>◉</motion.div>
                  <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} className="text-soda-glow text-lg tracking-widest mb-2 font-light" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>FRECUENCIA INTERNA</motion.div>
                  <div className="text-soda-lamp text-xs tracking-wide">Contenido Exclusivo</div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-transparent to-transparent" />
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-soda-accent text-xs tracking-widest uppercase font-light">{episode.city}</div>
                {formattedDate && <div className="text-soda-fog text-xs font-light">{formattedDate}</div>}
              </div>
              <h3 className="text-soda-glow text-2xl font-serif mb-3">"{episode.title}"</h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">{episode.description}</p>
            </div>
            {!episode.isPremium && (
              <div className="pt-4 border-t border-soda-mist border-opacity-20">
                <div className="text-soda-accent text-xs tracking-wide text-center hoverable">Click para escuchar ▸</div>
              </div>
            )}
            {episode.isPremium && (
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
        {isExpanded && !episode.isPremium && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 restore-cursor" onClick={() => setIsExpanded(false)}>
            <div className="absolute inset-0 bg-soda-night bg-opacity-90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-soda-deep border border-soda-mist border-opacity-30 rounded-sm" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsExpanded(false)} className="absolute top-4 right-4 z-50 w-10 h-10 bg-soda-night bg-opacity-80 rounded-full flex items-center justify-center text-soda-lamp hover:text-soda-glow transition-colors"><X size={20} /></button>
              <div className="relative h-64 overflow-hidden">
                <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-16">
                  <div className="text-soda-accent text-xs tracking-widest uppercase mb-2">{episode.city}</div>
                  {formattedDate && <div className="text-soda-fog text-xs mb-2">{formattedDate}</div>}
                  <h2 className="text-3xl font-serif text-soda-glow">"{episode.title}"</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-soda-lamp leading-relaxed">{episode.description}</p>
                {embeds.spotify && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">SPOTIFY</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.spotify} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '4px' }} /></div></div>
                )}
                {embeds.soundcloud && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">SOUNDCLOUD</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.soundcloud} width="100%" height="166" frameBorder="0" allow="autoplay" loading="lazy" /></div></div>
                )}
                {embeds.ivoox && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">IVOOX</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.ivoox} width="100%" height="200" frameBorder="0" loading="lazy" /></div></div>
                )}
                {embeds.applePodcasts && (
                  <div><h4 className="text-soda-accent text-xs tracking-wider mb-3">APPLE PODCASTS</h4><div className="rounded-sm overflow-hidden"><iframe src={embeds.applePodcasts} width="100%" height="175" frameBorder="0" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *;" loading="lazy" /></div></div>
                )}
                {/* Links */}
                <div>
                  <h4 className="text-soda-accent text-xs tracking-wider mb-3">TAMBIÉN DISPONIBLE EN</h4>
                  <div className="flex flex-wrap gap-3">
                    {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />YouTube</a>}
                    {links.spotify && !embeds.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />Spotify</a>}
                    {links.soundcloud && !embeds.soundcloud && <a href={links.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />SoundCloud</a>}
                    {links.ivoox && !embeds.ivoox && <a href={links.ivoox} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />iVoox</a>}
                    {links.applePodcasts && !embeds.applePodcasts && <a href={links.applePodcasts} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist border-opacity-30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />Apple Podcasts</a>}
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
