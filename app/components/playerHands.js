'use client';

import React, { useState, useEffect } from 'react';
import Card from './card'; // Assure-toi que le chemin correspond à l'emplacement de ton composant Card
import styles from './playerHand.module.css';

const PlayerHand = ({ hand }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Réinitialise la sélection si la main change et que la carte sélectionnée n'existe plus
  useEffect(() => {
    if (!hand.find(card => card.id === selectedCardId)) {
      setSelectedCardId(null);
    }
  }, [hand, selectedCardId]);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
    // Ajoute ici la logique que tu souhaites déclencher lors de la sélection (ex. choisir une carte pour construire)
    console.log(`Carte ${cardId} sélectionnée`);
  };

  return (
    <div className={styles.handContainer}>
      {hand.map(card => (
        <Card
          key={card.id}
          title={card.title}
          content={card.content}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default PlayerHand;
