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

// Footer — elevated with editorial identity
const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);
  return (
    <>
      <WarmDivider />
      <footer className="relative py-16 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top row: brand identity + social */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-10 mb-12">
            <div className="flex items-center gap-3">
              {content.brand?.isotipoUrl && (
                <img src={content.brand.isotipoUrl} alt="" className="h-8 w-8 object-contain rounded-full" />
              )}
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-serif text-soda-glow mb-0.5">sodaroja</h3>
                <p className="text-soda-fog/30 text-[10px] tracking-[0.2em] uppercase">Historias reales de ciudades del mundo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {visibleLinks.map((link: any) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                  <SocialIcon platform={link.platform} iconUrl={link.iconUrl} />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-soda-mist/10 mb-8" />

          {/* Bottom row: copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-soda-fog/40 text-[11px] tracking-wider">&copy; 2026 sodaroja. Todos los derechos reservados.</p>
            <p className="text-soda-fog/30 text-[10px] tracking-wider">Buenos Aires, Argentina</p>
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
