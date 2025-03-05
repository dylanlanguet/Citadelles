// components/citySection.js
'use client';

import React, { useState } from 'react';
import CardView from '../components/cardView';
import styles from './citySection.module.css';

const CitySection = ({ cityDistrictsData }) => {
  const [selectedCityCard, setSelectedCityCard] = useState(null);

  const handleCityCardClick = (id) => {
    console.log(`Quartier ${id} cliqué`);
    setSelectedCityCard(id);
  };

  return (
    <section className={styles.citySection}>
      <h2>Votre cité</h2>
      <div className={styles.cityContainer}>
        {cityDistrictsData.map((district) => (
          <CardView
            key={district.id}
            card={district}
            onClick={() => handleCityCardClick(district.id)}
            selected={district.id === selectedCityCard}
          />
        ))}
      </div>
    </section>
  );
};

export default CitySection;
