import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut, Save } from 'lucide-react';

export const MiCuentaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'suscripcion' | 'config'>('perfil');

  // Datos de ejemplo — en producción vendrían del backend/auth
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    nickname: 'Juancho',
    email: 'juan@email.com',
    birthMonth: '03',
    birthYear: '1995',
    city: 'Buenos Aires',
    country: 'Argentina',
    zodiac: 'Piscis',
    pronouns: 'Él',
    favoriteEpisode: '',
    howDidYouFindUs: '',
    memberNumber: 'EF-000128',
    isPremium: true,
    subscriptionPlan: 'Soda',
    subscriptionEndDate: '15 de Marzo, 2026',
    joinedDate: '15 de Diciembre, 2025',
  });

  const months = [
    { value: '01', label: 'Enero' }, { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' }, { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' }, { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' }, { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' }, { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' }, { value: '12', label: 'Diciembre' },
  ];

  const years = Array.from({ length: 80 }, (_, i) => String(2010 - i));

  const pronounOptions = ['Él', 'Ella', 'Elle', 'Prefiero no decir'];

  const zodiacSigns = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis',
  ];

  const inputClass = "w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";
  const selectClass = "w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm appearance-none";
  const labelClass = "block text-soda-lamp text-sm mb-2";

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-serif text-soda-glow mb-6">Mi Cuenta</h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-soda-red bg-opacity-20 flex items-center justify-center border-2 border-soda-red">
                  <User size={32} className="text-soda-red" />
                </div>
                <div>
                  <h3 className="text-soda-glow font-serif text-xl">{userData.nickname || userData.name}</h3>
                  <p className="text-soda-fog text-sm">{userData.email}</p>
                </div>
              </div>

              {userData.isPremium && (
                <div className="bg-soda-red bg-opacity-10 border border-soda-red border-opacity-30 rounded-sm p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">◉</div>
                    <span className="text-soda-red text-sm font-medium">FRECUENCIA INTERNA</span>
                  </div>
                  <p className="text-soda-lamp text-xs">N° de Socio: {userData.memberNumber}</p>
                </div>
              )}

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('perfil')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-left text-sm ${
                    activeTab === 'perfil' ? 'text-soda-lamp bg-soda-mist bg-opacity-20' : 'text-soda-fog hover:bg-soda-mist hover:bg-opacity-10'
                  }`}
                >
                  <User size={18} /><span>Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab('suscripcion')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-left text-sm ${
                    activeTab === 'suscripcion' ? 'text-soda-lamp bg-soda-mist bg-opacity-20' : 'text-soda-fog hover:bg-soda-mist hover:bg-opacity-10'
                  }`}
                >
                  <CreditCard size={18} /><span>Suscripción</span>
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-left text-sm ${
                    activeTab === 'config' ? 'text-soda-lamp bg-soda-mist bg-opacity-20' : 'text-soda-fog hover:bg-soda-mist hover:bg-opacity-10'
                  }`}
                >
                  <Settings size={18} /><span>Configuración</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-red hover:bg-soda-red hover:bg-opacity-10 rounded-sm transition-all text-left mt-4 text-sm">
                  <LogOut size={18} /><span>Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Contenido principal */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-6">
            
            {/* TAB: Perfil */}
            {activeTab === 'perfil' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-2">Información Personal</h2>
                <p className="text-soda-fog text-xs mb-8">Solo pedimos lo necesario. Nada sensible, nada raro.</p>
                
                <div className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className={labelClass}>Nombre</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* Apodo */}
                  <div>
                    <label className={labelClass}>Apodo / Cómo te decimos</label>
                    <input
                      type="text"
                      value={userData.nickname}
                      onChange={(e) => setUserData({ ...userData, nickname: e.target.value })}
                      className={inputClass}
                      placeholder="¿Cómo te gusta que te llamen?"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className={inputClass}
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Mes y Año de nacimiento */}
                  <div>
                    <label className={labelClass}>Mes y año de nacimiento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={userData.birthMonth}
                        onChange={(e) => setUserData({ ...userData, birthMonth: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Mes</option>
                        {months.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                      <select
                        value={userData.birthYear}
                        onChange={(e) => setUserData({ ...userData, birthYear: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Año</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pronombres */}
                  <div>
                    <label className={labelClass}>Pronombres</label>
                    <select
                      value={userData.pronouns}
                      onChange={(e) => setUserData({ ...userData, pronouns: e.target.value })}
                      className={selectClass}
                    >
                      {pronounOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ciudad y País */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Ciudad</label>
                      <input
                        type="text"
                        value={userData.city}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        className={inputClass}
                        placeholder="¿Desde dónde nos escuchás?"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>País</label>
                      <input
                        type="text"
                        value={userData.country}
                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                        className={inputClass}
                        placeholder="País"
                      />
                    </div>
                  </div>

                  {/* Signo zodiacal */}
                  <div>
                    <label className={labelClass}>Signo zodiacal</label>
                    <select
                      value={userData.zodiac}
                      onChange={(e) => setUserData({ ...userData, zodiac: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Elegí tu signo</option>
                      {zodiacSigns.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Episodio favorito */}
                  <div>
                    <label className={labelClass}>Episodio favorito (opcional)</label>
                    <input
                      type="text"
                      value={userData.favoriteEpisode}
                      onChange={(e) => setUserData({ ...userData, favoriteEpisode: e.target.value })}
                      className={inputClass}
                      placeholder="¿Cuál te marcó?"
                    />
                  </div>

                  {/* Cómo nos encontraste */}
                  <div>
                    <label className={labelClass}>¿Cómo nos encontraste? (opcional)</label>
                    <input
                      type="text"
                      value={userData.howDidYouFindUs}
                      onChange={(e) => setUserData({ ...userData, howDidYouFindUs: e.target.value })}
                      className={inputClass}
                      placeholder="Instagram, un amigo, de casualidad..."
                    />
                  </div>

                  <button
                    onClick={() => alert('Cambios guardados (conectar con backend)')}
                    className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all mt-4 flex items-center justify-center gap-2 text-sm"
                  >
                    <Save size={16} />
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Suscripción */}
            {activeTab === 'suscripcion' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Tu Suscripción</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                    <span className="text-soda-fog text-sm">Plan actual:</span>
                    <span className="text-soda-lamp font-medium">{userData.subscriptionPlan}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                    <span className="text-soda-fog text-sm">Próxima renovación:</span>
                    <span className="text-soda-lamp font-medium">{userData.subscriptionEndDate}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                    <span className="text-soda-fog text-sm">Miembro desde:</span>
                    <span className="text-soda-lamp font-medium">{userData.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                    <span className="text-soda-fog text-sm">N° de Socio:</span>
                    <span className="text-soda-red font-mono font-medium">{userData.memberNumber}</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">Cambiar Plan</button>
                  <button className="flex-1 py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all text-sm">Cancelar Suscripción</button>
                </div>
              </div>
            )}

            {/* TAB: Configuración */}
            {activeTab === 'config' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Configuración</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-soda-mist border-opacity-20">
                    <div>
                      <p className="text-soda-lamp text-sm">Notificaciones por email</p>
                      <p className="text-soda-fog text-xs">Nuevos episodios y novedades</p>
                    </div>
                    <button className="w-12 h-6 bg-soda-accent bg-opacity-30 rounded-full relative transition-all">
                      <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-soda-accent rounded-full transition-all" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-soda-mist border-opacity-20">
                    <div>
                      <p className="text-soda-lamp text-sm">Newsletter del culto</p>
                      <p className="text-soda-fog text-xs">Resúmenes mensuales y contenido especial</p>
                    </div>
                    <button className="w-12 h-6 bg-soda-accent bg-opacity-30 rounded-full relative transition-all">
                      <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-soda-accent rounded-full transition-all" />
                    </button>
                  </div>
                  <div className="pt-4">
                    <button className="text-soda-red text-sm hover:underline">Eliminar mi cuenta</button>
                    <p className="text-soda-fog text-xs mt-2">Esta acción es irreversible</p>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
};
