import React from 'react';
import { motion } from 'framer-motion';
import { EpisodeCard } from '../components/EpisodeCard';
import { EpicSoundWaves } from '../effects/SectionBackgrounds';
import { demoEpisodes } from '../data/episodes';

export const EpisodiosPage: React.FC = () => {
  const allEpisodes = demoEpisodes;

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen overflow-hidden">
      <EpicSoundWaves />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-serif text-soda-glow mb-6">Todos los Episodios</h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
          <p className="text-soda-fog font-light tracking-wide text-lg">{allEpisodes.length} episodios disponibles</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEpisodes.map((episode, index) => (
            <motion.div key={episode.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <EpisodeCard episode={episode} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16"><p className="text-soda-fog text-sm">Mas episodios proximamente</p></div>
      </div>
    </section>
  );
};
