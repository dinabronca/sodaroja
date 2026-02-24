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

// Footer — editorial, compact, premium
const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);
  const sponsors = (content as any).sponsors?.filter((s: any) => s.visible) || [];
  const footerLogo = (content as any).footerLogoUrl;
  return (
    <footer className="relative px-6 pt-12 pb-8 border-t border-soda-mist/8">
      <div className="max-w-5xl mx-auto">

        {/* === Sponsors strip === */}
        {sponsors.length > 0 && (
          <div className="mb-10">
            <p className="text-soda-fog/15 text-[8px] tracking-[0.3em] uppercase text-center mb-4">Nos acompañan</p>
            <div className="flex items-center justify-center gap-7 sm:gap-10 flex-wrap">
              {sponsors.map((s: any) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  className="opacity-20 hover:opacity-45 transition-opacity duration-700">
                  <img src={s.logoUrl} alt={s.name} className="h-4 sm:h-[18px] object-contain" style={{ filter: 'brightness(3) grayscale(1)' }} loading="lazy" />
                </a>
              ))}
            </div>
            <div className="w-full h-px bg-soda-mist/5 mt-10" />
          </div>
        )}

        {/* === Main footer grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 mb-10">

          {/* Col 1: Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start mb-3">
              {footerLogo ? (
                <img src={footerLogo} alt="sodaroja" className="h-8 object-contain" />
              ) : content.brand?.isotipoUrl ? (
                <img src={content.brand.isotipoUrl} alt="" className="h-7 w-7 object-contain" />
              ) : null}
              <span className="font-serif text-soda-glow text-sm">sodaroja</span>
            </div>
            <p className="text-soda-fog/25 text-[10px] leading-relaxed max-w-[200px] mx-auto sm:mx-0">
              Historias reales de ciudades del mundo. Un podcast que viaja.
            </p>
          </div>

          {/* Col 2: Socials — centered */}
          <div className="text-center">
            <p className="text-soda-fog/20 text-[8px] tracking-[0.3em] uppercase mb-3">Seguinos</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {visibleLinks.map((link: any) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-soda-fog/30 text-[10px] tracking-[0.12em] uppercase hover:text-soda-lamp transition-colors duration-500">
                  {link.abbr || link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Links — right */}
          <div className="text-center sm:text-right">
            <p className="text-soda-fog/20 text-[8px] tracking-[0.3em] uppercase mb-3">Secciones</p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Episodios', href: '/episodios' },
                { label: 'Frecuencia Interna', href: '/frecuencia-interna' },
                { label: 'Contacto', href: '/contacto' },
              ].map(l => (
                <a key={l.href} href={l.href} className="text-soda-fog/25 text-[10px] tracking-wider hover:text-soda-fog/50 transition-colors duration-500">{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* === Bottom bar === */}
        <div className="text-center">
          <span className="text-soda-red/35 text-[9px] tracking-[0.15em]">&copy; 2026 sodaroja</span>
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
