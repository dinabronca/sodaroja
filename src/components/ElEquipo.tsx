import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  birthYear: number;
  cityBorn: string;
  cityCurrent: string;
  zodiac: string;
  photoUrl: string;
  socials: {
    instagram?: string;
    youtube?: string;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
            >
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm overflow-hidden hover:border-soda-accent hover:border-opacity-40 transition-all duration-300">
                {/* Foto - ratio 3:4 pero más chica */}
                <div className="relative aspect-[3/4] overflow-hidden max-h-80">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soda-night via-transparent to-transparent opacity-60" />
                </div>

                {/* Info básica */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-soda-glow mb-2">{member.name}</h3>
                  <p className="text-soda-accent text-sm mb-4">{member.role}</p>
                  
                  <div className="space-y-2 text-soda-fog text-xs">
                    <p>Nacido en {member.cityBorn} ({member.birthYear})</p>
                    <p>Vive en {member.cityCurrent}</p>
                    <p>{member.zodiac}</p>
                  </div>

                  {/* Redes sociales */}
                  <div className="flex gap-4 mt-6">
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {member.socials.youtube && (
                      <a
                        href={member.socials.youtube}
                        className="hoverable text-soda-accent hover:text-soda-lamp transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube size={20} />
                      </a>
                    )}
                  </div>

                  {/* Indicador de expandir */}
                  <div className="mt-6 text-soda-accent text-xs text-center">
                    {selectedMember === index ? 'Click para cerrar' : 'Click para conocer más'}
                  </div>
                </div>
              </div>

              {/* Detalles expandibles */}
              <AnimatePresence>
                {selectedMember === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6 overflow-hidden"
                  >
                    {/* Favoritos */}
                    <div className="mb-6">
                      <h4 className="text-soda-lamp text-sm font-medium mb-4 tracking-wider">PERFIL HUMANO</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {Object.entries(member.favorites).map(([key, value]) => (
                          <div key={key} className="text-soda-fog">
                            <span className="text-soda-accent capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>{' '}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ciudades */}
                    <div>
                      <h4 className="text-soda-lamp text-sm font-medium mb-4 tracking-wider">CIUDADES</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {Object.entries(member.cities).map(([key, value]) => (
                          <div key={key} className="text-soda-fog">
                            <span className="text-soda-accent capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>{' '}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
