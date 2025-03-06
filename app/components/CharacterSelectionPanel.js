'use client';

import React, { useState } from 'react';
import CardView from './cardView';
import styles from './CharacterSelectionPanel.module.css';

const CharacterSelectionPanel = ({ availableCards, gameEngine, onSelectionComplete, gameConfig, updateGameConfig }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const currentPlayer = gameEngine.getCurrentPlayer();
  const currentPlayerIndex = gameEngine.currentPlayerIndex;
  const currentTurn = gameEngine.currentTurn;

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleValidate = () => {
    if (!selectedCard) {
      alert("Veuillez sélectionner une carte !");
      return;
    }
    // Affecter la carte sélectionnée au joueur courant
    currentPlayer.selectedCharacter = selectedCard;
    console.log(`${currentPlayer.name || 'Joueur ' + (currentPlayerIndex + 1)} a sélectionné ${selectedCard.title}`);
    
    // Mettre à jour le contexte avec les joueurs modifiés
    const updatedPlayers = [...gameEngine.players];
    updateGameConfig({ ...gameConfig, players: updatedPlayers });
    
    // Passer au joueur suivant
    gameEngine.nextTurn();
    setSelectedCard(null);
    
    if (gameEngine.allPlayersHaveSelected()) {
      gameEngine.endSelectionPhase();
      onSelectionComplete();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2>Phase de sélection de personnage</h2>
        <p>
          Tour {currentTurn} – Joueur {currentPlayerIndex + 1} : {currentPlayer.name || 'Nom non défini'}
        </p>
        <div className={styles.cardsContainer}>
          {availableCards.map(card => (
            <CardView
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              selected={selectedCard && card.id === selectedCard.id}
            />
          ))}
        </div>
        <button className={styles.validateButton} onClick={handleValidate}>
          Valider la sélection
        </button>
      </div>
    </div>
  );
};

export default CharacterSelectionPanel;
