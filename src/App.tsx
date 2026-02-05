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
import { MiCuentaPage } from './pages/MiCuentaPage';
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
          <Route path="/mi-cuenta" element={<MiCuentaPage />} />
        </Routes>

        {/* Footer - Minimalista y simétrico */}
        <footer className="relative py-8 px-6 border-t border-soda-mist border-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              {/* Izquierda: Tagline */}
              <div>
                <h3 className="text-xl font-serif text-soda-glow mb-1">SODAROJA</h3>
                <p className="text-soda-fog text-xs">Historias reales de ciudades lejanas</p>
                <p className="text-soda-fog text-xs mt-1">© 2026</p>
              </div>
              
              {/* Derecha: Redes sociales */}
              <div className="flex space-x-3">
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">IG</span>
                </a>
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">X</span>
                </a>
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">YT</span>
                </a>
                <a href="#" className="hoverable w-10 h-10 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">SP</span>
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
