'use client';

import React, { useState } from 'react';
import CardView from './cardView';
import styles from './citySection.module.css';

/**
 * Composant affichant la cité du joueur
 * @param {{ id: number, title: string, content: string }[]} cityDistrictsData Les données des quartiers disponibles
 * @param {{ id: number, title: string, content: string }} selectDistrictData Le quartier sélectionné
 * @returns {JSX.Element}
 */
const CitySection = ({ cityDistrictsData, selectDistrictData }) => {
  const [constructedDistricts, setConstructedDistricts] = useState([]); // Variable pour stocker les quartiers construits
  const [selectedCityCard, setSelectedCityCard] = useState(null);

  /**
   * Gestionnaire d'événement pour ajouter un quartier à la cité construite
   * @param {number} id L'ID du quartier cliqué
   */
  const handleCityCardClick = (id) => {
    console.log(`Quartier ${id} cliqué`);
    setSelectedCityCard(id);  // Met à jour l'ID du quartier sélectionné

    // Ajoute le quartier sélectionné à la liste des quartiers construits
    const selectedDistrict = cityDistrictsData.find(district => district.id === id);
    if (selectedDistrict) {
      setConstructedDistricts([...constructedDistricts, selectedDistrict]);
    }
  };

  return (
    <section className={styles.citySection}>
      <h2>Votre cité</h2>
      <div className={styles.cityContainer}>
        {/* Afficher les quartiers déjà construits */}
        {constructedDistricts.length > 0 ? (
          constructedDistricts.map((district) => (
            <CardView
              key={district.id}
              card={district}
              onClick={() => handleCityCardClick(district.id)} // On clique pour sélectionner
              selected={district.id === selectedCityCard} // Vérifie si c'est le quartier sélectionné
            />
          ))
        ) : (
          <p>Aucun quartier construit pour le moment.</p> // Message si aucun quartier n'est construit
        )}
      </div>
    </section>
  );
};

export default CitySection;