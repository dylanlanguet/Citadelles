'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useGame } from '../context/GameContext';
import Card from '../../components/Card'; // ajuste le chemin selon ton arborescence
import styles from './game.module.css';

const GamePage = () => {
  const { gameConfig } = useGame();
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = [
    { id: 1, title: 'Carte 1', content: 'Détails de la carte 1' },
    { id: 2, title: 'Carte 2', content: 'Détails de la carte 2' },
    { id: 3, title: 'Carte 3', content: 'Détails de la carte 3' },
  ];

  const handleCardClick = (id) => {
    console.log(`Carte ${id} cliquée`);
    setSelectedCard(id);
    // Tu peux ajouter ici la logique de navigation ou autre action
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Citadelles - Partie en cours</title>
        <meta name="description" content="Affichage de la partie en cours" />
      </Head>
      <header className={styles.header}>
        <h1>Partie en cours</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.gameInfo}>
          <h2>Configuration de la partie</h2>
          <p><strong>Nombre de joueurs :</strong> {gameConfig.numberOfPlayers}</p>
          <h3>Liste des joueurs :</h3>
          <ul>
            {gameConfig.players && gameConfig.players.map((player, index) => (
              <li key={index}>
                <strong>Joueur {index + 1} :</strong> {player.name} - {player.birthDate}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.gameBoard}>
          <h2>Plateau de jeu</h2>
          <div className={styles.cardsContainer}>
            {cardsData.map(card => (
              <Card
                key={card.id}
                title={card.title}
                content={card.content}
                onClick={() => handleCardClick(card.id)}
                selected={card.id === selectedCard}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Citadelles Project</p>
      </footer>
    </div>
  );
};

export default GamePage;
