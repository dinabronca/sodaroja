import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  birthYear: number;
  cityBorn: string;
  cityCurrent: string;
  zodiac: string;
  photoUrl: string;
  socials: {
      instagram: "#",
      twitter: "#",
      youtube: "#",
      tiktok: "#",
    },
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  favorites: {
    iceCream: string;
    drink: string;
    book: string;
    movie: string;
    series: string;
    character: string;
    celebrity: string;
    album: string;
    podcast: string;
    sport: string;
    food: string;
    smell: string;
    sound: string;
    timeOfDay: string;
    weather: string;
    tattoos: number;
  };
  cities: {
    dreamVisit: string;
    wouldntVisit: string;
    wouldLive: string;
    bestFood: string;
    wouldPropose: string;
    wouldIsolate: string;
    meetPeople: string;
    vacation: string;
    allExpensesPaid: string;
    writeBook: string;
    recordEpisode: string;
    nostalgia: string;
  };
}

// DATOS DE EJEMPLO - Reemplazar con datos reales desde admin
const teamMembers: TeamMember[] = [
  {
    name: 'Mikasa',
    role: 'Narradora Principal',
    birthYear: 1995,
    cityBorn: 'Buenos Aires',
    cityCurrent: 'Buenos Aires',
    zodiac: 'Escorpio',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    socials: {
      instagram: "#",
      twitter: "#",
      youtube: "#",
      tiktok: "#",
    },
      instagram: '#',
      youtube: '#',
    },
    favorites: {
      iceCream: 'Chocolate amargo',
      drink: 'Café negro',
      book: 'Cien años de soledad',
      movie: 'Blade Runner',
      series: 'Dark',
      character: 'Don Draper',
      celebrity: 'David Bowie',
      album: 'OK Computer',
      podcast: 'Serial',
      sport: 'Natación',
      food: 'Pizza napolitana',
      smell: 'Café recién hecho',
      sound: 'Lluvia',
      timeOfDay: '3:00 AM',
      weather: 'Lluvia nocturna',
      tattoos: 3,
    },
    cities: {
      dreamVisit: 'Tokio',
      wouldntVisit: 'Dubai',
      wouldLive: 'Berlín',
      bestFood: 'Roma',
      wouldPropose: 'París',
      wouldIsolate: 'Islandia',
      meetPeople: 'Barcelona',
      vacation: 'Kioto',
      allExpensesPaid: 'Nueva York',
      writeBook: 'Praga',
      recordEpisode: 'Estambul',
      nostalgia: 'Lisboa',
    },
  },
  {
    name: 'Violet',
    role: 'Co-Narradora',
    birthYear: 1992,
    cityBorn: 'Rosario',
    cityCurrent: 'Barcelona',
    zodiac: 'Piscis',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    socials: {
      instagram: "#",
      twitter: "#",
      youtube: "#",
      tiktok: "#",
    },
      instagram: '#',
      youtube: '#',
    },
    favorites: {
      iceCream: 'Limón',
      drink: 'Té verde',
      book: 'El principito',
      movie: 'Your Name',
      series: 'Stranger Things',
      character: 'Hermione Granger',
      celebrity: 'Björk',
      album: 'The Dark Side of the Moon',
      podcast: 'Radiolab',
      sport: 'Yoga',
      food: 'Sushi',
      smell: 'Jazmín',
      sound: 'Viento',
      timeOfDay: '6:00 AM',
      weather: 'Niebla matinal',
      tattoos: 5,
    },
    cities: {
      dreamVisit: 'Kioto',
      wouldntVisit: 'Las Vegas',
      wouldLive: 'Ámsterdam',
      bestFood: 'Bangkok',
      wouldPropose: 'Santorini',
      wouldIsolate: 'Noruega',
      meetPeople: 'Lisboa',
      vacation: 'Bali',
      allExpensesPaid: 'Tokio',
      writeBook: 'Edimburgo',
      recordEpisode: 'Praga',
      nostalgia: 'París',
    },
  },
  {
    name: 'Levi',
    role: 'Editor y Productor',
    birthYear: 1988,
    cityBorn: 'Córdoba',
    cityCurrent: 'Buenos Aires',
    zodiac: 'Capricornio',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    socials: {
      instagram: "#",
      twitter: "#",
      youtube: "#",
      tiktok: "#",
    },
      instagram: '#',
      youtube: '#',
    },
    favorites: {
      iceCream: 'Dulce de leche',
      drink: 'Fernet con coca',
      book: 'Rayuela',
      movie: 'Inception',
      series: 'Breaking Bad',
      character: 'Tyler Durden',
      celebrity: 'Thom Yorke',
      album: 'In Rainbows',
      podcast: '99% Invisible',
      sport: 'Escalada',
      food: 'Asado',
      smell: 'Tierra mojada',
      sound: 'Tormenta',
      timeOfDay: '11:00 PM',
      weather: 'Tormenta eléctrica',
      tattoos: 0,
    },
    cities: {
      dreamVisit: 'Reikiavik',
      wouldntVisit: 'Mumbai',
      wouldLive: 'Copenhague',
      bestFood: 'Ciudad de México',
      wouldPropose: 'Venecia',
      wouldIsolate: 'Patagonia',
      meetPeople: 'Berlín',
      vacation: 'Noruega',
      allExpensesPaid: 'Islandia',
      writeBook: 'San Sebastián',
      recordEpisode: 'Berlín',
      nostalgia: 'Montevideo',
    },
  },
];

