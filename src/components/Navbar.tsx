import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Episodios', href: '/episodios' },
    { label: 'Frecuencia Interna', href: '/frecuencia-interna' },
    { label: '¿Qué es esto?', href: '/sobre' },
    { label: 'Las Voces', href: '/voces' },
    { label: 'Objetos', href: '/tienda' },
  ];

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
          <a href="/" className="hoverable group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-soda-red border-opacity-60 rounded-sm flex items-center justify-center group-hover:border-opacity-100 transition-all duration-300">
                <div className="w-2 h-2 bg-soda-red rounded-full animate-pulse-slow" />
              </div>
              <span className="font-serif text-xl tracking-wider text-soda-glow">SODAROJA</span>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="hoverable text-soda-fog hover:text-soda-lamp transition-colors duration-300 text-sm tracking-wide font-light relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-soda-lamp group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Mi Cuenta */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hoverable px-6 py-2 border border-soda-accent border-opacity-40 rounded-sm text-soda-accent text-sm hover:bg-soda-accent hover:bg-opacity-10 hover:border-opacity-60 transition-all duration-300 backdrop-blur-sm"
          >
            Mi Cuenta
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
