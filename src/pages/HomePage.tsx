import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { EpisodeCard } from '../components/EpisodeCard';
import { getContent } from '../data/content';
import { demoEpisodes } from '../data/episodes';

// Subtle floating dust particles (position: absolute, inside section)
const DustParticles: React.FC<{ count?: number; color?: string }> = ({ count = 12, color = 'rgba(212,197,176,0.15)' }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const n = isMobile ? Math.floor(count / 3) : count;
  const particles = useMemo(() =>
    Array.from({ length: n }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      dur: 12 + Math.random() * 10,
      delay: Math.random() * 8,
    })),
    [n]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: color }}
          animate={{ y: [0, -60, 0], x: [0, 15, -10, 0], opacity: [0, 0.6, 0.3, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export const HomePage: React.FC = () => {
  const content = getContent();
  const storeEps = content.episodios?.items || [];
  const allRaw = storeEps.length > 0 ? storeEps : demoEpisodes;
  const sorted = useMemo(() =>
    [...allRaw].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')),
    [allRaw]
  );
  const featured = sorted.slice(0, 6);

  const episodeNumberMap = React.useMemo(() => {
    const byDate = [...allRaw].sort((a, b) => (a.publishDate || '').localeCompare(b.publishDate || ''));
    const map: Record<string, number> = {};
    byDate.forEach((ep: any, i: number) => { map[ep.id] = i + 1; });
    return map;
  }, [allRaw]);

  return (
    <>
      <Hero />
      <section id="episodios" className="relative py-16 sm:py-24 px-4 sm:px-6">
        <DustParticles count={15} color="rgba(196,85,85,0.12)" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif text-soda-glow mb-4">Viajes Recientes</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
            <p className="text-soda-fog font-light tracking-wide">Lo mas nuevo de sodaroja</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((episode: any, index: number) => (
              <EpisodeCard key={episode.id} episode={episode} isNewest={index === 0} episodeNumber={episodeNumberMap[episode.id]} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link to="/episodios" className="inline-block px-8 sm:px-12 py-3 sm:py-4 border border-soda-lamp/20 text-soda-lamp/70 rounded-sm hover:border-soda-lamp/35 hover:text-soda-lamp hover:bg-soda-lamp/3 transition-all duration-500 font-light tracking-widest text-[11px] sm:text-xs">
              VER TODOS LOS EPISODIOS
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
