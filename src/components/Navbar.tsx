import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: '¿Qué es esto?', href: '/que-es-esto' },
    { label: 'El Equipo', href: '/equipo' },
    { label: 'Episodios', href: '/episodios' },
    { label: 'Frecuencia Interna', href: '/frecuencia-interna' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const handleEpisodiosClick = (e: React.MouseEvent) => {
    // Ya no necesitamos scroll, va directo a /episodios
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
          {/* Logo */}
          <Link to="/" className="hoverable group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-soda-red border-opacity-60 rounded-sm flex items-center justify-center group-hover:border-opacity-100 transition-all duration-300">
                <div className="w-2 h-2 bg-soda-red rounded-full animate-pulse-slow" />
              </div>
              <span className="font-serif text-xl tracking-wider text-soda-glow">SODAROJA</span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => {
              const isEpisodios = item.label === 'Episodios';
              const isFrecuencia = item.label === 'Frecuencia Interna';
              
              if (isEpisodios) {
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Link
                      to={item.href}
                      className="hoverable text-soda-accent hover:text-soda-lamp transition-colors duration-300 text-sm tracking-wide font-medium relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-soda-accent group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              }
              
              if (isFrecuencia) {
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="glitch-container"
                  >
                    <Link
                      to={item.href}
                      className="hoverable text-soda-red hover:text-soda-glow transition-colors duration-300 text-sm tracking-wide font-light relative group glitch-text"
                      data-text={item.label}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-soda-red group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                );
              }
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    to={item.href}
                    className="hoverable text-soda-fog hover:text-soda-lamp transition-colors duration-300 text-sm tracking-wide font-light relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-soda-lamp group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mi Cuenta */}
          <Link to="/mi-cuenta">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hoverable px-6 py-2 border border-soda-accent border-opacity-40 rounded-sm text-soda-accent text-sm hover:bg-soda-accent hover:bg-opacity-10 hover:border-opacity-60 transition-all duration-300 backdrop-blur-sm"
            >
              Mi Cuenta
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
