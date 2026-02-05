import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EpisodeCard } from '../components/EpisodeCard';

// Mock data para episodios
const mockEpisodes = [
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
];

export const HomePage: React.FC = () => {
  // Solo mostrar los primeros 6 en home
  const featuredEpisodes = mockEpisodes.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Sección de Episodios */}
      <section id="episodios" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-soda-glow mb-4">
              Viajes Recientes
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
            <p className="text-soda-fog font-light tracking-wide">
              Cada ciudad esconde historias que nunca imaginaste
            </p>
          </div>
          
          {/* Grid de episodios - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Botón ver todos */}
          <div className="text-center mt-16">
            <Link 
              to="/episodios"
              className="glow-button hoverable inline-block px-12 py-4 border border-soda-lamp border-opacity-30 text-soda-lamp rounded-sm hover:border-opacity-60 hover:bg-soda-lamp hover:bg-opacity-5 transition-all duration-300 font-light tracking-wider"
            >
              VER TODOS LOS EPISODIOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
