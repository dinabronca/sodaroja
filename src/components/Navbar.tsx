import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { getContent } from '../data/content';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const content = getContent();
  const names = content.sectionNames;

  // Simular estado de auth — en producción vendrá de un contexto/provider real
  const isLoggedIn = localStorage.getItem('sodaroja-user') !== null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: names.inicio, href: '/', special: '' },
    { label: names.queEsEsto, href: '/que-es-esto', special: '' },
    { label: names.equipo, href: '/equipo', special: '' },
    { label: names.episodios, href: '/episodios', special: 'episodios' },
    { label: names.frecuenciaInterna, href: '/frecuencia-interna', special: 'frecuencia' },
    { label: names.shop, href: '/shop', special: '' },
    { label: names.contacto, href: '/contacto', special: '' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-soda-night bg-opacity-95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="hoverable group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-soda-red border-opacity-60 rounded-sm flex items-center justify-center group-hover:border-opacity-100 transition-all duration-300">
                <div className="w-2 h-2 bg-soda-red rounded-full animate-pulse-slow" />
              </div>
              <span className="font-serif text-xl tracking-wider text-soda-glow">sodaroja</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => {
              const active = isActive(item.href);

              if (item.special === 'episodios') {
                return (
                  <motion.div key={item.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.5 }}>
                    <Link to={item.href} className={`hoverable transition-colors duration-300 text-sm tracking-wide font-medium relative group pixel-dispersion ${active ? 'text-soda-lamp' : 'text-soda-accent hover:text-soda-lamp'}`}>
                      {item.label}
                      <span className={`absolute bottom-0 left-0 h-px bg-soda-accent transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                  </motion.div>
                );
              }

              if (item.special === 'frecuencia') {
                return (
                  <motion.div key={item.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.5 }} className="glitch-container">
                    <Link to={item.href} className={`hoverable transition-colors duration-300 text-sm tracking-wide font-light relative group glitch-text ${active ? 'text-soda-glow' : 'text-soda-red hover:text-soda-glow'}`} data-text={item.label} style={{ textShadow: active ? '0 0 15px rgba(196, 85, 85, 0.8)' : '0 0 10px rgba(196, 85, 85, 0.5)', animation: 'pulsing-glow 3s ease-in-out infinite' }}>
                      {item.label}
                      <span className={`absolute bottom-0 left-0 h-px bg-soda-red transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div key={item.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.5 }}>
                  <Link to={item.href} className={`hoverable transition-colors duration-300 text-sm tracking-wide font-light relative group ${active ? 'text-soda-glow' : 'text-soda-fog hover:text-soda-lamp'}`}>
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${active ? 'w-full bg-soda-lamp' : 'w-0 bg-soda-lamp group-hover:w-full'}`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Auth button */}
          {isLoggedIn ? (
            <Link to="/mi-cuenta">
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="hoverable px-6 py-2 border border-soda-accent border-opacity-40 rounded-sm text-soda-accent text-sm hover:bg-soda-accent hover:bg-opacity-10 hover:border-opacity-60 transition-all duration-300 backdrop-blur-sm">
                Mi Cuenta
              </motion.button>
            </Link>
          ) : (
            <Link to="/unirse">
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="hoverable px-6 py-2 bg-soda-red bg-opacity-20 border border-soda-red border-opacity-50 rounded-sm text-soda-glow text-sm hover:bg-opacity-30 hover:border-opacity-70 transition-all duration-300 backdrop-blur-sm">
                Unirse
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
