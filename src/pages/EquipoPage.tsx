import React from 'react';
import { ElEquipo } from '../components/ElEquipo';
import { LightningFlickers } from '../effects/SectionBackgrounds';

export const EquipoPage: React.FC = () => {
  return (
    <div className="relative">
      <LightningFlickers />
      <ElEquipo />
    </div>
  );
};
