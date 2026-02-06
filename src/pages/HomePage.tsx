import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EpisodeCard } from '../components/EpisodeCard';
import { demoEpisodes } from '../data/episodes';

export const HomePage: React.FC = () => {
  // Ya vienen ordenados del más reciente al más viejo
  const featuredEpisodes = demoEpisodes.slice(0, 6);

  return (
    <>
      <Hero />
      
      <section id="episodios" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-soda-glow mb-4">Viajes Recientes</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
            <p className="text-soda-fog font-light tracking-wide">Lo más nuevo de sodaroja</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/episodios" className="glow-button hoverable inline-block px-12 py-4 border border-soda-lamp border-opacity-30 text-soda-lamp rounded-sm hover:border-opacity-60 hover:bg-soda-lamp hover:bg-opacity-5 transition-all duration-300 font-light tracking-wider">
              VER TODOS LOS EPISODIOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
