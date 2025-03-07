'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import CitySection from '../components/citySection';
import CardView from '../components/cardView';
import ActionButton from '../components/actionButton';
import PlayerCarousel from '../components/PlayerCarousel';
import CharacterSelectionPanel from '../components/CharacterSelectionPanel';
import { useGame } from '../context/gameContext';
import { GameEngine } from '../../models/GameEngine';
import { CharacterCard } from '../../models/characterCard';
import styles from './game.module.css';

const GameContent = () => {
  const { gameConfig, updateGameConfig } = useGame();
  const [districtDeck, setDistrictDeck] = useState([]);
  const [characterDeck, setCharacterDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHandCard, setSelectedHandCard] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // pour forcer un re-render
  const [availableCharacterCards, setAvailableCharacterCards] = useState([]);

  // Utiliser une ref pour stocker l'instance du moteur de jeu
  const engineRef = useRef(null);

  if (!gameConfig.players || gameConfig.players.length === 0) {
    return <div>Chargement de la configuration...</div>;
  }
  const playersData = gameConfig.players;

  // Initialiser le moteur de jeu une seule fois (au montage)
  useEffect(() => {
    if (!engineRef.current && playersData.length > 0) {
      engineRef.current = new GameEngine(playersData);
    }
  }, []); // <- Ne dépend plus de playersData

  // Charger les decks depuis l'API et transformer les characterCards
  useEffect(() => {
    async function loadDecks() {
      const response = await fetch('/api/decks');
      const data = await response.json();
      setDistrictDeck(data.districtDeck);
      setCharacterDeck(data.characterDeck);
      // Transformer raw characterDeck en instances de CharacterCard
      const chars = data.characterDeck.map(cardData =>
        new CharacterCard(
          cardData.id,
          cardData.title,
          cardData.content,
          cardData.type,
          cardData.power
        )
      );
      setAvailableCharacterCards(chars);
      setLoading(false);
    }
    loadDecks();
  }, []);

  if (loading || !engineRef.current) {
    return <div>Chargement...</div>;
  }

  // Filtrer les cartes disponibles pour exclure celles déjà sélectionnées par un joueur
  const filteredAvailableCards = availableCharacterCards.filter(card =>
    !playersData.some(player => player.selectedCharacter && player.selectedCharacter.id === card.id)
  );

  // Si la phase est "characterSelection", afficher l'overlay de sélection
  if (engineRef.current.phase === 'characterSelection') {
    return (
      <div className={styles.container}>
        <Head>
          <title>Citadelles - Sélection de personnage</title>
        </Head>
        <CharacterSelectionPanel
          availableCards={filteredAvailableCards}
          gameEngine={engineRef.current}
          onSelectionComplete={() => {
            // Forcer le re-render pour afficher la phase d'action
            setUpdateCounter(prev => prev + 1);
          }}
          gameConfig={gameConfig}
          updateGameConfig={updateGameConfig}
        />
      </div>
    );
  }

  // Sinon, phase d'action : afficher l'interface complète du jeu
  const currentPlayer = engineRef.current.getCurrentPlayer();
  const currentTurn = engineRef.current.currentTurn;
  const currentPlayerIndex = engineRef.current.currentPlayerIndex;

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
    engineRef.current.nextTurn();
    setUpdateCounter(prev => prev + 1);
    // Vous pouvez recharger la phase de sélection si nécessaire ici
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
