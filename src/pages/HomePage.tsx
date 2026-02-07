import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EpisodeCard } from '../components/EpisodeCard';
import { getContent } from '../data/content';
import { demoEpisodes } from '../data/episodes';

export const HomePage: React.FC = () => {
  const content = getContent();
  const storeEps = content.episodios?.items || [];
  const allRaw = storeEps.length > 0 ? storeEps : demoEpisodes;
  const sorted = useMemo(() =>
    [...allRaw].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')),
    [allRaw]
  );
  const featured = sorted.slice(0, 6);

  return (
    <>
      <Hero />
      <section id="episodios" className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif text-soda-glow mb-4">Viajes Recientes</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
            <p className="text-soda-fog font-light tracking-wide">Lo mas nuevo de sodaroja</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((episode: any, index: number) => (
              <EpisodeCard key={episode.id} episode={episode} isNewest={index === 0} />
            ))}
          </div>
          <div className="text-center mt-12 sm:mt-16">
            <Link to="/episodios" className="glow-button hoverable inline-block px-8 sm:px-12 py-3 sm:py-4 border border-soda-lamp border-opacity-30 text-soda-lamp rounded-sm hover:border-opacity-60 hover:bg-soda-lamp hover:bg-opacity-5 transition-all duration-300 font-light tracking-wider text-sm sm:text-base">
              VER TODOS LOS EPISODIOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
