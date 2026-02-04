import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EpisodeCard } from './components/EpisodeCard';
import { CustomCursor } from './effects/CustomCursor';
import { FloatingParticles } from './effects/FloatingParticles';
import { Bokeh } from './effects/Bokeh';
import './styles/globals.css';

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
];

function App() {
  return (
    <div className="relative min-h-screen bg-soda-night overflow-x-hidden">
      {/* Efectos de fondo atmosféricos */}
      <div className="film-grain" />
      <div className="vignette" />
      <div className="scanlines" />
      
      {/* Cursor personalizado */}
      <CustomCursor />
      
      {/* Partículas flotantes */}
      <FloatingParticles count={40} />
      
      {/* Bokeh de luces urbanas */}
      <Bokeh count={12} />
      
      {/* Navegación */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Sección de Últimos Episodios */}
      <section className="relative py-24 px-6">
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
          
          {/* Grid de episodios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mockEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Botón ver todos */}
          <div className="text-center mt-16">
            <button className="glow-button hoverable px-12 py-4 border border-soda-lamp border-opacity-30 text-soda-lamp rounded-sm hover:border-opacity-60 hover:bg-soda-lamp hover:bg-opacity-5 transition-all duration-300 font-light tracking-wider">
              VER TODOS LOS EPISODIOS
            </button>
          </div>
        </div>
      </section>

      {/* Sección Frecuencia Interna Preview */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-soda-deep to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="text-8xl text-soda-red animate-pulse-slow">◉</div>
            <div className="absolute inset-0 bg-soda-red rounded-full blur-3xl opacity-20" />
          </div>
          
          <h2 className="text-5xl font-serif text-soda-glow mb-6">
            Frecuencia Interna
          </h2>
          
          <p className="text-soda-fog text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Las historias que se cuentan cuando la noche ya está avanzada.
            <br />
            Episodios más profundos, investigaciones extendidas, contenido exclusivo.
          </p>
          
          <div className="space-y-4 mb-12 text-soda-mist text-sm">
            <p>• Episodios exclusivos cada mes</p>
            <p>• Mapas interactivos extendidos</p>
            <p>• Participación en futuros episodios</p>
            <p>• Número de Socio Efervescente</p>
            <p>• Acceso anticipado a lanzamientos</p>
          </div>
          
          <button className="glow-button hoverable px-12 py-4 bg-soda-red bg-opacity-20 border border-soda-red text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all duration-300 font-light tracking-wider backdrop-blur-sm">
            SUMARTE A LA FRECUENCIA
          </button>
          
          <p className="text-soda-fog text-xs mt-8 font-light">
            Tu aporte sostiene este proyecto independiente
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-soda-mist border-opacity-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo y descripción */}
            <div>
              <h3 className="text-2xl font-serif text-soda-glow mb-4">SODAROJA</h3>
              <p className="text-soda-fog text-sm font-light leading-relaxed">
                Un podcast narrativo que viaja por las ciudades del mundo contando historias reales con sensibilidad y profundidad.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="text-soda-lamp text-sm tracking-wider mb-4">NAVEGACIÓN</h4>
              <ul className="space-y-2 text-soda-fog text-sm">
                <li><a href="/episodios" className="hoverable hover:text-soda-lamp transition-colors">Episodios</a></li>
                <li><a href="/sobre" className="hoverable hover:text-soda-lamp transition-colors">¿Qué es esto?</a></li>
                <li><a href="/voces" className="hoverable hover:text-soda-lamp transition-colors">Las Tres Voces</a></li>
                <li><a href="/tienda" className="hoverable hover:text-soda-lamp transition-colors">Objetos Encontrados</a></li>
              </ul>
            </div>
            
            {/* Redes sociales */}
            <div>
              <h4 className="text-soda-lamp text-sm tracking-wider mb-4">SEGUINOS</h4>
              <div className="flex space-x-4">
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                  <span className="text-soda-accent">IG</span>
                </a>
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                  <span className="text-soda-accent">X</span>
                </a>
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                  <span className="text-soda-accent">YT</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-soda-mist border-opacity-10">
            <p className="text-soda-fog text-xs font-light">
              © 2026 SODAROJA — Un proyecto independiente argentino
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
