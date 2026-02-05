import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { QueEsEstoPage } from './pages/QueEsEstoPage';
import { EquipoPage } from './pages/EquipoPage';
import { FrecuenciaInternaPage } from './pages/FrecuenciaInternaPage';
import { ShopPage } from './pages/ShopPage';
import { ContactoPage } from './pages/ContactoPage';
import { CustomCursor } from './effects/CustomCursor';
import { FloatingParticles } from './effects/FloatingParticles';
import { Bokeh } from './effects/Bokeh';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-soda-night overflow-x-hidden">
        {/* Efectos de fondo atmosféricos */}
        <div className="film-grain" />
        <div className="vignette" />
        <div className="scanlines" />
        
        {/* Cursor personalizado */}
        <CustomCursor />
        
        {/* Partículas flotantes */}
        <FloatingParticles count={40} />
        
        {/* Bokeh de luces urbanas */}
        <Bokeh count={12} />
        
        {/* Navegación */}
        <Navbar />
        
        {/* Rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/que-es-esto" element={<QueEsEstoPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/frecuencia-interna" element={<FrecuenciaInternaPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>

        {/* Footer */}
        <footer className="relative py-16 px-6 border-t border-soda-mist border-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Logo y descripción */}
              <div>
                <h3 className="text-2xl font-serif text-soda-glow mb-4">SODAROJA</h3>
                <p className="text-soda-fog text-sm font-light leading-relaxed">
                  Un podcast narrativo que viaja por las ciudades del mundo contando historias reales con sensibilidad y profundidad.
                </p>
              </div>
              
              {/* Links */}
              <div>
                <h4 className="text-soda-lamp text-sm tracking-wider mb-4">NAVEGACIÓN</h4>
                <ul className="space-y-2 text-soda-fog text-sm">
                  <li><a href="/que-es-esto" className="hoverable hover:text-soda-lamp transition-colors">¿Qué es esto?</a></li>
                  <li><a href="/equipo" className="hoverable hover:text-soda-lamp transition-colors">El Equipo</a></li>
                  <li><a href="/#episodios" className="hoverable hover:text-soda-lamp transition-colors">Episodios</a></li>
                  <li><a href="/frecuencia-interna" className="hoverable hover:text-soda-lamp transition-colors">Frecuencia Interna</a></li>
                  <li><a href="/shop" className="hoverable hover:text-soda-lamp transition-colors">Shop</a></li>
                  <li><a href="/contacto" className="hoverable hover:text-soda-lamp transition-colors">Contacto</a></li>
                </ul>
              </div>
              
              {/* Redes sociales */}
              <div>
                <h4 className="text-soda-lamp text-sm tracking-wider mb-4">SEGUINOS</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                    <span className="text-soda-accent">IG</span>
                  </a>
                  <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                    <span className="text-soda-accent">X</span>
                  </a>
                  <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all">
                    <span className="text-soda-accent">YT</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t border-soda-mist border-opacity-10">
              <p className="text-soda-fog text-xs font-light">
                © 2026 SODAROJA — Un proyecto independiente argentino
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
