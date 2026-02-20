import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { WarmDivider } from './components/Editorial';
import { HomePage } from './pages/HomePage';
import { getContent } from './data/content';
import { initDemoUsers } from './data/auth';
import './styles/globals.css';

initDemoUsers();

const QueEsEstoPage = lazy(() => import('./pages/QueEsEstoPage').then(m => ({ default: m.QueEsEstoPage })));
const EquipoPage = lazy(() => import('./pages/EquipoPage').then(m => ({ default: m.EquipoPage })));
const EpisodiosPage = lazy(() => import('./pages/EpisodiosPage').then(m => ({ default: m.EpisodiosPage })));
const FrecuenciaInternaPage = lazy(() => import('./pages/FrecuenciaInternaPage').then(m => ({ default: m.FrecuenciaInternaPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ContactoPage = lazy(() => import('./pages/ContactoPage').then(m => ({ default: m.ContactoPage })));
const MiCuentaPage = lazy(() => import('./pages/MiCuentaPage').then(m => ({ default: m.MiCuentaPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const UnirsePage = lazy(() => import('./pages/UnirsePage').then(m => ({ default: m.UnirsePage })));

// Loading — classic
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="loader mx-auto mb-4" />
      <p className="text-soda-fog text-xs tracking-wider">Cargando...</p>
    </div>
  </div>
);

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

// Footer — premium, organized
const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);
  const sponsors = (content as any).sponsors?.filter((s: any) => s.visible) || [];
  const footerLogo = (content as any).footerLogoUrl;
  return (
    <>
      <WarmDivider />
      <footer className="relative py-12 sm:py-14 px-6">
        <div className="max-w-6xl mx-auto">

          {/* === ROW 1: Logo left — Socials right === */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-10">
            {/* Left: editable logo + brand */}
            <div className="flex items-center gap-4">
              {footerLogo ? (
                <img src={footerLogo} alt="sodaroja" className="h-12 object-contain" />
              ) : content.brand?.isotipoUrl ? (
                <img src={content.brand.isotipoUrl} alt="" className="h-10 w-10 object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-soda-red/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-soda-red" />
                </div>
              )}
              <div>
                <span className="font-serif text-soda-glow text-lg block leading-tight">sodaroja</span>
                <span className="text-soda-fog/35 text-[10px] tracking-[0.15em] uppercase block mt-0.5">Historias reales de ciudades del mundo</span>
              </div>
            </div>

            {/* Right: social links as clean text */}
            <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-end">
              {visibleLinks.map((link: any) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-soda-fog/40 text-[11px] tracking-[0.1em] uppercase hover:text-soda-lamp transition-colors duration-500">
                  {link.abbr || link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* === Divider === */}
          <div className="w-full h-px bg-soda-mist/8 mb-8" />

          {/* === ROW 2: Sponsors === */}
          {sponsors.length > 0 && (
            <div className="mb-8">
              <p className="text-soda-fog/20 text-[9px] tracking-[0.2em] uppercase text-center mb-5">Nos acompañan</p>
              <div className="flex items-center justify-center gap-8 sm:gap-10 flex-wrap">
                {sponsors.map((s: any) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    className="opacity-25 hover:opacity-50 transition-opacity duration-500"
                  >
                    <img src={s.logoUrl} alt={s.name} className="h-5 sm:h-6 object-contain" style={{ filter: 'brightness(3) grayscale(1)' }} loading="lazy" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* === ROW 3: Copyright centered in red === */}
          <div className="text-center">
            <span className="text-soda-red/50 text-[10px] tracking-[0.15em]">&copy; 2026 sodaroja</span>
          </div>

        </div>
      </footer>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-soda-night overflow-x-hidden">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
