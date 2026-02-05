import React from 'react';
import { motion } from 'framer-motion';
import { Check, Heart } from 'lucide-react';

// ============================================================
// ADMIN PANEL — CONFIGURACIÓN DE FRECUENCIA INTERNA
// ============================================================
// Todos estos valores son editables y se usan para cobrar.
// Al modificar precios acá, se reflejan en lo que se cobra.

interface SubscriptionPlan {
  id: string;
  name: string;
  priceARS: number;
  priceUSD: number;
  description: string;
  featured?: boolean;
}

// PLANES — editable: nombre, precio ARS, precio USD, descripción
const plans: SubscriptionPlan[] = [
  {
    id: 'plan-a',
    name: 'Mate',
    priceARS: 2500,
    priceUSD: 4,
    description: 'Un empujoncito que suma mucho',
  },
  {
    id: 'plan-b',
    name: 'Soda',
    priceARS: 5000,
    priceUSD: 8,
    description: 'El que más eligen los que nos bancan',
    featured: true,
  },
  {
    id: 'plan-c',
    name: 'Sifón',
    priceARS: 12500,
    priceUSD: 20,
    description: 'Para los que quieren que esto crezca en serio',
  },
];

// BENEFICIOS — editable
const benefits = [
  '2 episodios extras por mes',
  'Sorteos exclusivos entre suscriptores',
  'Historias más profundas e investigadas',
  'Acceso anticipado a lanzamientos',
  'Participación en futuros episodios',
  'Tu Número de Socio Efervescente',
  'Comunidad privada',
  'Sin publicidad',
  'RSS privado para tu app favorita',
  'Descuentos en la tienda',
  'Nos ayudás a mejorar el equipo',
  'Ser parte real del proyecto',
];

// TEXTOS — editables desde admin
const sectionTitle = 'Frecuencia Interna';
const sectionSubtitle = 'Las historias que se cuentan cuando la noche ya está avanzada';
const sectionIntro = 'Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos. Cada episodio lleva horas de investigación, edición y producción. Tu aporte nos permite seguir haciéndolo: mejorar el equipamiento, cubrir los gastos de edición, crearnos el tiempo extra que necesitamos aparte de nuestro trabajo, y sobre todo, seguir compartiendo estas historias con vos.';
const benefitsTitle = 'Qué te llevas al sumarte';
const cancelNote = 'Cancelá cuando quieras, sin compromiso ni letra chica';

// URLs de pago — configurar cuando estén listos
const mercadoPagoBaseUrl = '#'; // Suscripción nacional (Argentina) via Mercado Pago
const internationalBaseUrl = '#'; // Suscripción internacional (USD) - Stripe/PayPal/etc
// ============================================================

