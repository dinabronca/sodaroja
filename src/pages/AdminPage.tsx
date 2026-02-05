import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Radio, ShoppingBag, Mic, Settings, Eye, Save, Plus, Trash2, Image, AlertCircle } from 'lucide-react';

// ============================================================
// ADMIN PANEL — CONTRASEÑA DE ACCESO
// Cambiar esta contraseña en producción y moverla a variable de entorno
const ADMIN_PASSWORD = 'sodaroja2026';
// ============================================================

type AdminTab = 'equipo' | 'episodios' | 'frecuencia' | 'shop' | 'general';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('equipo');
  const [saved, setSaved] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: Conectar con backend/API para guardar cambios
  };

  const inputClass = "w-full bg-soda-night bg-opacity-80 border border-soda-mist border-opacity-30 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";
  const labelClass = "block text-soda-lamp text-sm mb-2 font-medium";
  const noteClass = "text-soda-fog text-xs mt-1";
  const cardClass = "bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6 mb-6";

  // ======== LOGIN SCREEN ========
  if (!isAuthenticated) {
    return (
      <section className="relative pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className={cardClass}>
            <div className="text-center mb-8">
              <Shield size={48} className="text-soda-red mx-auto mb-4" />
              <h1 className="text-3xl font-serif text-soda-glow mb-2">Admin Panel</h1>
              <p className="text-soda-fog text-sm">sodaroja — Panel de Administración</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className={inputClass}
                  placeholder="Ingresá la contraseña"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-soda-red text-sm">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm tracking-wider"
              >
                ENTRAR
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // ======== ADMIN DASHBOARD ========
  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'equipo', label: 'El Equipo', icon: <Users size={18} /> },
    { id: 'episodios', label: 'Episodios', icon: <Mic size={18} /> },
    { id: 'frecuencia', label: 'Frecuencia Interna', icon: <Radio size={18} /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag size={18} /> },
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
  ];

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif text-soda-glow mb-2">Admin Panel</h1>
            <p className="text-soda-fog text-sm">Gestión de contenido de sodaroja</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400 text-sm"
              >
                ✓ Guardado
              </motion.span>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm"
            >
              <Save size={16} />
              Guardar Cambios
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm"
            >
              <Eye size={16} />
              Ver Sitio
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-sm text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow'
                  : 'border border-soda-mist border-opacity-20 text-soda-fog hover:text-soda-lamp hover:border-opacity-40'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======== TAB: EL EQUIPO ======== */}
        {activeTab === 'equipo' && (
          <div>
            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración de la Sección</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Título de la sección</label>
                  <input type="text" defaultValue="El Equipo" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <input type="text" defaultValue="Las personas detrás de cada historia" className={inputClass} />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Campos del Perfil</h2>
              <p className={noteClass + ' mb-4'}>Estos campos aparecen en la sección "Perfil Humano" y "Ciudades" de cada integrante. Podés agregar, editar o eliminar campos.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-soda-accent text-sm font-medium mb-3">Perfil Humano</h3>
                  <div className="space-y-2">
                    {['Helado favorito', 'Bebida favorita', 'Libro favorito', 'Película favorita', 'Serie favorita', 'Personaje favorito', 'Famoso favorito', 'Álbum musical', 'Podcast que escucha', 'Deporte favorito', 'Comida favorita', 'Olor favorito', 'Sonido que le relaja', 'Hora favorita del día', 'Clima favorito', 'Cantidad de tatuajes'].map((field, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" defaultValue={field} className={inputClass + ' flex-1'} />
                        <button className="text-soda-red hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 flex items-center gap-1 text-soda-accent text-xs hover:text-soda-lamp transition-colors">
                    <Plus size={14} /> Agregar campo
                  </button>
                </div>
                <div>
                  <h3 className="text-soda-accent text-sm font-medium mb-3">Ciudades</h3>
                  <div className="space-y-2">
                    {['Ciudad que sueña con visitar', 'Ciudad que no visitaría', 'Ciudad donde viviría', 'Ciudad donde se come mejor', 'Ciudad donde propondría casamiento', 'Ciudad donde se aislaría', 'Ciudad donde iría a conocer gente', 'Ciudad para vacacionar siempre', 'Ciudad todo pago', 'Ciudad donde escribiría un libro', 'Ciudad donde grabaría un episodio', 'Ciudad que le genera nostalgia'].map((field, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" defaultValue={field} className={inputClass + ' flex-1'} />
                        <button className="text-soda-red hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 flex items-center gap-1 text-soda-accent text-xs hover:text-soda-lamp transition-colors">
                    <Plus size={14} /> Agregar campo
                  </button>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Integrantes</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">
                  <Plus size={16} /> Agregar integrante
                </button>
              </div>

              <div className="bg-soda-night bg-opacity-40 border border-soda-mist border-opacity-10 rounded-sm p-4 mb-4">
                <div className="flex items-center gap-2 text-soda-accent text-sm mb-2">
                  <Image size={16} />
                  <span className="font-medium">Resolución de fotos recomendada</span>
                </div>
                <p className={noteClass}>600×800px mínimo (ratio 3:4), formato JPG o WebP, peso máximo 500KB. El rostro debe estar centrado en el tercio superior.</p>
              </div>

              {/* Ejemplo de integrante editable */}
              {['Mikasa', 'Violet', 'Levi'].map((name, idx) => (
                <div key={idx} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-soda-lamp font-medium">{name}</h3>
                    <button className="text-soda-red text-xs hover:underline">Eliminar</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" defaultValue={name} placeholder="Nombre" className={inputClass} />
                    <input type="text" defaultValue="Rol" placeholder="Rol" className={inputClass} />
                    <input type="text" defaultValue="URL de foto" placeholder="URL de la foto" className={inputClass} />
                  </div>
                  <p className={noteClass}>Completar todos los campos de perfil y ciudades para este integrante</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== TAB: EPISODIOS ======== */}
        {activeTab === 'episodios' && (
          <div>
            <div className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Gestión de Episodios</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">
                  <Plus size={16} /> Nuevo Episodio
                </button>
              </div>

              <div className="bg-soda-night bg-opacity-40 border border-soda-mist border-opacity-10 rounded-sm p-4 mb-6">
                <h3 className="text-soda-accent text-sm font-medium mb-2">Campos por episodio</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-soda-fog">
                  <span>• Ciudad</span>
                  <span>• Título</span>
                  <span>• Descripción</span>
                  <span>• URL de imagen (800×600px)</span>
                  <span>• Fecha de publicación</span>
                  <span>• ¿Es premium?</span>
                  <span>• Latitud / Longitud</span>
                  <span>• URL Spotify</span>
                  <span>• URL SoundCloud</span>
                  <span>• URL Embed Spotify</span>
                  <span>• URL Embed YouTube</span>
                  <span>• URL Embed iVoox</span>
                </div>
              </div>

              {/* Lista de episodios ejemplo */}
              {[
                { city: 'París', title: 'Las Catacumbas Olvidadas', date: '2025-11-15', premium: false },
                { city: 'Tokio', title: 'El Último Samurái Digital', date: '2025-12-01', premium: true },
                { city: 'Buenos Aires', title: 'La Dama de Blanco', date: '2025-12-20', premium: false },
              ].map((ep, idx) => (
                <div key={idx} className="flex items-center justify-between border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-soda-accent text-xs font-mono w-8">{idx + 1}</span>
                    <div>
                      <p className="text-soda-lamp text-sm">{ep.city} — {ep.title}</p>
                      <p className="text-soda-fog text-xs">{ep.date} {ep.premium && '• 🔒 Premium'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-soda-accent text-xs hover:underline">Editar</button>
                    <button className="text-soda-red text-xs hover:underline">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== TAB: FRECUENCIA INTERNA ======== */}
        {activeTab === 'frecuencia' && (
          <div>
            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Textos de la Sección</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Título</label>
                  <input type="text" defaultValue="Frecuencia Interna" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <input type="text" defaultValue="Las historias que se cuentan cuando la noche ya está avanzada" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Texto introductorio</label>
                  <textarea
                    rows={4}
                    defaultValue="Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos..."
                    className={inputClass + ' resize-y'}
                  />
                  <p className={noteClass}>Este texto aparece antes de los planes. Que sea amistoso y humano.</p>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Planes de Suscripción</h2>
              <p className={noteClass + ' mb-4'}>⚠️ Al modificar los precios acá, se actualizan los montos que se cobran.</p>
              
              {[
                { name: 'Mate', ars: 2500, usd: 4, desc: 'Un empujoncito que suma mucho' },
                { name: 'Soda', ars: 5000, usd: 8, desc: 'El que más eligen los que nos bancan', featured: true },
                { name: 'Sifón', ars: 12500, usd: 20, desc: 'Para los que quieren que esto crezca en serio' },
              ].map((plan, idx) => (
                <div key={idx} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className={labelClass}>Nombre</label>
                      <input type="text" defaultValue={plan.name} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Precio ARS</label>
                      <input type="number" defaultValue={plan.ars} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Precio USD</label>
                      <input type="number" defaultValue={plan.usd} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Descripción</label>
                      <input type="text" defaultValue={plan.desc} className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Beneficios</h2>
              <p className={noteClass + ' mb-4'}>Lista de beneficios que aparecen al lado de los planes.</p>
              {[
                '2 episodios extras por mes', 'Sorteos exclusivos', 'Historias más profundas',
                'Acceso anticipado', 'Participación en futuros episodios', 'Número de Socio Efervescente',
                'Comunidad privada', 'Sin publicidad', 'RSS privado', 'Descuentos en la tienda',
                'Nos ayudás a mejorar el equipo', 'Ser parte real del proyecto',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input type="text" defaultValue={benefit} className={inputClass + ' flex-1'} />
                  <button className="text-soda-red hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                </div>
              ))}
              <button className="mt-3 flex items-center gap-1 text-soda-accent text-xs hover:text-soda-lamp transition-colors">
                <Plus size={14} /> Agregar beneficio
              </button>
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">URLs de Pago</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>URL Mercado Pago (Argentina)</label>
                  <input type="text" defaultValue="#" className={inputClass} placeholder="https://www.mercadopago.com.ar/..." />
                  <p className={noteClass}>Para suscripciones nacionales en ARS</p>
                </div>
                <div>
                  <label className={labelClass}>URL Internacional (USD)</label>
                  <input type="text" defaultValue="#" className={inputClass} placeholder="https://..." />
                  <p className={noteClass}>Stripe, PayPal, u otra plataforma para cobros en USD</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======== TAB: SHOP ======== */}
        {activeTab === 'shop' && (
          <div>
            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración del Shop</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Título</label>
                  <input type="text" defaultValue="Archivo Interno" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <input type="text" defaultValue="Objetos seleccionados del archivo sodaroja" className={inputClass} />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Productos</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">
                  <Plus size={16} /> Agregar Producto
                </button>
              </div>
              
              <div className="border border-soda-mist border-opacity-15 rounded-sm p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" defaultValue="Pack de Stickers" placeholder="Nombre" className={inputClass} />
                  <input type="text" defaultValue="Colección de stickers del culto" placeholder="Descripción" className={inputClass} />
                  <input type="text" defaultValue="#" placeholder="URL de compra" className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======== TAB: GENERAL ======== */}
        {activeTab === 'general' && (
          <div>
            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Redes Sociales (Footer)</h2>
              <p className={noteClass + ' mb-4'}>Completar con las URLs de cada red social.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Instagram', abbr: 'IG' },
                  { label: 'Twitter/X', abbr: 'X' },
                  { label: 'YouTube', abbr: 'YT' },
                  { label: 'Spotify', abbr: 'SP' },
                  { label: 'SoundCloud', abbr: 'SC' },
                  { label: 'TikTok', abbr: 'TT' },
                  { label: 'Apple Podcasts', abbr: 'AP' },
                ].map((social, idx) => (
                  <div key={idx}>
                    <label className={labelClass}>{social.label} ({social.abbr})</label>
                    <input type="text" defaultValue="#" className={inputClass} placeholder={`https://${social.label.toLowerCase()}.com/sodaroja`} />
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email de contacto</label>
                  <input type="email" defaultValue="hola@sodaroja.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Instagram de contacto</label>
                  <input type="text" defaultValue="@sodaroja" className={inputClass} />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Contraseña del Admin</h2>
              <div className="max-w-md">
                <label className={labelClass}>Nueva contraseña</label>
                <input type="password" className={inputClass} placeholder="Nueva contraseña" />
                <p className={noteClass}>Cambiar la contraseña por defecto.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
