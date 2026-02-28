import React from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';
import { demoEpisodes } from '../data/episodes';

// City coords on a 1000x500 world map (simplified mercator)
const cityCoords: Record<string, { x: number; y: number }> = {
  'NUEVA YORK': { x: 280, y: 175 },
  'BUENOS AIRES': { x: 320, y: 370 },
  'PARÍS': { x: 480, y: 155 },
  'TOKIO': { x: 830, y: 180 },
  'ESTAMBUL': { x: 555, y: 175 },
  'PRAGA': { x: 510, y: 150 },
  'LONDRES': { x: 470, y: 140 },
  'BERLÍN': { x: 505, y: 140 },
  'ROMA': { x: 505, y: 175 },
  'MADRID': { x: 455, y: 175 },
  'BARCELONA': { x: 470, y: 172 },
  'MOSCÚ': { x: 575, y: 120 },
  'BANGKOK': { x: 745, y: 240 },
  'SINGAPUR': { x: 760, y: 285 },
  'SÍDNEY': { x: 870, y: 370 },
  'CIUDAD DE MÉXICO': { x: 190, y: 220 },
  'LIMA': { x: 240, y: 300 },
  'BOGOTÁ': { x: 250, y: 260 },
  'SANTIAGO': { x: 270, y: 360 },
  'MARRAKECH': { x: 450, y: 195 },
  'CAIRO': { x: 550, y: 200 },
  'MUMBAI': { x: 665, y: 225 },
  'SEÚL': { x: 810, y: 170 },
};

// Simplified world map paths (continents)
const worldPaths = [
  // North America
  'M 130,80 L 160,70 190,75 230,70 270,80 300,90 310,110 300,140 310,160 290,180 260,200 230,210 200,220 180,210 160,220 140,215 130,200 120,175 110,150 120,120 Z',
  // South America
  'M 250,240 L 270,235 300,250 320,280 330,310 325,340 310,370 290,390 270,385 255,360 250,330 245,300 240,270 Z',
  // Europe
  'M 440,70 L 470,60 500,65 530,70 550,80 555,100 540,120 520,130 510,150 500,160 480,165 460,155 450,140 440,120 435,100 Z',
  // Africa
  'M 440,180 L 470,175 500,180 530,185 555,200 560,230 555,260 545,290 530,320 510,340 490,345 470,335 455,310 445,280 440,250 435,220 Z',
  // Asia
  'M 555,60 L 600,50 650,55 700,60 750,70 800,80 830,90 850,100 860,130 850,160 830,180 800,195 770,210 740,230 720,240 700,235 680,220 660,200 640,180 620,160 600,140 580,120 560,100 Z',
  // Australia  
  'M 800,310 L 830,300 860,305 880,320 890,340 885,360 870,375 845,380 820,375 805,355 800,335 Z',
];

export const DestinationsMap: React.FC = () => {
  const content = getContent();
  const episodes = content.episodios?.items?.length ? content.episodios.items : demoEpisodes;
  const cities = [...new Set(episodes.map((e: any) => e.city))].map(city => ({
    name: city,
    coords: cityCoords[city as string] || null,
  })).filter(c => c.coords !== null);

  return (
    <section className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div className="w-10 h-px bg-soda-red" />
            <span className="text-soda-red text-[10px] tracking-[0.3em] uppercase font-light">Mapa de viajes</span>
            <div className="w-10 h-px bg-soda-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-soda-glow leading-[1.1] text-center mb-14">
            Donde <em className="text-soda-red">estuvimos</em>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full mx-auto"
          style={{ maxWidth: '800px' }}
        >
          <svg viewBox="0 0 1000 500" className="w-full h-auto">
            {/* World map continents */}
            {worldPaths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="rgba(212,197,176,0.04)"
                stroke="rgba(212,197,176,0.08)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              />
            ))}

            {/* Connection lines */}
            {cities.length > 1 && cities.slice(0, -1).map((c, i) => {
              const next = cities[i + 1];
              if (!c.coords || !next.coords) return null;
              const mx = (c.coords.x + next.coords.x) / 2;
              const my = Math.min(c.coords.y, next.coords.y) - 30;
              return (
                <motion.path
                  key={`line-${i}`}
                  d={`M ${c.coords.x} ${c.coords.y} Q ${mx} ${my} ${next.coords.x} ${next.coords.y}`}
                  fill="none"
                  stroke="rgba(196,85,85,0.15)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.3, duration: 1.2 }}
                />
              );
            })}

            {/* City dots + labels */}
            {cities.map((city, i) => (
              <g key={city.name as string}>
                {/* Pulse ring */}
                <motion.circle
                  cx={city.coords!.x} cy={city.coords!.y} r="8"
                  fill="none" stroke="rgba(196,85,85,0.2)" strokeWidth="0.5"
                  initial={{ opacity: 0, r: 3 }}
                  whileInView={{ opacity: [0, 0.5, 0], r: [3, 12, 3] }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.2, duration: 3, repeat: Infinity }}
                />
                {/* Dot */}
                <motion.circle
                  cx={city.coords!.x} cy={city.coords!.y} r="3.5"
                  fill="rgba(196,85,85,0.8)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4, type: 'spring' }}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(196,85,85,0.5))' }}
                />
                {/* City name */}
                <motion.text
                  x={city.coords!.x} y={city.coords!.y - 10}
                  textAnchor="middle"
                  fill="rgba(212,197,176,0.5)"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.1em"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  {city.name}
                </motion.text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
