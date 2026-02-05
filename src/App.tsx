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
              {/* Izquierda: Sifón de soda argentino — ilustración estilo página */}
              <div className="flex items-center gap-4">
                <svg
                  width="50"
                  height="95"
                  viewBox="0 0 50 95"
                  className="opacity-70"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(196, 85, 85, 0.25))' }}
                >
                  {/* Palanca / gatillo — plástico rojo */}
                  <path d="M 24 8 L 24 4 L 34 2 L 34 5 L 26 7 Z" fill="#c45555" opacity="0.85" />
                  <path d="M 34 2 L 38 1 L 38 4 L 34 5 Z" fill="#a04040" opacity="0.8" />
                  
                  {/* Cabezal del sifón — plástico rojo */}
                  <path d="M 21 14 L 21 8 Q 21 5 25 5 Q 29 5 29 8 L 29 14 Z" fill="#c45555" opacity="0.9" />
                  <ellipse cx="25" cy="14" rx="4.5" ry="1.5" fill="#a04040" opacity="0.6" />
                  {/* Piquito del cabezal */}
                  <rect x="23.5" y="3" width="3" height="4" rx="1" fill="#c45555" opacity="0.9" />
                  
                  {/* Cuello de vidrio — transparente */}
                  <path d="M 22 15 L 20 22 L 30 22 L 28 15 Z" fill="rgba(200, 210, 225, 0.25)" stroke="rgba(200, 210, 225, 0.4)" strokeWidth="0.5" />
                  {/* Brillo en cuello */}
                  <path d="M 23 16 L 22 21" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
                  
                  {/* Cuerpo de vidrio — botella transparente con forma bulbosa */}
                  <path d="M 19 22 Q 14 30 13 40 Q 12 50 13 58 L 37 58 Q 38 50 37 40 Q 36 30 31 22 Z" 
                    fill="rgba(200, 210, 225, 0.15)" 
                    stroke="rgba(200, 210, 225, 0.35)" 
                    strokeWidth="0.8" />
                  
                  {/* Brillos en el vidrio */}
                  <path d="M 18 28 Q 17 38 17 50" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none" />
                  <path d="M 20 30 Q 19 40 19 48" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" fill="none" />
                  <ellipse cx="20" cy="35" rx="1.5" ry="3" fill="rgba(255,255,255,0.12)" />
                  
                  {/* Agua carbonatada dentro del vidrio */}
                  <path d="M 14 42 Q 13 50 14 57 L 36 57 Q 37 50 36 42 Z" fill="rgba(180, 200, 220, 0.08)" />
                  {/* Burbujitas */}
                  <circle cx="22" cy="50" r="0.8" fill="rgba(255,255,255,0.2)" />
                  <circle cx="27" cy="46" r="0.6" fill="rgba(255,255,255,0.15)" />
                  <circle cx="24" cy="53" r="0.5" fill="rgba(255,255,255,0.18)" />
                  <circle cx="29" cy="51" r="0.7" fill="rgba(255,255,255,0.12)" />
                  
                  {/* Rejilla/jaula de plástico rojo — bandas horizontales */}
                  <rect x="13" y="35" width="24" height="3" rx="0.5" fill="#c45555" opacity="0.7" />
                  <rect x="13" y="42" width="24" height="3" rx="0.5" fill="#c45555" opacity="0.7" />
                  <rect x="13" y="49" width="24" height="3" rx="0.5" fill="#c45555" opacity="0.7" />
                  
                  {/* Base de plástico rojo — sólida */}
                  <path d="M 12 58 Q 11 60 11 65 Q 11 72 13 74 L 37 74 Q 39 72 39 65 Q 39 60 38 58 Z" 
                    fill="#c45555" opacity="0.85" />
                  {/* Sombra en la base */}
                  <path d="M 13 65 Q 12 70 14 73 L 36 73 Q 38 70 37 65" 
                    fill="#8b3030" opacity="0.4" />
                  
                  {/* Fondo de la base */}
                  <ellipse cx="25" cy="74" rx="13" ry="3" fill="#a04040" opacity="0.7" />
                  
                  {/* Reflejo sutil general */}
                  <path d="M 16 25 Q 15 35 15 55" stroke="rgba(212, 197, 176, 0.12)" strokeWidth="0.4" fill="none" />
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