export const ElEquipo: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  return (
    <section id="equipo" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            El Equipo
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
          <p className="text-soda-fog font-light">
            Las personas detrás de cada historia
          </p>
        </motion.div>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm overflow-hidden hover:border-soda-accent hover:border-opacity-40 transition-all duration-300 group">
                {/* Foto - ratio 3:4 con partículas */}
                <div className="relative aspect-[3/4] overflow-hidden max-h-80 bg-soda-deep">
                  {/* Partículas flotantes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-soda-lamp rounded-full pointer-events-none z-10"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  <motion.img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soda-night via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Info básica */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-soda-glow mb-2">{member.name}</h3>
                  <p className="text-soda-accent text-sm mb-4">{member.role}</p>
                  
                  <div className="space-y-2 text-soda-fog text-xs mb-6">
                    <p>Nacido en {member.cityBorn} ({member.birthYear})</p>
                    <p>Vive en {member.cityCurrent}</p>
                    <p>{member.zodiac}</p>
                  </div>

                  {/* Redes sociales - 4 redes (IG y Twitter obligatorias) */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-soda-mist border-opacity-20">
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors"
                        title="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors"
                        title="Twitter/X"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {member.socials.youtube && (
                      <a
                        href={member.socials.youtube}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors"
                        title="YouTube"
                      >
                        <Youtube size={20} />
                      </a>
                    )}
                    {member.socials.tiktok && (
                      <a
                        href={member.socials.tiktok}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors text-sm"
                        title="TikTok"
                      >
                        TT
                      </a>
                    )}
                  </div>

                  {/* Favoritos */}
                  <div className="mb-6">
                    <h4 className="text-soda-lamp text-xs font-medium mb-3 tracking-wider">PERFIL HUMANO</h4>
                    <div className="space-y-2 text-xs">
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Helado favorito:</span> {member.favorites.iceCream}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Bebida:</span> {member.favorites.drink}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Libro:</span> {member.favorites.book}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Película:</span> {member.favorites.movie}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Serie:</span> {member.favorites.series}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Personaje:</span> {member.favorites.character}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Famoso favorito:</span> {member.favorites.celebrity}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Álbum:</span> {member.favorites.album}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Podcast:</span> {member.favorites.podcast}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Deporte:</span> {member.favorites.sport}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Comida:</span> {member.favorites.food}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Olor favorito:</span> {member.favorites.smell}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Sonido que relaja:</span> {member.favorites.sound}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Hora del día:</span> {member.favorites.timeOfDay}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Clima favorito:</span> {member.favorites.weather}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Tatuajes:</span> {member.favorites.tattoos}
                      </div>
                    </div>
                  </div>

                  {/* Ciudades */}
                  <div>
                    <h4 className="text-soda-lamp text-xs font-medium mb-3 tracking-wider">CIUDADES</h4>
                    <div className="space-y-2 text-xs">
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Sueña visitar:</span> {member.cities.dreamVisit}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">No visitaría:</span> {member.cities.wouldntVisit}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Viviría en:</span> {member.cities.wouldLive}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Mejor comida:</span> {member.cities.bestFood}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Propondría casamiento:</span> {member.cities.wouldPropose}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Se aislaría:</span> {member.cities.wouldIsolate}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Conocer gente:</span> {member.cities.meetPeople}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Vacacionar siempre:</span> {member.cities.vacation}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Todo pago:</span> {member.cities.allExpensesPaid}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Escribir un libro:</span> {member.cities.writeBook}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Grabar episodio:</span> {member.cities.recordEpisode}
                      </div>
                      <div className="text-soda-fog">
                        <span className="text-soda-accent">Nostalgia sin haber ido:</span> {member.cities.nostalgia}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
