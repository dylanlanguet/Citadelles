'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { GameProvider, useGame } from '../context/gameContext';
import Card from '../../models/card'; // Ton composant de carte déjà existant
import ActionButton from '../components/actionButton'; // Notre nouveau composant
import CitySection from '../components/citySection'; // Composant séparé pour la cité (déjà créé)
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

  // Données simulées pour la cité construite (quartiers posés)
  const cityDistrictsData = [
    { id: 101, title: 'District 1', content: 'Quartier commerçant' },
    { id: 102, title: 'District 2', content: 'Quartier résidentiel' },
    { id: 103, title: 'District 3', content: 'Quartier religieux' },
  ];

  const handleHandCardClick = (id) => {
    console.log(`Carte de main ${id} cliquée`);
    setSelectedHandCard(id);
  };

  // Gestionnaires pour les actions de jeu
  const handleTakeCoins = () => {
    console.log("Action : Prendre 2 pièces");
    // Ajoute ici la logique pour prendre 2 pièces
  };

  const handleDrawGold = () => {
    console.log("Action : Piocher de l'or");
    // Logique pour le pouvoir du personnage (piocher de l'or)
  };

  const handleDrawCards = () => {
    console.log("Action : Piocher des cartes");
    // Logique pour piocher des cartes
  };

  const handlePassTurn = () => {
    console.log("Action : Passer son tour");
    // Logique pour passer son tour
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
        {/* Section d'informations sur la partie */}
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

        {/* Section de la cité */}
        <CitySection cityDistrictsData={cityDistrictsData} />

        {/* Séparateur visuel */}
        <hr className={styles.separator} />

        {/* Conteneur pour la main et les boutons d'action */}
        <div className={styles.bottomContainer}>
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

          {/* Section des boutons d'action */}
          <aside className={styles.actionsContainer}>
            <ActionButton label="Prendre 2 pièces" onClick={handleTakeCoins} disabled={false} />
            <ActionButton label="Piocher de l'or" onClick={handleDrawGold} disabled={false} />
            <ActionButton label="Piocher des cartes" onClick={handleDrawCards} disabled={false} />
            <ActionButton label="Passer son tour" onClick={handlePassTurn} disabled={false} />
          </aside>
        </div>
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
