'use client';

import React from 'react';
import CardView from './cardView';
import styles from './citySection.module.css';

<<<<<<< HEAD
const CitySection = ({ constructedDistricts }) => {
=======
/**
 * Composant affichant la cité du joueur
 * @param {{ id: number, title: string, content: string }[]} cityDistrictsData Les données des quartiers disponibles
 * @param {{ id: number, title: string, content: string }} selectDistrictData Le quartier sélectionné
 * @returns {JSX.Element}
 */
const CitySection = ({ cityDistrictsData }) => {
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

>>>>>>> 623f1e645d9bfecf4d2dff9ab8217ea9749eac1b
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
