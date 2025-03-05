'use client';

import React, { useState } from 'react';
import Card from '../../models/card'; // Ajuste le chemin si besoin
import styles from './citySection.module.css';

const CitySection = ({ cityDistrictsData }) => {
  const [selectedCityCard, setSelectedCityCard] = useState(null);

  const handleCityCardClick = (id) => {
    console.log(`Quartier ${id} cliqué`);
    setSelectedCityCard(id);
    // Ajoute ici la logique spécifique pour la cité si nécessaire
  };

  return (
    <section className={styles.citySection}>
      <h2>Votre cité</h2>
      <div className={styles.cityContainer}>
        {cityDistrictsData.map((district) => (
          <Card
            key={district.id}
            title={district.title}
            content={district.content}
            onClick={() => handleCityCardClick(district.id)}
            selected={district.id === selectedCityCard}
          />
        ))}
      </div>
    </section>
  );
};

export default CitySection;
