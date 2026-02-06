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
import { UnirsePage } from './pages/UnirsePage';
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
            {/* Sifón de soda argentino — SVG fiel a la foto */}
            <svg width="40" height="88" viewBox="0 0 40 88" className="opacity-80" style={{ filter: 'drop-shadow(0 0 8px rgba(196, 85, 85, 0.25))' }}>
              {/* PICO: tubo que sube desde el cabezal, curva y apunta hacia adelante-abajo */}
              {/* Tubo vertical que sube */}
              <path d="M 19 12 L 19 5 Q 19 2 21 2 L 21 2" stroke="rgba(220,230,240,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Curva del pico hacia la derecha */}
              <path d="M 20 2.5 Q 24 1 28 2 Q 31 3 32 5" stroke="rgba(220,230,240,0.5)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              {/* Boquilla — punta que apunta hacia abajo */}
              <path d="M 31.5 4.5 L 33 7 L 31 8 L 29 6" fill="#cc4444" opacity="0.85" />
              <circle cx="32" cy="7.5" r="0.6" fill="#882222" opacity="0.7" />
              {/* Gatillo/palanca que cuelga */}
              <path d="M 25 3 L 26.5 4 L 26 9 L 24 8.5 Z" fill="#cc4444" opacity="0.65" />
              
              {/* CABEZAL CÓNICO ROJO */}
              <path d="M 15 16 L 17 11 L 23 11 L 25 16 Z" fill="#cc4444" opacity="0.9" />
              <ellipse cx="20" cy="16" rx="5.5" ry="1.5" fill="#992222" opacity="0.5" />
              
              {/* CUELLO DE VIDRIO — angosto */}
              <path d="M 16.5 17.5 L 14.5 23 L 25.5 23 L 23.5 17.5 Z" fill="rgba(210,220,235,0.15)" stroke="rgba(210,220,235,0.3)" strokeWidth="0.4" />
              <path d="M 17.5 18 L 16 22.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" fill="none" />
              
              {/* CUERPO DE VIDRIO — botella bulbosa */}
              <path d="M 13.5 23 Q 8 31 7 41 Q 6.5 51 7.5 57 L 32.5 57 Q 33.5 51 33 41 Q 32 31 26.5 23 Z" 
                fill="rgba(210,220,235,0.08)" stroke="rgba(210,220,235,0.25)" strokeWidth="0.5" />
              {/* Brillos */}
              <path d="M 11.5 29 Q 10 39 10.5 52" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
              <ellipse cx="12" cy="37" rx="0.8" ry="3" fill="rgba(255,255,255,0.05)" />
              
              {/* JAULA ROJA — 3 barras horizontales anchas con espacios entre ellas */}
              {/* Barra 1 */}
              <path d="M 7.5 33 Q 20 31 32.5 33" stroke="#cc4444" strokeWidth="3.5" fill="none" opacity="0.7" strokeLinecap="round" />
              {/* Barra 2 */}
              <path d="M 7 42.5 Q 20 41 33 42.5" stroke="#cc4444" strokeWidth="3.5" fill="none" opacity="0.7" strokeLinecap="round" />
              {/* Barra 3 */}
              <path d="M 7.5 52 Q 20 50.5 32.5 52" stroke="#cc4444" strokeWidth="3.5" fill="none" opacity="0.7" strokeLinecap="round" />
              
              {/* BASE SÓLIDA ROJA — más ancha que el cuerpo */}
              <path d="M 6 57 Q 5 60 5 65 Q 5 73 8 75 L 32 75 Q 35 73 35 65 Q 35 60 34 57 Z" fill="#cc4444" opacity="0.85" />
              <path d="M 8.5 66 Q 6 71 9 74 L 31 74 Q 34 71 31.5 66" fill="#882222" opacity="0.3" />
              <ellipse cx="20" cy="75" rx="13.5" ry="2.5" fill="#992222" opacity="0.5" />
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
          <Route path="/unirse" element={<UnirsePage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
