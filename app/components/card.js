'use client';

import React from 'react';
import styles from './card.module.css';

const Card = ({ title, content, onClick, selected }) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
