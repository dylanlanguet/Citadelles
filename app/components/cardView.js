import React from 'react';
import styles from './cardView.module.css';

/**
 * Composant pour afficher une carte de jeu
 * @param {Card} card La carte à afficher
 * @param {function} onClick La fonction à appeler lors d'un clic sur la carte
 * @param {boolean} [selected=false] Si la carte est sélectionnée
 * @returns {JSX.Element}
 */
const CardView = ({ card, onClick, selected }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}  // Ajouter un style 'selected' si la carte est sélectionnée
      onClick={onClick}
    >
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </div>
  );
};

export default CardView;