import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
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

initDemoUsers();

// Iconos SVG minimalistas en estilo "carita" — misma paleta de la web
// Cada icono: circulo de color + simbolo simple en crema
const SocialIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const p = platform.toLowerCase();
  // Color del circulo segun plataforma (paleta de la web)
  const colors: Record<string, string> = {
    instagram: '#c45555', youtube: '#8b3a3a', spotify: '#6b7a9e',
    soundcloud: '#c45555', tiktok: '#6b7a9e', twitter: '#8b3a3a',
    x: '#8b3a3a', apple: '#6b7a9e', default: '#c45555',
  };
  const bg = colors[p] || colors.default;
  const fg = '#d4c5b0';

  // Simbolo minimalista segun plataforma
  const getSymbol = () => {
    switch (p) {
      case 'instagram': return <><rect x="8" y="8" width="12" height="12" rx="3" fill="none" stroke={fg} strokeWidth="1.5" /><circle cx="14" cy="14" r="2.5" fill="none" stroke={fg} strokeWidth="1.2" /><circle cx="21" cy="7" r="1" fill={fg} /></>;
      case 'youtube': return <polygon points="11,9 11,19 21,14" fill={fg} />;
      case 'spotify': return <><path d="M 9 12 Q 14 10 19 12" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M 10 15 Q 14 13 18 15" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M 11 18 Q 14 16.5 17 18" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /></>;
      case 'soundcloud': return <><rect x="8" y="14" width="2" height="5" rx="1" fill={fg} /><rect x="11" y="11" width="2" height="8" rx="1" fill={fg} /><rect x="14" y="12" width="2" height="7" rx="1" fill={fg} /><rect x="17" y="10" width="2" height="9" rx="1" fill={fg} /></>;
      case 'tiktok': return <><path d="M 13 8 L 13 18 Q 13 20 11 20 Q 9 20 9 18 Q 9 16 11 16" fill="none" stroke={fg} strokeWidth="1.5" strokeLinecap="round" /><path d="M 13 12 Q 16 12 18 9" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /></>;
      case 'x': case 'twitter': return <><line x1="9" y1="9" x2="19" y2="19" stroke={fg} strokeWidth="1.8" strokeLinecap="round" /><line x1="19" y1="9" x2="9" y2="19" stroke={fg} strokeWidth="1.8" strokeLinecap="round" /></>;
      case 'apple': case 'applepodcasts': return <><circle cx="14" cy="14" r="5" fill="none" stroke={fg} strokeWidth="1.3" /><circle cx="14" cy="14" r="2" fill={fg} /></>;
      default: return <circle cx="14" cy="14" r="3" fill={fg} />;
    }
  };

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="transition-transform hover:scale-110">
      <circle cx="14" cy="14" r="13" fill={bg} />
      {getSymbol()}
    </svg>
  );
};

const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);

  return (
    <footer className="relative py-12 px-6 border-t border-soda-mist border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            {/* 3 caritas */}
            <div className="flex items-center gap-2">
              <svg width="26" height="26" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#c45555" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M 4 8 Q 2 14 4 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" />
                <path d="M 24 8 Q 26 14 24 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" />
              </svg>
              <svg width="26" height="26" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#6b7a9e" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              <svg width="26" height="26" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="12" fill="#8b3a3a" />
                <circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M 4 8 Q 2 14 4 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" />
                <path d="M 24 8 Q 26 14 24 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-soda-glow mb-1">sodaroja</h3>
              <p className="text-soda-fog text-xs">&copy; 2026</p>
            </div>
          </div>
          
          {/* Redes con iconos SVG */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {visibleLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform} className="hoverable opacity-70 hover:opacity-100 transition-opacity">
                <SocialIcon platform={link.platform} />
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
      <ScrollToTop />
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
