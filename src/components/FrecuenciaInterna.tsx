import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SubscriptionPlan {
  name: string;
  priceARS: number;
  priceUSD: number;
  featured?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    name: 'Suscripción A',
    priceARS: 2500,
    priceUSD: 4,
  },
  {
    name: 'Suscripción B',
    priceARS: 5000,
    priceUSD: 8,
    featured: true,
  },
  {
    name: 'Suscripción C',
    priceARS: 12500,
    priceUSD: 20,
  },
];

const benefits = [
  'Episodios exclusivos cada mes',
  'Historias más profundas e investigadas',
  'Mapas interactivos extendidos',
  'Ambientación sonora extendida',
  'Acceso anticipado a lanzamientos',
  'Participación en futuros episodios',
  'Número de Socio Efervescente único',
  'Comunidad privada de miembros',
  'Sin publicidad',
  'RSS privado para tu app favorita',
  'Descuentos en la tienda',
  'Pertenencia real al proyecto',
];

export const FrecuenciaInterna: React.FC = () => {
  return (
    <section id="frecuencia-interna" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="text-8xl text-soda-red">◉</div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            Frecuencia Interna
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-red to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-2xl mx-auto">
            Las historias que se cuentan cuando la noche ya está avanzada
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
              Elegí tu plan
            </h3>
            
            <div className="space-y-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-soda-slate bg-opacity-40 backdrop-blur-sm rounded-sm p-8 transition-all duration-300 hoverable ${
                    plan.featured
                      ? 'border-2 border-soda-red shadow-lg shadow-soda-red/20'
                      : 'border border-soda-mist border-opacity-20 hover:border-soda-accent hover:border-opacity-40'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-soda-red px-4 py-1 rounded-sm text-xs tracking-wider">
                      MÁS ELEGIDO
                    </div>
                  )}
                  
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-serif text-soda-glow mb-2">{plan.name}</h4>
                      <p className="text-soda-fog text-sm">
                        {plan.name === 'Suscripción A' && 'Nivel de aporte básico'}
                        {plan.name === 'Suscripción B' && 'Nivel de aporte medio'}
                        {plan.name === 'Suscripción C' && 'Nivel de aporte alto'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-soda-lamp">
                        ${plan.priceARS}
                      </div>
                      <div className="text-sm text-soda-fog">
                        USD ${plan.priceUSD}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-soda-fog text-center pt-4 border-t border-soda-mist border-opacity-20">
                    Pagos en ARS (Mercado Pago) o USD (PayPal/Stripe)
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info adicional */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-center lg:text-left"
            >
              <p className="text-soda-fog text-sm font-light leading-relaxed">
                Tu aporte nos permite mejorar equipamiento, dedicar más tiempo al podcast, 
                investigar mejor y sostener este proyecto independiente.
              </p>
            </motion.div>
          </motion.div>

          {/* Beneficios */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">
              Lo que incluye
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="glow-button hoverable px-16 py-5 bg-soda-red bg-opacity-20 border-2 border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all duration-300 text-lg tracking-wider backdrop-blur-sm">
            SUMARTE A LA FRECUENCIA
          </button>
          
          <p className="text-soda-fog text-xs mt-6 font-light">
            Cancelá cuando quieras, sin compromiso
          </p>
        </motion.div>
      </div>
    </section>
  );
};
