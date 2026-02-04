import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Moon, Wind, Snowflake } from 'lucide-react';
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
}

interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [weather, setWeather] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Simulación de clima (reemplazar con API real)
  useEffect(() => {
    // Mock weather data
    const mockWeather = {
      condition: Math.random() > 0.5 ? 'rain' : Math.random() > 0.5 ? 'clear' : 'cloudy',
      temp: Math.floor(Math.random() * 30) + 5,
      humidity: Math.floor(Math.random() * 40) + 40,
    };
    setWeather(mockWeather);
  }, [episode.city]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
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
          
          {/* Overlay premium con glitch */}
          {episode.isPremium && (
            <div className="absolute inset-0 bg-gradient-to-br from-soda-red/40 via-soda-night/60 to-soda-accent/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
              <div className="static-noise opacity-20" />
              
              {/* Efecto de ondas de frecuencia */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-soda-red rounded-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 1.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              <div className="relative z-10 text-center px-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
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
                
                <div className="text-soda-lamp text-sm tracking-wide">
                  Contenido Exclusivo
                </div>
                
                {/* Partículas flotantes */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-soda-red rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Clima overlay */}
          {weather && !episode.isPremium && (
            <div className="absolute top-4 right-4 glass-fog px-4 py-2 rounded-sm">
              <div className="flex items-center space-x-3">
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
          {/* Ciudad y título */}
          <div>
            <div className="text-soda-accent text-xs tracking-widest uppercase mb-2 font-light">
              {episode.city}
            </div>
            <h3 className="text-soda-glow text-2xl font-serif mb-3">
              "{episode.title}"
            </h3>
            <p className="text-soda-fog text-sm leading-relaxed font-light">
              {episode.description}
            </p>
          </div>

          {/* Reproductores (si no es premium) */}
          {!episode.isPremium && (
            <div className="pt-4 space-y-3 border-t border-soda-mist border-opacity-20">
              {episode.spotifyUrl && (
                <div className="flex items-center space-x-3 text-soda-fog hover:text-soda-lamp transition-colors">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <span className="text-xs tracking-wide hoverable">Escuchar en Spotify</span>
                </div>
              )}
              
              {episode.soundcloudUrl && (
                <div className="flex items-center space-x-3 text-soda-fog hover:text-soda-lamp transition-colors">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.084-.1m-.87.827c-.048 0-.09.04-.098.092l-.227 1.326.227 1.279c0 .051.045.09.098.09.05 0 .09-.04.096-.09l.249-1.279-.249-1.326c-.007-.051-.048-.092-.096-.092m1.748-1.057c-.053 0-.096.043-.103.098l-.225 2.484.225 2.440c.007.057.05.1.103.1.051 0 .094-.043.101-.1l.245-2.44-.245-2.484c-.007-.055-.05-.098-.101-.098m.87.19c-.055 0-.1.046-.107.1l-.215 2.294.215 2.25c.007.057.052.098.107.098.054 0 .097-.041.105-.098l.233-2.25-.233-2.293c-.008-.055-.051-.1-.105-.1m.87-.095c-.056 0-.102.046-.109.102l-.208 2.389.208 2.33c.007.055.053.1.109.1s.101-.045.108-.1l.232-2.33-.232-2.389c-.007-.056-.052-.102-.108-.102m.87-.047c-.059 0-.106.047-.114.104l-.202 2.436.202 2.383c.008.057.055.102.114.102.057 0 .105-.045.112-.102l.22-2.383-.22-2.436c-.007-.057-.055-.104-.112-.104m.87-.046c-.061 0-.109.048-.117.105l-.195 2.482.195 2.427c.008.059.056.105.117.105.059 0 .108-.046.116-.105l.211-2.427-.211-2.482c-.008-.057-.057-.105-.116-.105m.97-.07c-.063 0-.112.05-.12.108l-.178 2.552.178 2.474c.008.061.057.108.12.108.061 0 .112-.047.12-.108l.197-2.474-.197-2.552c-.008-.058-.059-.108-.12-.108m.87-.007c-.064 0-.115.05-.123.11l-.174 2.559.174 2.517c.008.061.059.11.123.11s.114-.049.122-.11l.189-2.517-.189-2.56c-.008-.06-.058-.11-.122-.11m.87-.032c-.066 0-.119.052-.127.112l-.167 2.591.167 2.551c.008.061.061.112.127.112.064 0 .117-.051.125-.112l.182-2.551-.182-2.591c-.008-.06-.061-.112-.125-.112m.97-.027c-.068 0-.122.053-.13.114l-.161 2.618.161 2.586c.008.063.062.114.13.114.066 0 .121-.051.129-.114l.176-2.586-.176-2.618c-.008-.061-.063-.114-.129-.114m.87-.007c-.069 0-.124.054-.132.116l-.155 2.625.155 2.62c.008.063.063.116.132.116.068 0 .122-.053.13-.116l.169-2.62-.169-2.625c-.008-.062-.062-.116-.13-.116m.97-.012c-.07 0-.126.055-.134.118l-.148 2.637.148 2.653c.008.064.064.118.134.118.069 0 .125-.054.133-.118l.163-2.653-.163-2.637c-.008-.063-.064-.118-.133-.118m.87-.029c-.072 0-.128.056-.136.12l-.142 2.666.142 2.683c.008.065.064.12.136.12.071 0 .127-.055.135-.12l.157-2.683-.157-2.666c-.008-.064-.064-.12-.135-.12m.97-.032c-.073 0-.13.057-.138.122l-.135 2.698.135 2.712c.008.066.065.122.138.122.072 0 .129-.056.137-.122l.151-2.712-.151-2.698c-.008-.065-.065-.122-.137-.122m1.74.18c-.072 0-.131.058-.139.124l-.128 2.518.128 2.533c.008.067.067.124.139.124.071 0 .13-.057.138-.124l.145-2.533-.145-2.518c-.008-.066-.067-.124-.138-.124m-16.75 1.657c-.046 0-.084.04-.092.089l-.217 1.346.217 1.299c.008.049.046.088.092.088.046 0 .085-.04.093-.088l.238-1.299-.238-1.346c-.008-.049-.047-.089-.093-.089"/>
                    </svg>
                  </div>
                  <span className="text-xs tracking-wide hoverable">Escuchar en SoundCloud</span>
                </div>
              )}
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
  );
};
