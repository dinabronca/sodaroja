import React from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut } from 'lucide-react';

export const MiCuentaPage: React.FC = () => {
  const userData = {
    name: 'Juan Pérez',
    email: 'juan@email.com',
    memberNumber: 'EF-000128',
    isPremium: true,
    subscriptionPlan: 'Suscripción B',
    subscriptionEndDate: '15 de Marzo, 2026',
    joinedDate: '15 de Diciembre, 2025',
  };

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
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-soda-red bg-opacity-20 flex items-center justify-center border-2 border-soda-red">
                  <User size={32} className="text-soda-red" />
                </div>
                <div>
                  <h3 className="text-soda-glow font-serif text-xl">{userData.name}</h3>
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
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-lamp hover:bg-soda-mist hover:bg-opacity-20 rounded-sm transition-all text-left">
                  <User size={18} /><span className="text-sm">Perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-fog hover:bg-soda-mist hover:bg-opacity-20 rounded-sm transition-all text-left">
                  <CreditCard size={18} /><span className="text-sm">Suscripción</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-fog hover:bg-soda-mist hover:bg-opacity-20 rounded-sm transition-all text-left">
                  <Settings size={18} /><span className="text-sm">Configuración</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-soda-red hover:bg-soda-red hover:bg-opacity-10 rounded-sm transition-all text-left mt-4">
                  <LogOut size={18} /><span className="text-sm">Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-6">
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
              </div>
              <div className="mt-6 flex gap-4">
                <button className="flex-1 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">Cambiar Plan</button>
                <button className="flex-1 py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all text-sm">Cancelar Suscripción</button>
              </div>
            </div>

            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
              <h2 className="text-2xl font-serif text-soda-glow mb-6">Información Personal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-soda-lamp text-sm mb-2">Nombre completo</label>
                  <input type="text" value={userData.name} className="w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-soda-lamp text-sm mb-2">Email</label>
                  <input type="email" value={userData.email} className="w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors" />
                </div>
                <button className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all mt-6">Guardar Cambios</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
