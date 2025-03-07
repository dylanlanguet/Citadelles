'use client';

import React from 'react';
import CardView from './cardView';
import styles from './citySection.module.css';

const CitySection = ({ constructedDistricts }) => {
  return (
    <section className={styles.citySection}>
      <h2>Votre cité</h2>
      <div className={styles.cityContainer}>
        {constructedDistricts && constructedDistricts.length > 0 ? (
          constructedDistricts.map((district, idx) => (
            <CardView
              key={`${district.id}-${idx}`}
              card={district}
              // Optionnel: onClick ou d'autres props
            />
          ))
        ) : (
          <p>Aucun quartier construit pour le moment.</p>
        )}
      </div>
    </section>
  );
};

export default CitySection;
