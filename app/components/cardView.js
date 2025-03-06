// components/CardView.js
'use client';

import React from 'react';
import styles from './cardView.module.css'; // Tu pourras adapter ou créer ce fichier de style

const CardView = ({ card, onClick, selected }) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </div>
  );
};

export default CardView;
