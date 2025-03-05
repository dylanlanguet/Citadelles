'use client';

import React from 'react';
import styles from './actionButton.module.css';

const ActionButton = ({ label, onClick, disabled }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButton;
