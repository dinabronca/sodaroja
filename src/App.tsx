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

        {/* Footer - Sifón vintage + Grid de redes */}
        <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center gap-12">
              {/* Izquierda: Sifón vintage argentino */}
              <div className="flex items-center gap-4">
                <svg
                  width="60"
                  height="90"
                  viewBox="0 0 60 90"
                  className="opacity-60"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(139, 58, 58, 0.3))' }}
                >
                  {/* Tapa superior */}
                  <ellipse cx="30" cy="12" rx="8" ry="4" fill="#8a94a6" opacity="0.8" />
                  <rect x="28" y="8" width="4" height="8" fill="#8a94a6" opacity="0.7" />
                  
                  {/* Cuello */}
                  <path d="M 25 20 L 22 28 L 38 28 L 35 20 Z" fill="#e8dcc8" opacity="0.6" />
                  
                  {/* Cuerpo principal del sifón */}
                  <ellipse cx="30" cy="28" rx="16" ry="3" fill="#e8dcc8" opacity="0.4" />
                  <rect x="14" y="28" width="32" height="45" fill="#e8dcc8" opacity="0.3" rx="2" />
                  <ellipse cx="30" cy="73" rx="16" ry="3" fill="#e8dcc8" opacity="0.4" />
                  
                  {/* Brillos vintage */}
                  <path d="M 20 35 Q 22 50 20 65" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.3" fill="none" />
                  <circle cx="24" cy="40" r="2" fill="#ffffff" opacity="0.2" />
                  
                  {/* Base */}
                  <ellipse cx="30" cy="82" rx="12" ry="4" fill="#8a94a6" opacity="0.7" />
                </svg>
                
                <div>
                  <h3 className="text-lg font-serif text-soda-glow mb-1">sodaroja</h3>
                  <p className="text-soda-fog text-xs">© 2026</p>
                </div>
              </div>
              
              {/* Derecha: Grid de redes (editable desde admin) */}
              <div className="grid grid-cols-4 gap-3">
                {/* TODO: Conectar con admin para editar estas redes */}
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">IG</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">X</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">YT</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">SP</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">SC</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">TT</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">AP</span>
                </a>
                <a href="#" className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs">
                  <span className="text-soda-accent">+</span>
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
