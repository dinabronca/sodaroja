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
import { getContent } from './data/content';
import './styles/globals.css';

const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);

  return (
    <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            {/* Sifón de soda argentino — SVG fiel a la foto real */}
            <svg width="44" height="92" viewBox="0 0 44 92" className="opacity-75" style={{ filter: 'drop-shadow(0 0 10px rgba(196, 85, 85, 0.3))' }}>
              {/* ===== PICO SUPERIOR — tubo vertical que sube desde el cabezal ===== */}
              <rect x="20.5" y="4" width="3" height="8" rx="0.8" fill="#c45555" opacity="0.9" />
              
              {/* ===== BOQUILLA — tubo que sale en ángulo hacia la derecha-arriba ===== */}
              {/* Base de la boquilla (donde se une al tubo vertical) */}
              <path d="M 23 5.5 L 28 3 L 29 4 L 31 3 L 32 4.5 L 28 6.5 L 23 8" fill="#c45555" opacity="0.85" />
              {/* Punta de la boquilla — la parte final curvada hacia abajo */}
              <path d="M 31 3 L 35 2 Q 37 1.5 37 3 L 37 5 Q 37 6 35 5.5 L 32 4.5" fill="#c45555" opacity="0.9" />
              {/* Orificio de la boquilla */}
              <circle cx="36.5" cy="3.5" r="0.8" fill="#8b3030" opacity="0.7" />
              
              {/* ===== GATILLO / PALANCA — baja desde la boquilla ===== */}
              <path d="M 27 6 L 29 6.5 L 28.5 12 L 26 11.5 Z" fill="#c45555" opacity="0.7" />
              {/* Enganche del gatillo */}
              <rect x="25.5" y="10.5" width="4" height="1.5" rx="0.5" fill="#a04040" opacity="0.6" />
              
              {/* ===== CABEZAL CÓNICO ROJO ===== */}
              <path d="M 17.5 17 L 19.5 12.5 L 24.5 12.5 L 26.5 17 Z" fill="#c45555" opacity="0.9" />
              {/* Borde inferior del cabezal */}
              <ellipse cx="22" cy="17" rx="5" ry="1.5" fill="#a04040" opacity="0.6" />
              {/* Detalle superior del cabezal */}
              <rect x="19" y="11.5" width="6" height="1.5" rx="0.5" fill="#d46666" opacity="0.5" />
              
              {/* ===== CUELLO DE VIDRIO ===== */}
              <path d="M 18.5 18.5 L 16.5 24 L 27.5 24 L 25.5 18.5 Z" fill="rgba(200, 215, 230, 0.2)" stroke="rgba(200, 215, 230, 0.35)" strokeWidth="0.4" />
              <path d="M 19.5 19 L 18 23.5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" fill="none" />
              
              {/* ===== CUERPO DE VIDRIO — botella bulbosa ===== */}
              <path d="M 15.5 24 Q 10.5 32 9.5 42 Q 9 52 10 58 L 34 58 Q 35 52 34.5 42 Q 33.5 32 28.5 24 Z" 
                fill="rgba(200, 215, 230, 0.1)" stroke="rgba(200, 215, 230, 0.28)" strokeWidth="0.6" />
              
              {/* Brillos en el vidrio */}
              <path d="M 14 30 Q 12 40 13 53" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" fill="none" />
              <path d="M 16 32 Q 15 40 15 50" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" fill="none" />
              <ellipse cx="15" cy="38" rx="1" ry="3.5" fill="rgba(255,255,255,0.06)" />
              
              {/* Agua dentro */}
              <path d="M 10.5 44 Q 10 52 10.5 57 L 33.5 57 Q 34 52 33.5 44 Z" fill="rgba(180, 200, 225, 0.05)" />
              
              {/* Burbujitas */}
              <circle cx="18" cy="52" r="0.6" fill="rgba(255,255,255,0.15)" />
              <circle cx="24" cy="48" r="0.4" fill="rgba(255,255,255,0.12)" />
              <circle cx="21" cy="55" r="0.35" fill="rgba(255,255,255,0.14)" />
              <circle cx="26" cy="53" r="0.5" fill="rgba(255,255,255,0.1)" />
              
              {/* ===== JAULA DE PLÁSTICO ROJO — 3 bandas curvadas ===== */}
              <path d="M 10 36 Q 22 34.5 34 36" stroke="#c45555" strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round" />
              <path d="M 9.5 44.5 Q 22 43 34.5 44.5" stroke="#c45555" strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round" />
              <path d="M 10 53 Q 22 51.5 34 53" stroke="#c45555" strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round" />
              
              {/* Barrotes verticales de la jaula (conectan bandas) */}
              <line x1="10" y1="36" x2="10" y2="58" stroke="#c45555" strokeWidth="0.6" opacity="0.3" />
              <line x1="34" y1="36" x2="34" y2="58" stroke="#c45555" strokeWidth="0.6" opacity="0.3" />
              
              {/* ===== BASE SÓLIDA ROJA ===== */}
              <path d="M 9 58 Q 8 61 8 66 Q 8 74 11 76 L 33 76 Q 36 74 36 66 Q 36 61 35 58 Z" fill="#c45555" opacity="0.85" />
              <path d="M 11 67 Q 9 72 12 75 L 32 75 Q 35 72 33 67" fill="#8b3030" opacity="0.3" />
              <ellipse cx="22" cy="76" rx="12" ry="2.5" fill="#a04040" opacity="0.55" />
            </svg>
            
            <div>
              <h3 className="text-lg font-serif text-soda-glow mb-1">sodaroja</h3>
              <p className="text-soda-fog text-xs">© 2026</p>
            </div>
          </div>
          
          {/* Redes sociales dinámicas */}
          <div className="grid grid-cols-4 gap-3">
            {visibleLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className="hoverable w-12 h-12 border border-soda-accent border-opacity-40 rounded-sm flex items-center justify-center hover:border-opacity-80 hover:bg-soda-accent hover:bg-opacity-10 transition-all text-xs"
              >
                <span className="text-soda-accent">{link.abbr}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-soda-night overflow-x-hidden">
        <div className="film-grain" />
        <div className="vignette" />
        <div className="scanlines" />
        <CustomCursor />
        <FloatingParticles count={40} />
        <Navbar />
        
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;
