'use client';

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import CitySection from '../components/citySection';
import CardView from '../components/cardView';
import ActionButton from '../components/actionButton';
import PlayerCarousel from '../components/PlayerCarousel';
import CharacterSelectionPanel from '../components/CharacterSelectionPanel';
import { useGame } from '../context/gameContext';
import { GameEngine } from '../../models/GameEngine';
import { CharacterCard } from '../../models/characterCard';
import { useRouter } from 'next/navigation';
import styles from './game.module.css';

const GameContent = () => {
  const { gameConfig, updateGameConfig } = useGame();
  const [districtDeck, setDistrictDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHandCard, setSelectedHandCard] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // pour forcer un re-render
  const router = useRouter();
  const [availableCharacterCards, setAvailableCharacterCards] = useState([]);

  const engineRef = useRef(null);

  const isFirstRender = useRef(true); // Utilisation de useRef pour détecter le premier rendu

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Vérifie si les joueurs sont vides et redirige vers la page principale
      if (!gameConfig.players || gameConfig.players.length === 0) {
        console.log('Redirection vers la page principale');
        router.push('/');
      }
    }
  }, [gameConfig, router]);

  useEffect(() => {
    if (!engineRef.current && gameConfig.players.length > 0) {
      engineRef.current = new GameEngine(gameConfig.players);
    }
  }, [gameConfig.players]);

  useEffect(() => {
    async function loadDecks() {
      const response = await fetch('/api/decks');
      const data = await response.json();
      setDistrictDeck(data.districtDeck);
      setAvailableCharacterCards(data.characterDeck.map(cardData => 
        new CharacterCard(cardData.id, cardData.title, cardData.content, cardData.type, cardData.power)
      ));
      setLoading(false);
    }
    loadDecks();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!engineRef.current) {
    router.push('/');
  }

  const currentPlayer = engineRef.current.getCurrentPlayer();
  const currentTurn = engineRef.current.currentTurn;
  const currentPlayerIndex = engineRef.current.currentPlayerIndex;

  const handleHandCardClick = (id) => {
    console.log(`Carte de main ${id} cliquée`);
    setSelectedHandCard(id);
  };

  const handleTakeCoins = () => {
    console.log("Action : Prendre 2 pièces");
    currentPlayer.addGold(2);
    setUpdateCounter(prev => prev + 1);
  };

  const handleDrawGold = () => {
    console.log("Action : Piocher de l'or");
    currentPlayer.addGold(1);
    setUpdateCounter(prev => prev + 1);
  };

  const handleDrawCards = () => {
    console.log("Action : Piocher des cartes");
  };

  const handleUsePower = () => {
    if (currentPlayer.selectedCharacter && currentPlayer.selectedCharacter.power) {
      const power = currentPlayer.selectedCharacter.power;
      if (power === 'Élimination') {
        const targetId = prompt("Entrez l'ID du personnage à éliminer:");
        if (targetId) {
          currentPlayer.selectedCharacter.activatePower(engineRef.current, currentPlayer, parseInt(targetId));
        }
      } else if (power === 'Vol') {
        const targetId = prompt("Entrez l'ID du personnage dont vous voulez voler l'or:");
        if (targetId) {
          currentPlayer.selectedCharacter.activatePower(engineRef.current, currentPlayer, parseInt(targetId));
        }
      } else if (currentPlayer.selectedCharacter.power === 'Échange') {
        alert("Pouvoir d'échange non implémenté pour le moment.");
      } else {
        alert("Pouvoir non implémenté pour ce personnage.");
      }
      setUpdateCounter(prev => prev + 1);
    } else {
      alert("Votre personnage n'a pas de pouvoir utilisable.");
    }
  };

  const handlePassTurn = () => {
    console.log("Action : Passer son tour");
    engineRef.current.nextTurn();
    if (engineRef.current.currentPlayerIndex === 0) {
      engineRef.current.endActionPhase();
    }
    setUpdateCounter(prev => prev + 1);
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
        <PlayerCarousel players={gameConfig.players} currentPlayerIndex={currentPlayerIndex} />
      </div>
      <main className={styles.main}>
        <section className={styles.gameInfo}>
          <h2>Configuration de la partie</h2>
          <p><strong>Nombre de joueurs :</strong> {gameConfig.players.length}</p>
        </section>

        <CitySection constructedDistricts={currentPlayer.city} />

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
            <ActionButton label="Prendre sa dîme" onClick={handleDrawGold} disabled={false} />
            <ActionButton label="Piocher des cartes" onClick={handleDrawCards} disabled={false} />
            <ActionButton label="Utiliser son pouvoir" onClick={handleUsePower} disabled={false} />
            <ActionButton label="Construire" onClick={handlePlayBuildingCard} disabled={!selectedHandCard} />
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