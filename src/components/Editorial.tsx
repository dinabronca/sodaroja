import React from 'react';
import { motion } from 'framer-motion';

/* ===== EDITORIAL HEADER ===== 
 * The sodaroja identity: red line + uppercase label + big serif title with italic accent
 * Used across ALL sections for consistency
 */
export const EditorialHeader: React.FC<{
  label: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  center?: boolean;
}> = ({ label, title, titleAccent, subtitle, center = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={`mb-12 sm:mb-16 ${center ? 'text-center' : ''}`}
  >
    {/* Red line + label */}
    <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
      <div className="w-8 h-px bg-soda-red" />
      <span className="text-soda-red text-[11px] tracking-[0.25em] uppercase font-light">{label}</span>
    </div>

    {/* Title with optional italic accent */}
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-soda-glow leading-tight mb-4">
      {title}{' '}
      {titleAccent && <em className="text-soda-red/85">{titleAccent}</em>}
    </h2>

    {subtitle && (
      <p className={`text-soda-fog text-base font-light leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

/* ===== WARM DIVIDER ===== */
export const WarmDivider: React.FC = () => (
  <div className="section-divider" />
);
