'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CitySection from '../components/citySection';
import CardView from '../components/cardView';
import ActionButton from '../components/actionButton';
import PlayerCarousel from '../components/PlayerCarousel';
import { useGame } from '../context/gameContext';
import styles from './game.module.css';

const GameContent = () => {
  const { gameConfig } = useGame();
  const [districtDeck, setDistrictDeck] = useState([]);
  const [characterDeck, setCharacterDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHandCard, setSelectedHandCard] = useState(null);

  // Vérifier que la configuration est disponible
  if (!gameConfig.players || gameConfig.players.length === 0) {
    return <div>Chargement de la configuration...</div>;
  }

  const playersData = gameConfig.players;
  const currentPlayerIndex = 0; // Ajustez selon votre logique de tour
  const currentTurn = 1; // Statique pour cet exemple

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

      <div className={styles.carouselWrapper}>
        <PlayerCarousel players={playersData} currentPlayerIndex={currentPlayerIndex} />
      </div>

      <main className={styles.main}>
        <section className={styles.gameInfo}>
          <h2>Configuration de la partie</h2>
          <p><strong>Nombre de joueurs :</strong> {playersData.length}</p>
        </section>

        <CitySection cityDistrictsData={districtDeck} />

        <hr className={styles.separator} />

        <section className={styles.handSection}>
          <h2>Votre main</h2>
          <div className={styles.handContainer}>
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
  return <GameContent />;
};

export default GamePage;
