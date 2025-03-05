'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { GameProvider, useGame } from '../context/gameContext';
import Card from '../components/card'; // ajuste le chemin selon ton arborescence
import CitySection from '../components/citySection'; // nouveau composant pour la cité
import styles from './game.module.css';

const GameContent = () => {
  const { gameConfig } = useGame();
  const [selectedHandCard, setSelectedHandCard] = useState(null);

  // Données simulées pour la main du joueur
  const handCardsData = [
    { id: 1, title: 'Carte 1', content: 'Détails de la carte 1' },
    { id: 2, title: 'Carte 2', content: 'Détails de la carte 2' },
    { id: 3, title: 'Carte 3', content: 'Détails de la carte 3' },
  ];

  const handleHandCardClick = (id) => {
    console.log(`Carte de main ${id} cliquée`);
    setSelectedHandCard(id);
    // Logique supplémentaire pour la main si nécessaire
  };

  // Données simulées pour la cité construite (quartiers posés)
  const cityDistrictsData = [
    { id: 101, title: 'District 1', content: 'Quartier commerçant' },
    { id: 102, title: 'District 2', content: 'Quartier résidentiel' },
    { id: 103, title: 'District 3', content: 'Quartier religieux' },
  ];

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
        {/* Section d'infos de la partie */}
        <section className={styles.gameInfo}>
          <h2>Configuration de la partie</h2>
          <p>
            <strong>Nombre de joueurs :</strong> {gameConfig.numberOfPlayers}
          </p>
          <h3>Liste des joueurs :</h3>
          <ul>
            {gameConfig.players &&
              gameConfig.players.map((player, index) => (
                <li key={index}>
                  <strong>Joueur {index + 1} :</strong> {player.name} - {player.birthDate}
                </li>
              ))}
          </ul>
        </section>

        {/* Section de la cité (composant séparé) */}
        <CitySection cityDistrictsData={cityDistrictsData} />

        {/* Séparateur clair */}
        <hr className={styles.separator} />

        {/* Section de la main du joueur */}
        <section className={styles.handSection}>
          <h2>Votre main</h2>
          <div className={styles.handContainer}>
            {handCardsData.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                content={card.content}
                onClick={() => handleHandCardClick(card.id)}
                selected={card.id === selectedHandCard}
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

const GamePage = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default GamePage;