export const FrecuenciaInterna: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = React.useState<string>('plan-b');

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];

  const handleNationalSubscribe = () => {
    // TODO: Integrar con Mercado Pago — usa currentPlan.priceARS
    alert(`Redirigiendo a Mercado Pago — Plan: ${currentPlan.name} ($${currentPlan.priceARS} ARS/mes)`);
    // window.location.href = `${mercadoPagoBaseUrl}?plan=${currentPlan.id}&price=${currentPlan.priceARS}`;
  };

  const handleInternationalSubscribe = () => {
    // TODO: Integrar con plataforma internacional (Stripe/PayPal) — usa currentPlan.priceUSD
    alert(`Redirigiendo a suscripción internacional — Plan: ${currentPlan.name} (USD $${currentPlan.priceUSD}/mes)`);
    // window.location.href = `${internationalBaseUrl}?plan=${currentPlan.id}&price=${currentPlan.priceUSD}`;
  };

  return (
    <section id="frecuencia-interna" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {/* Ondas de frecuencia de fondo — ESTOS SON LOS QUE TE ENCANTAN, NO SE TOCAN */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute left-1/2 top-1/2 border-2 border-soda-red rounded-full pointer-events-none"
          style={{
            width: `${300 + i * 150}px`,
            height: `${300 + i * 150}px`,
            marginLeft: `-${150 + i * 75}px`,
            marginTop: `-${150 + i * 75}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Partículas rojas flotantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-soda-red rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="text-8xl text-soda-red">◉</div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            {sectionTitle}
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-red to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-2xl mx-auto mb-8">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Intro amistosa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <p className="text-soda-fog text-base font-light leading-relaxed text-center">
            {sectionIntro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Planes de suscripción */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">
              Elegí cómo querés sumarte
            </h3>
            
            <div className="space-y-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-soda-slate bg-opacity-40 backdrop-blur-sm rounded-sm p-8 transition-all duration-300 hoverable cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-2 border-soda-red shadow-lg shadow-soda-red/20 scale-[1.02]'
                      : plan.featured
                        ? 'border-2 border-soda-accent shadow-lg shadow-soda-accent/10'
                        : 'border border-soda-mist border-opacity-20 hover:border-soda-accent hover:border-opacity-40'
                  }`}
                >
                  {/* Indicador de selección */}
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === plan.id 
                      ? 'border-soda-red bg-soda-red' 
                      : 'border-soda-mist border-opacity-40'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-soda-red px-4 py-1 rounded-sm text-xs tracking-wider text-soda-glow">
                      MÁS ELEGIDO
                    </div>
                  )}
                  
                  <div className="flex items-end justify-between mb-4 pr-8">
                    <div>
                      <h4 className="text-2xl font-serif text-soda-glow mb-2">{plan.name}</h4>
                      <p className="text-soda-fog text-sm">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-soda-lamp">
                        ${plan.priceARS.toLocaleString('es-AR')}
                      </div>
                      <div className="text-sm text-soda-fog">
                        USD ${plan.priceUSD}/mes
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Beneficios */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">
              {benefitsTitle}
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm border border-soda-accent border-opacity-40 flex items-center justify-center group-hover:border-soda-red group-hover:bg-soda-red group-hover:bg-opacity-10 transition-all">
                    <Check size={14} className="text-soda-accent group-hover:text-soda-red transition-colors" />
                  </div>
                  <span className="text-soda-lamp font-light group-hover:text-soda-glow transition-colors">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Botones de suscripción — Nacional e Internacional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="mb-6 text-center">
            <div className="text-soda-lamp text-sm mb-1">
              Plan seleccionado: <span className="text-soda-red font-medium">{currentPlan.name}</span>
            </div>
            <div className="text-soda-fog text-xs">
              ${currentPlan.priceARS.toLocaleString('es-AR')} ARS / USD ${currentPlan.priceUSD} por mes
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            {/* Botón Nacional — Mercado Pago */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNationalSubscribe}
              className="glow-button hoverable w-full sm:w-auto px-10 py-5 bg-soda-red bg-opacity-20 border-2 border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all duration-300 text-base tracking-wider backdrop-blur-sm relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-soda-glow to-transparent opacity-0 group-hover:opacity-20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Heart size={18} />
                SUSCRIBIRME (ARGENTINA)
              </span>
              <span className="relative z-10 block text-xs text-soda-lamp mt-1 opacity-80">
                Mercado Pago · ${currentPlan.priceARS.toLocaleString('es-AR')} ARS/mes
              </span>
            </motion.button>

            {/* Botón Internacional */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleInternationalSubscribe}
              className="glow-button hoverable w-full sm:w-auto px-10 py-5 bg-soda-accent bg-opacity-15 border-2 border-soda-accent text-soda-glow rounded-sm hover:bg-opacity-25 transition-all duration-300 text-base tracking-wider backdrop-blur-sm relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-soda-glow to-transparent opacity-0 group-hover:opacity-15"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Heart size={18} />
                SUSCRIBIRME (INTERNACIONAL)
              </span>
              <span className="relative z-10 block text-xs text-soda-lamp mt-1 opacity-80">
                USD ${currentPlan.priceUSD}/mes
              </span>
            </motion.button>
          </div>
          
          <p className="text-soda-fog text-xs mt-8 font-light text-center">
            {cancelNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
