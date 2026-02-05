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
import { AdminPage } from './pages/AdminPage';
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        {/* Footer - Sifón vintage + Grid de redes */}
        <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center gap-12">
              {/* Izquierda: Sifón de soda argentino — ilustración fiel al producto */}
              <div className="flex items-center gap-4">
                <svg
                  width="48"
                  height="100"
                  viewBox="0 0 48 100"
                  className="opacity-75"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(196, 85, 85, 0.3))' }}
                >
                  {/* ===== PICO / BOQUILLA — sale hacia la derecha ===== */}
                  {/* Tubo vertical del pico */}
                  <rect x="22" y="2" width="4" height="10" rx="1" fill="#c45555" opacity="0.9" />
                  {/* Boquilla que sale hacia la derecha en ángulo */}
                  <path d="M 26 4 L 36 2 L 37 4.5 L 26 7" fill="#c45555" opacity="0.85" />
                  {/* Punta de la boquilla */}
                  <path d="M 36 2 L 40 1.5 L 40 3 L 37 4.5 Z" fill="#a04040" opacity="0.9" />
                  {/* Gatillo / palanca que baja */}
                  <path d="M 26 6 L 30 7 L 30 12 L 27 11 Z" fill="#c45555" opacity="0.75" />
                  
                  {/* ===== CABEZAL CÓNICO — plástico rojo ===== */}
                  <path d="M 19 18 L 21 12 L 27 12 L 29 18 Z" fill="#c45555" opacity="0.9" />
                  {/* Borde inferior del cabezal */}
                  <ellipse cx="24" cy="18" rx="5.5" ry="1.8" fill="#a04040" opacity="0.65" />
                  
                  {/* ===== CUELLO DE VIDRIO ===== */}
                  <path d="M 20 19 L 18 26 L 30 26 L 28 19 Z" fill="rgba(200, 215, 230, 0.2)" stroke="rgba(200, 215, 230, 0.35)" strokeWidth="0.5" />
                  <path d="M 21 20 L 20 25" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" fill="none" />
                  
                  {/* ===== CUERPO DE VIDRIO — forma bulbosa ===== */}
                  <path d="M 17 26 Q 12 34 11 44 Q 10 54 11 62 L 37 62 Q 38 54 37 44 Q 36 34 31 26 Z" 
                    fill="rgba(200, 215, 230, 0.12)" 
                    stroke="rgba(200, 215, 230, 0.3)" 
                    strokeWidth="0.7" />
                  
                  {/* Brillos en el vidrio */}
                  <path d="M 16 32 Q 14 42 15 55" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                  <path d="M 18 34 Q 17 42 17 52" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none" />
                  <ellipse cx="17" cy="40" rx="1.2" ry="4" fill="rgba(255,255,255,0.08)" />
                  
                  {/* Agua dentro */}
                  <path d="M 12 46 Q 11 54 12 61 L 36 61 Q 37 54 36 46 Z" fill="rgba(180, 200, 225, 0.06)" />
                  
                  {/* Burbujitas */}
                  <circle cx="20" cy="54" r="0.7" fill="rgba(255,255,255,0.18)" />
                  <circle cx="26" cy="50" r="0.5" fill="rgba(255,255,255,0.14)" />
                  <circle cx="23" cy="57" r="0.4" fill="rgba(255,255,255,0.16)" />
                  <circle cx="28" cy="55" r="0.6" fill="rgba(255,255,255,0.1)" />
                  
                  {/* ===== JAULA DE PLÁSTICO ROJO — 3 bandas horizontales ===== */}
                  <rect x="11" y="38" width="26" height="2.5" rx="0.5" fill="#c45555" opacity="0.65" />
                  <rect x="11" y="46" width="26" height="2.5" rx="0.5" fill="#c45555" opacity="0.65" />
                  <rect x="11" y="54" width="26" height="2.5" rx="0.5" fill="#c45555" opacity="0.65" />
                  
                  {/* ===== BASE SÓLIDA DE PLÁSTICO ROJO ===== */}
                  <path d="M 10 62 Q 9 65 9 70 Q 9 78 12 80 L 36 80 Q 39 78 39 70 Q 39 65 38 62 Z" 
                    fill="#c45555" opacity="0.85" />
                  {/* Degradado oscuro en base */}
                  <path d="M 12 70 Q 10 75 13 79 L 35 79 Q 38 75 36 70" 
                    fill="#8b3030" opacity="0.35" />
                  {/* Fondo de la base */}
                  <ellipse cx="24" cy="80" rx="14" ry="3" fill="#a04040" opacity="0.6" />
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
