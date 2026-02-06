import React from 'react';
import { Contacto } from '../components/Contacto';
import { RadioWaves } from '../effects/SectionBackgrounds';

export const ContactoPage: React.FC = () => {
  return (
    <div className="relative">
      <RadioWaves />
      <Contacto />
    </div>
  );
};
