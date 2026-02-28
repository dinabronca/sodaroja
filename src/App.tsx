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
import { UnirsePage } from './pages/UnirsePage';
import { getContent } from './data/content';
import { initDemoUsers } from './data/auth';
import './styles/globals.css';

// Admin stays lazy — it's big and rarely used
const AdminPage = React.lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

// Init demo users (async)
initDemoUsers();

// Social icon SVGs
const SocialIcon: React.FC<{ platform: string; iconUrl?: string }> = ({ platform, iconUrl }) => {
  if (iconUrl) return <img src={iconUrl} alt={platform} className="w-7 h-7 rounded-full object-cover" loading="lazy" />;
  const p = platform.toLowerCase();
  const fg = '#e8dcc8';
  const getSymbol = () => {
    switch (p) {
      case 'instagram': return <><rect x="8" y="8" width="12" height="12" rx="3" fill="none" stroke={fg} strokeWidth="1.2" /><circle cx="14" cy="14" r="2.5" fill="none" stroke={fg} strokeWidth="1" /><circle cx="21" cy="7" r="0.8" fill={fg} /></>;
      case 'youtube': return <polygon points="11,9 11,19 21,14" fill={fg} />;
      case 'spotify': return <><path d="M 9 12 Q 14 10 19 12" stroke={fg} strokeWidth="1.2" fill="none" strokeLinecap="round" /><path d="M 10 15 Q 14 13 18 15" stroke={fg} strokeWidth="1.2" fill="none" strokeLinecap="round" /><path d="M 11 18 Q 14 16.5 17 18" stroke={fg} strokeWidth="1.2" fill="none" strokeLinecap="round" /></>;
      case 'soundcloud': return <><rect x="8" y="14" width="2" height="5" rx="1" fill={fg} /><rect x="11" y="11" width="2" height="8" rx="1" fill={fg} /><rect x="14" y="12" width="2" height="7" rx="1" fill={fg} /><rect x="17" y="10" width="2" height="9" rx="1" fill={fg} /></>;
      case 'tiktok': return <><path d="M 13 8 L 13 18 Q 13 20 11 20 Q 9 20 9 18 Q 9 16 11 16" fill="none" stroke={fg} strokeWidth="1.3" strokeLinecap="round" /><path d="M 13 12 Q 16 12 18 9" stroke={fg} strokeWidth="1.1" fill="none" strokeLinecap="round" /></>;
      case 'x': case 'twitter': return <><line x1="9" y1="9" x2="19" y2="19" stroke={fg} strokeWidth="1.5" strokeLinecap="round" /><line x1="19" y1="9" x2="9" y2="19" stroke={fg} strokeWidth="1.5" strokeLinecap="round" /></>;
      default: return <circle cx="14" cy="14" r="3" fill={fg} />;
    }
  };
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="transition-opacity duration-500 opacity-40 hover:opacity-80">
      {getSymbol()}
    </svg>
  );
};

// Footer — per wireframe: sponsors top, logo-phrase left, empty center, socials right
const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);
  const sponsors = (content as any).sponsors?.filter((s: any) => s.visible) || [];
  const footerLogo = (content as any).footerLogoUrl;
  return (
    <footer className="relative px-6 pt-14 pb-10">
      {/* Top line */}
      <div className="max-w-5xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-soda-mist/10 to-transparent mb-10" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* === ROW 1: Sponsors — full width === */}
        {sponsors.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {sponsors.map((s: any) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  className="opacity-15 hover:opacity-40 transition-opacity duration-700">
                  <img src={s.logoUrl} alt={s.name} className="h-4 sm:h-[18px] object-contain" style={{ filter: 'brightness(3) grayscale(1)' }} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* === ROW 2: Two columns — logo left, socials right === */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8">

          {/* Left: Logo + phrase */}
          <div className="flex items-center gap-3">
            {footerLogo ? (
              <img src={footerLogo} alt="sodaroja" className="h-8 object-contain opacity-60" />
            ) : content.brand?.isotipoUrl ? (
              <img src={content.brand.isotipoUrl} alt="" className="h-6 w-6 object-contain opacity-40" />
            ) : null}
            <div>
              <span className="font-serif text-soda-glow/60 text-sm block leading-tight">sodaroja</span>
              <span className="text-soda-fog/20 text-[9px] tracking-[0.12em] block mt-0.5">Historias reales de ciudades del mundo</span>
            </div>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-end">
            {visibleLinks.map((link: any) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-soda-fog/25 text-[10px] tracking-[0.1em] uppercase hover:text-soda-fog/50 transition-colors duration-700">
                {link.abbr || link.platform}
              </a>
            ))}
          </div>
        </div>

        {/* === Copyright === */}
        <div className="mt-8 text-center sm:text-left">
          <span className="text-soda-red/25 text-[9px] tracking-[0.12em]">&copy; 2026 sodaroja</span>
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
        {/* Global VHS band */}
        <div className="vhs-global-band" />
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
          <Route path="/admin" element={<React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loader" /></div>}><AdminPage /></React.Suspense>} />
          <Route path="/unirse" element={<UnirsePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
