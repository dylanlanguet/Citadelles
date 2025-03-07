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
  className={`${styles.card} ${selected ? styles.selected : ''}`}
  onClick={onClick}
>
  <div className={styles.cardHeader}>
    <h3 className={styles.cardTitle}>{card.title}</h3>
    <div className={styles.cardTypeCost}>
      {/* Ajouter des classes conditionnelles selon le type */}
      <p
        className={`${styles.cardType} ${styles[card.type]}`}
      >
        {card.type}
      </p>
      <p className={styles.cardCost}>{card.cost}</p>
    </div>
  </div>
  <p className={styles.cardContent}>{card.content}</p>
  <p className={styles.cardUtility}>{card.utility}</p>
</div>

  );
};

export default CardView;