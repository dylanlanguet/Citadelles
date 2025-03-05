'use client'

import React from 'react';
import Head from 'next/head';
// import { useGame } from '../context/GameContext';
import styles from './game.module.css';

const GamePage = () => {
  // Récupération de la configuration du jeu depuis le contexte
 // const { gameConfig } = useGame();

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
          <p>Ici se déroulera la partie. (Implémentation à venir...)</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Citadelles Project</p>
      </footer>
    </div>
  );
};

export default GamePage;
