'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CitySection from '../components/citySection';
import CardView from '../components/cardView';
import ActionButton from '../components/actionButton';
import PlayerCarousel from '../components/PlayerCarousel';
import { GameProvider } from '../context/gameContext';
import defaultGameConfig from '../context/gameContext';
import styles from './game.module.css';

const GameContent = () => {
  const [districtDeck, setDistrictDeck] = useState([]);
  const [characterDeck, setCharacterDeck] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exemple de données simulées pour les joueurs
  const playersData = defaultGameConfig;

  const [selectedHandCard, setSelectedHandCard] = useState(null);
  const [currentPlayerIndex] = useState(0);
  const [currentTurn] = useState(1);

  // Pour le moment, on utilisera le districtDeck pour afficher les BuildingCards
  // et éventuellement le characterDeck pour le choix des personnages.

  // Chargement des decks depuis l'API
  useEffect(() => {
    async function loadDecks() {
      const response = await fetch('/api/decks');
      const data = await response.json();
      setDistrictDeck(data.districtDeck);
      setCharacterDeck(data.characterDeck);
      setLoading(false);
    }
    loadDecks();
  }, []);

  if (loading) {
    return <div>Chargement des decks...</div>;
  }

  const currentPlayer = playersData[currentPlayerIndex];

  const handleHandCardClick = (id) => {
    console.log(`Carte de main ${id} cliquée`);
    setSelectedHandCard(id);
  };

  // Gestionnaires pour les actions
  const handleTakeCoins = () => {
    console.log("Action : Prendre 2 pièces");
  };

  const handleDrawGold = () => {
    console.log("Action : Piocher de l'or");
  };

  const handleDrawCards = () => {
    console.log("Action : Piocher des cartes");
  };

  const handlePassTurn = () => {
    console.log("Action : Passer son tour");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Citadelles - Partie en cours</title>
        <meta name="description" content="Affichage de la partie en cours" />
      </Head>

      <nav className={styles.navbar}>
        {/* Informations du tour et du joueur */}
        <div className={styles.turnInfo}>
          <span className={styles.turnNumber}>🕰️ Tour {currentTurn}</span>
        </div>
        <div className={styles.playerInfo}>
          <span className={styles.playerName}>{currentPlayer.name}</span>
          <span className={styles.playerNumber}>Joueur {currentPlayerIndex + 1}</span>
          <span className={styles.role}>🎭 {currentPlayer.role}</span>
        </div>
        <div className={styles.stats}>
          <span className={styles.gold}>💰 {currentPlayer.gold}</span>
          <span className={styles.points}>🏅 {currentPlayer.points}</span>
        </div>
      </nav>

      {/* Carousel des joueurs */}
      <div className={styles.carouselWrapper}>
        <PlayerCarousel players={playersData} currentPlayerIndex={currentPlayerIndex} />
      </div>

      <main className={styles.main}>
        {/* Section d'informations de la partie */}
        <section className={styles.gameInfo}>
          <h2>Configuration de la partie</h2>
          <p><strong>Nombre de joueurs :</strong> {playersData.length}</p>
        </section>

        {/* Section de la cité */}
        <CitySection cityDistrictsData={districtDeck} />

        <hr className={styles.separator} />

        {/* Section de la main du joueur */}
        <section className={styles.handSection}>
          <h2>Votre main</h2>
          <div className={styles.handContainer}>
            {/* Ici tu peux choisir d’afficher par exemple les 4 premières cartes du districtDeck */}
            {districtDeck.slice(0, 4).map((card) => (
              <CardView
                key={card.id}
                card={card}
                onClick={() => handleHandCardClick(card.id)}
                selected={card.id === selectedHandCard}
              />
            ))}
          </div>
        </section>

        <hr className={styles.separator} />

        {/* Section des boutons d'action */}
        <div className={styles.bottomContainer}>
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
