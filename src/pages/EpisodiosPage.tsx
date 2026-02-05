import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EpisodeCard } from '../components/EpisodeCard';

// Mock data extendido
const allEpisodes = [
  {
    id: '1',
    city: 'PARÍS',
    title: 'Las Catacumbas Olvidadas',
    description: 'Bajo las calles más elegantes del mundo, seis millones de esqueletos guardan secretos que nadie quiere recordar.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    isPremium: false,
    lat: 48.8566,
    lng: 2.3522,
    spotifyUrl: '#',
    soundcloudUrl: '#',
  },
  {
    id: '2',
    city: 'TOKIO',
    title: 'El Último Samurái Digital',
    description: 'En los callejones de Akihabara, un hombre programa códigos que nadie puede descifrar. Su identidad: un misterio de 20 años.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    isPremium: true,
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: '3',
    city: 'BUENOS AIRES',
    title: 'La Dama de Blanco',
    description: 'Cada noche de tormenta, una figura cruza el Cementerio de la Recoleta. Los que la siguieron... nunca contaron la historia completa.',
    imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
    isPremium: false,
    lat: -34.6037,
    lng: -58.3816,
    spotifyUrl: '#',
    soundcloudUrl: '#',
  },
  {
    id: '4',
    city: 'ESTAMBUL',
    title: 'Los Tesoros Hundidos del Bósforo',
    description: 'Tres imperios. Mil naufragios. Un buzo que encontró algo que no debía encontrar.',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    isPremium: false,
    lat: 41.0082,
    lng: 28.9784,
    spotifyUrl: '#',
    soundcloudUrl: '#',
  },
  {
    id: '5',
    city: 'PRAGA',
    title: 'El Reloj que Predijo la Guerra',
    description: 'En la plaza más antigua de Europa, un reloj astronómico medieval guarda una profecía que nadie quiso escuchar.',
    imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    isPremium: true,
    lat: 50.0875,
    lng: 14.4214,
  },
  {
    id: '6',
    city: 'NUEVA YORK',
    title: 'El Fantasma del Metro',
    description: 'Línea 6, estación City Hall. Clausurada en 1945. Pero algunos conductores juran que alguien sigue esperando allí.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    isPremium: false,
    lat: 40.7128,
    lng: -74.0060,
    spotifyUrl: '#',
    soundcloudUrl: '#',
  },
  // Agregar más episodios duplicando estos con IDs distintos para simular scroll infinito
];

export const EpisodiosPage: React.FC = () => {
  const [displayedEpisodes, setDisplayedEpisodes] = useState(allEpisodes);
  const [isLoading, setIsLoading] = useState(false);

  // Simular carga de más episodios al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        if (!isLoading && displayedEpisodes.length < 50) { // Límite de 50 por ahora
          loadMoreEpisodes();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedEpisodes, isLoading]);

  const loadMoreEpisodes = () => {
    setIsLoading(true);
    
    // Simular delay de carga
    setTimeout(() => {
      const newEpisodes = allEpisodes.map((ep, i) => ({
        ...ep,
        id: `${ep.id}-${displayedEpisodes.length + i}`,
      }));
      
      setDisplayedEpisodes([...displayedEpisodes, ...newEpisodes]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-serif text-soda-glow mb-6">
            Todos los Episodios
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
          <p className="text-soda-fog font-light tracking-wide text-lg">
            {displayedEpisodes.length} viajes narrados
          </p>
        </motion.div>
        
        {/* Grid de episodios - 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <EpisodeCard episode={episode} />
            </motion.div>
          ))}
        </div>

        {/* Indicador de carga */}
        {isLoading && (
          <div className="text-center mt-12">
            <div className="loader mx-auto"></div>
            <p className="text-soda-fog text-sm mt-4">Cargando más episodios...</p>
          </div>
        )}

        {/* Fin de episodios */}
        {displayedEpisodes.length >= 50 && (
          <div className="text-center mt-16">
            <p className="text-soda-fog text-sm">
              Has visto todos los episodios disponibles
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
