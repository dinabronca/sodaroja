import React from 'react';
import { Shop } from '../components/Shop';
import { SignalInterference } from '../effects/SectionBackgrounds';

export const ShopPage: React.FC = () => {
  return (
    <div className="relative">
      <SignalInterference />
      <Shop />
    </div>
  );
};
