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
import { initDemoUsers } from './data/auth';
import './styles/globals.css';

// Inicializar cuentas de demo
initDemoUsers();

const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);

  return (
    <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            {/* 3 caritas minimalistas — 2 nenas, 1 nene */}
            <div className="flex items-center gap-3">
              {/* Nena 1 — rojo y crema */}
              <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#c45555" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" />
                <circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Pelo largo */}
                <path d="M 4 8 Q 2 14 4 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" />
                <path d="M 24 8 Q 26 14 24 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" />
              </svg>
              {/* Nene — azul acento y crema */}
              <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#6b7a9e" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" />
                <circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              {/* Nena 2 — rojo oscuro y crema */}
              <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#8b3a3a" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" />
                <circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Pelo largo */}
                <path d="M 4 8 Q 2 14 4 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" />
                <path d="M 24 8 Q 26 14 24 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" />
              </svg>
            </div>
            
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
