import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudRain, Sun, Moon, Wind, Snowflake, X, Calendar } from 'lucide-react';
import { Rain } from '../effects/Rain';
import { Stars } from '../effects/Stars';
import { Mist } from '../effects/Mist';

interface Episode {
  id: string;
  city: string;
  title: string;
  description: string;
  imageUrl: string;
  isPremium: boolean;
  lat: number;
  lng: number;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  // Fecha de publicación
  publishDate?: string; // formato: "2026-02-05"
  // Embed URLs para reproducir en la web
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
  ivooxEmbedUrl?: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

// Formatear fecha a "Mes Año" en español
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [weather, setWeather] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const mockWeather = {
      condition: Math.random() > 0.5 ? 'rain' : Math.random() > 0.5 ? 'clear' : 'cloudy',
      temp: Math.floor(Math.random() * 30) + 5,
      humidity: Math.floor(Math.random() * 40) + 40,
    };
    setWeather(mockWeather);
  }, [episode.city]);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud size={20} className="text-soda-fog" />;
    switch(weather.condition) {
      case 'rain': return <CloudRain size={20} className="text-soda-accent" />;
      case 'clear': return <Sun size={20} className="text-soda-lamp" />;
      case 'snow': return <Snowflake size={20} className="text-soda-warm" />;
      default: return <Cloud size={20} className="text-soda-fog" />;
    }
  };

  const getWeatherEffect = () => {
    if (!weather || !isHovered) return null;
    switch(weather.condition) {
      case 'rain': return <Rain active={true} intensity="medium" />;
      case 'clear': return <Stars active={true} count={30} />;
      case 'cloudy': return <Mist active={true} intensity="light" />;
      default: return null;
    }
  };

  const handleCardClick = () => {
    if (!episode.isPremium) {
      setIsExpanded(true);
    }
  };

  const formattedDate = formatDate(episode.publishDate);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
        onClick={handleCardClick}
      >
        <div className={`relative overflow-hidden rounded-sm bg-soda-deep border border-soda-mist border-opacity-30 transition-all duration-500 ${
          episode.isPremium ? 'cursor-not-allowed' : 'cursor-pointer card-hover'
        }`}>
          
          {/* Efectos climáticos en la card */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {getWeatherEffect()}
          </div>

          {/* Imagen de la ciudad */}
          <div className="relative h-64 overflow-hidden image-overlay">
            <motion.img
              src={episode.imageUrl}
              alt={episode.city}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Badge de fecha */}
            {formattedDate && !episode.isPremium && (
              <div className="absolute top-4 left-4 glass-fog px-3 py-1.5 rounded-sm z-20">
                <div className="flex items-center gap-1.5 relative z-10">
                  <Calendar size={12} className="text-soda-accent" />
                  <span className="text-soda-lamp text-xs tracking-wide">{formattedDate}</span>
                </div>
              </div>
            )}

            {/* Overlay premium con glitch */}
            {episode.isPremium && (
              <div className="absolute inset-0 bg-gradient-to-br from-soda-red/40 via-soda-night/60 to-soda-accent/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <div className="static-noise opacity-20" />
                
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                  animation: 'vhs-lines 0.1s linear infinite'
                }} />
                
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,100,0.1) 25%, transparent 50%, rgba(0,255,255,0.1) 75%, transparent 100%)',
                  animation: 'color-shift 3s ease-in-out infinite'
                }} />
                
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
                  <motion.path
                    d="M 50 0 L 55 30 L 45 35 L 52 60 L 48 90 L 50 100"
                    stroke="rgba(196, 85, 85, 0.8)" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 150 0 L 145 40 L 155 45 L 148 70 L 152 100"
                    stroke="rgba(138, 155, 196, 0.8)" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut", delay: 0.5 }}
                  />
                </svg>
                
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-soda-red rounded-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                  />
                ))}
                
                <div className="relative z-10 text-center px-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-soda-red text-7xl mb-4 drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(196, 85, 85, 0.8))' }}
                  >
                    ◉
                  </motion.div>
                  
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-soda-glow text-2xl tracking-widest mb-3 font-light"
                    style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
                  >
                    FRECUENCIA INTERNA
                  </motion.div>
                  
                  <div className="text-soda-lamp text-sm tracking-wide">Contenido Exclusivo</div>
                  
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-soda-red rounded-full"
                      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                      animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Clima overlay */}
            {weather && !episode.isPremium && (
              <div className="absolute top-4 right-4 glass-fog px-4 py-2 rounded-sm z-20">
                <div className="flex items-center space-x-3 relative z-10">
                  {getWeatherIcon()}
                  <div className="text-soda-warm text-sm">
                    <div className="font-medium">{weather.temp}°C</div>
                    <div className="text-xs text-soda-fog">{weather.humidity}% hum</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-soda-accent text-xs tracking-widest uppercase font-light">
                  {episode.city}
                </div>
                {formattedDate && (
                  <div className="text-soda-fog text-xs font-light">
                    {formattedDate}
                  </div>
                )}
              </div>
              <h3 className="text-soda-glow text-2xl font-serif mb-3">
                "{episode.title}"
              </h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">
                {episode.description}
              </p>
            </div>

            {/* Links rápidos (sin expandir) */}
            {!episode.isPremium && (
              <div className="pt-4 border-t border-soda-mist border-opacity-20">
                <div className="text-soda-accent text-xs tracking-wide text-center hoverable">
                  Click para escuchar ▸
                </div>
              </div>
            )}

            {/* Botón premium */}
            {episode.isPremium && (
              <button className="w-full py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all duration-300 text-sm tracking-wider font-light hoverable">
                UNIRME A LA FRECUENCIA
              </button>
            )}
          </div>

          {/* Efecto de resplandor en hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-soda-red from-0% via-transparent to-transparent opacity-10" />
          </div>
        </div>
      </motion.div>

      {/* Modal expandido — reproductor embebido */}
      <AnimatePresence>
        {isExpanded && !episode.isPremium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 restore-cursor"
            onClick={() => setIsExpanded(false)}
            style={{ cursor: 'auto' }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-soda-night bg-opacity-90 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-soda-deep border border-soda-mist border-opacity-30 rounded-sm"
              onClick={(e) => e.stopPropagation()}
              style={{ cursor: 'auto' }}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-soda-night bg-opacity-80 border border-soda-mist border-opacity-30 text-soda-lamp hover:text-soda-glow hover:border-soda-accent transition-all"
                style={{ cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              {/* Imagen header */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={episode.imageUrl}
                  alt={episode.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-16">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-soda-accent text-xs tracking-widest uppercase">{episode.city}</span>
                    {formattedDate && (
                      <>
                        <span className="text-soda-mist">·</span>
                        <span className="text-soda-fog text-xs">{formattedDate}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-soda-glow text-3xl md:text-4xl font-serif">
                    "{episode.title}"
                  </h2>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 md:p-8 space-y-6">
                <p className="text-soda-lamp text-base leading-relaxed font-light">
                  {episode.description}
                </p>

                {/* Embeds de plataformas */}
                <div className="space-y-4">
                  <h3 className="text-soda-glow text-lg font-serif mb-2">Escuchá este episodio</h3>
                  
                  {/* Spotify Embed */}
                  {episode.spotifyEmbedUrl && (
                    <div className="rounded-sm overflow-hidden">
                      <iframe
                        src={episode.spotifyEmbedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-sm"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                  )}

                  {/* YouTube Embed */}
                  {episode.youtubeEmbedUrl && (
                    <div className="rounded-sm overflow-hidden aspect-video">
                      <iframe
                        src={episode.youtubeEmbedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-sm"
                      />
                    </div>
                  )}

                  {/* iVoox / Otro embed */}
                  {episode.ivooxEmbedUrl && (
                    <div className="rounded-sm overflow-hidden">
                      <iframe
                        src={episode.ivooxEmbedUrl}
                        width="100%"
                        height="200"
                        frameBorder="0"
                        loading="lazy"
                        className="rounded-sm"
                      />
                    </div>
                  )}

                  {/* Fallback: links a plataformas si no hay embeds */}
                  {!episode.spotifyEmbedUrl && !episode.youtubeEmbedUrl && !episode.ivooxEmbedUrl && (
                    <div className="space-y-3">
                      {episode.spotifyUrl && (
                        <a
                          href={episode.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-soda-slate bg-opacity-40 border border-soda-mist border-opacity-20 rounded-sm hover:border-soda-accent hover:border-opacity-40 transition-all"
                          style={{ cursor: 'pointer' }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                          <span className="text-soda-lamp text-sm">Escuchar en Spotify</span>
                        </a>
                      )}

                      {episode.soundcloudUrl && (
                        <a
                          href={episode.soundcloudUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-soda-slate bg-opacity-40 border border-soda-mist border-opacity-20 rounded-sm hover:border-soda-accent hover:border-opacity-40 transition-all"
                          style={{ cursor: 'pointer' }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-500">
                            <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.084-.1"/>
                          </svg>
                          <span className="text-soda-lamp text-sm">Escuchar en SoundCloud</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* También disponible en */}
                <div className="pt-4 border-t border-soda-mist border-opacity-20">
                  <p className="text-soda-fog text-xs text-center">
                    También disponible en tu plataforma de podcasts favorita
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
