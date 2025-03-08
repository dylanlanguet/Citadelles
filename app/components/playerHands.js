'use client';

import React, { useState, useEffect } from 'react';
import CardView from '../components/cardView';
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
    console.log(`Carte ${cardId} sélectionnée`);
  };

  return (
    <div className={styles.handContainer}>
      {hand.map(card => (
        <CardView
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)}
          selected={card.id === selectedCardId}
        />
      ))}
    </div>
  );
};

export default PlayerHand;
m