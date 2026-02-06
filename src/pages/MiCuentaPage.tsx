import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut, Save } from 'lucide-react';
import { getContent } from '../data/content';

export const MiCuentaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'suscripcion' | 'config'>('perfil');
  const content = getContent();
  const fields = content.userProfileFields.filter(f => f.visible);

  const [formData, setFormData] = useState<Record<string, string>>({
    name: 'Juan Pérez',
    nickname: 'Juancho',
    email: 'juan@email.com',
    birth_month: '03',
    birth_year: '1995',
    pronouns: 'Él',
    city: 'Buenos Aires',
    country: 'Argentina',
    howFoundUs: 'Instagram',
  });

  const userData = {
    memberNumber: 'EF-000128',
    isPremium: true,
    subscriptionPlan: 'Soda',
    subscriptionEndDate: '15 de Marzo, 2026',
    joinedDate: '15 de Diciembre, 2025',
  };

  const months = [
    { value: '01', label: 'Enero' }, { value: '02', label: 'Febrero' }, { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' }, { value: '05', label: 'Mayo' }, { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' }, { value: '08', label: 'Agosto' }, { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' }, { value: '11', label: 'Noviembre' }, { value: '12', label: 'Diciembre' },
  ];
  const years = Array.from({ length: 80 }, (_, i) => String(2010 - i));

  const ic = "w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";
  const lc = "block text-soda-lamp text-sm mb-2";

  const renderField = (field: typeof fields[0]) => {
    if (field.type === 'month-year') {
      return (
        <div key={field.id}>
          <label className={lc}>{field.label}</label>
          <div className="grid grid-cols-2 gap-3">
            <select value={formData[`${field.id}_month`] || ''} onChange={(e) => setFormData({ ...formData, [`${field.id}_month`]: e.target.value })} className={ic}>
              <option value="">Mes</option>
              {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <select value={formData[`${field.id}_year`] || ''} onChange={(e) => setFormData({ ...formData, [`${field.id}_year`]: e.target.value })} className={ic}>
              <option value="">Año</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      );
    }
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id}>
          <label className={lc}>{field.label}</label>
          <select value={formData[field.id] || ''} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} className={ic}>
            <option value="">Elegí una opción</option>
            {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      );
    }
    return (
      <div key={field.id}>
        <label className={lc}>{field.label}</label>
        <input type={field.id === 'email' ? 'email' : 'text'} value={formData[field.id] || ''} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} className={ic} placeholder={field.placeholder || ''} />
      </div>
    );
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-serif text-soda-glow mb-6">Mi Cuenta</h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-soda-red bg-opacity-20 flex items-center justify-center border-2 border-soda-red">
                  <User size={32} className="text-soda-red" />
                </div>
                <div>
                  <h3 className="text-soda-glow font-serif text-xl">{formData.nickname || formData.name || 'Usuario'}</h3>
                  <p className="text-soda-fog text-sm">{formData.email}</p>
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
                {[
                  { id: 'perfil' as const, icon: <User size={18} />, label: 'Perfil' },
                  { id: 'suscripcion' as const, icon: <CreditCard size={18} />, label: 'Suscripción' },
                  { id: 'config' as const, icon: <Settings size={18} />, label: 'Configuración' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-left text-sm ${activeTab === tab.id ? 'text-soda-lamp bg-soda-mist bg-opacity-20' : 'text-soda-fog hover:bg-soda-mist hover:bg-opacity-10'}`}>
                    {tab.icon}<span>{tab.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-red hover:bg-soda-red hover:bg-opacity-10 rounded-sm transition-all text-left mt-4 text-sm">
                  <LogOut size={18} /><span>Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Contenido */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-6">
            {activeTab === 'perfil' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-2">Información Personal</h2>
                <p className="text-soda-fog text-xs mb-8">Solo pedimos lo necesario. Nada sensible, nada raro.</p>
                <div className="space-y-5">
                  {fields.map(renderField)}
                  <button onClick={() => alert('Guardado (conectar backend)')} className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all mt-4 flex items-center justify-center gap-2 text-sm">
                    <Save size={16} />Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'suscripcion' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Tu Suscripción</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Plan actual', value: userData.subscriptionPlan },
                    { label: 'Próxima renovación', value: userData.subscriptionEndDate },
                    { label: 'Miembro desde', value: userData.joinedDate },
                    { label: 'N° de Socio', value: userData.memberNumber },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                      <span className="text-soda-fog text-sm">{row.label}:</span>
                      <span className="text-soda-lamp font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">Cambiar Plan</button>
                  <button className="flex-1 py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all text-sm">Cancelar Suscripción</button>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Configuración</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Notificaciones por email', desc: 'Nuevos episodios y novedades' },
                    { title: 'Newsletter del culto', desc: 'Resúmenes mensuales y contenido especial' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-soda-mist border-opacity-20">
                      <div>
                        <p className="text-soda-lamp text-sm">{item.title}</p>
                        <p className="text-soda-fog text-xs">{item.desc}</p>
                      </div>
                      <button className="w-12 h-6 bg-soda-accent bg-opacity-30 rounded-full relative">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-soda-accent rounded-full" />
                      </button>
                    </div>
                  ))}
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
