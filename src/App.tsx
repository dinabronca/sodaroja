import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { QueEsEstoPage } from './pages/QueEsEstoPage';
import { EquipoPage } from './pages/EquipoPage';
import { EpisodiosPage } from './pages/EpisodiosPage';
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
          <Route path="/episodios" element={<EpisodiosPage />} />
          <Route path="/frecuencia-interna" element={<FrecuenciaInternaPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>

        {/* Footer - Versión Compacta */}
        <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo */}
              <div>
                <h3 className="text-xl font-serif text-soda-glow">SODAROJA</h3>
                <p className="text-soda-fog text-xs mt-2">Un proyecto independiente argentino</p>
              </div>
              
              {/* Links rápidos */}
              <div className="flex gap-6 text-soda-fog text-sm">
                <a href="/que-es-esto" className="hoverable hover:text-soda-lamp transition-colors">¿Qué es?</a>
                <a href="/equipo" className="hoverable hover:text-soda-lamp transition-colors">Equipo</a>
                <a href="/episodios" className="hoverable hover:text-soda-lamp transition-colors">Episodios</a>
                <a href="/contacto" className="hoverable hover:text-soda-lamp transition-colors">Contacto</a>
              </div>
              
              {/* Redes */}
              <div className="flex space-x-3">
                <a href="#" className="hoverable w-8 h-8 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">IG</span>
                </a>
                <a href="#" className="hoverable w-8 h-8 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">YT</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
