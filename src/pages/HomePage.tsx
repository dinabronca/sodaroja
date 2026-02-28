import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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

  const episodeNumberMap = React.useMemo(() => {
    const byDate = [...allRaw].sort((a, b) => (a.publishDate || '').localeCompare(b.publishDate || ''));
    const map: Record<string, number> = {};
    byDate.forEach((ep: any, i: number) => { map[ep.id] = i + 1; });
    return map;
  }, [allRaw]);

  return (
    <>
      <Hero />

      {/* ===== ÚLTIMOS DESTINOS — estilo editorial ===== */}
      <section id="episodios" className="relative py-20 sm:py-28 px-4 sm:px-6">
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute" style={{ left: '-5%', bottom: '10%', width: '50%', height: '50%', background: 'radial-gradient(ellipse, rgba(196,85,85,0.03) 0%, transparent 60%)', filter: 'blur(50px)' }} />
          <div className="absolute" style={{ right: '-5%', top: '20%', width: '40%', height: '40%', background: 'radial-gradient(ellipse, rgba(138,155,196,0.03) 0%, transparent 60%)', filter: 'blur(50px)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header editorial — alineado izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 sm:mb-20"
          >
            {/* Línea roja + label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-soda-red/60" />
              <span className="text-soda-red/80 text-[10px] tracking-[0.3em] uppercase font-light">Viajes recientes</span>
            </div>

            {/* Título grande con cursiva */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-soda-glow leading-[1.1]">
              Los últimos <em className="text-soda-red/80">destinos</em>
            </h2>
          </motion.div>

          {/* Grid de episodios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((episode: any, index: number) => (
              <EpisodeCard key={episode.id} episode={episode} isNewest={index === 0} episodeNumber={episodeNumberMap[episode.id]} />
            ))}
          </div>

          {/* Ver todos — al final, centrado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mt-14 sm:mt-20"
          >
            <Link to="/episodios" className="group inline-flex items-center gap-3 px-10 py-4 border border-soda-mist/15 text-soda-fog/50 rounded-sm hover:border-soda-mist/25 hover:text-soda-lamp transition-all duration-700 tracking-[0.25em] text-[10px] uppercase">
              Ver todos los episodios
              <ArrowRight size={13} className="text-soda-fog/30 group-hover:text-soda-lamp/50 group-hover:translate-x-1 transition-all duration-700" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
