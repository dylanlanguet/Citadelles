// components/PlayerCarousel.js
'use client';

import React from 'react';
import styles from './playerCarousel.module.css';

const PlayerCarousel = ({ players, currentPlayerIndex }) => {
  return (
    <div className={styles.carouselContainer}>
      {players.map((player, index) => (
        <div key={player.id} className={styles.playerItem}>
          <span className={index === currentPlayerIndex ? styles.active : ''}>
            {player.name}
          </span>
          {index === currentPlayerIndex && (
            <div className={styles.cursor}>⬇</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerCarousel;
