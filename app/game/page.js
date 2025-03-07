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
import { BuildingCard } from '../../models/buildingCard';
import { useRouter } from 'next/navigation';
import styles from './game.module.css';

const GameContent = () => {
  const { gameConfig, updateGameConfig } = useGame();
  const [districtDeck, setDistrictDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHandCard, setSelectedHandCard] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // Pour forcer un re-render
  const router = useRouter();
  const [availableCharacterCards, setAvailableCharacterCards] = useState([]);

  // Stocker le moteur de jeu dans une ref pour l'initialiser une seule fois
  const engineRef = useRef(null);
  const isFirstRender = useRef(true);

  // Redirection si la configuration est vide
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!gameConfig.players || gameConfig.players.length === 0) {
        console.log('Redirection vers la page principale');
        router.push('/');
      }
    }
  }, [gameConfig, router]);

  // Initialiser le moteur de jeu une seule fois
  useEffect(() => {
    if (!engineRef.current && gameConfig.players.length > 0) {
      engineRef.current = new GameEngine(gameConfig.players);
    }
  }, [gameConfig.players]);

  // Charger les decks depuis l'API et transformer les cartes en instances
  useEffect(() => {
    async function loadDecks() {
      const response = await fetch('/api/decks');
      const data = await response.json();
      // Transformer raw districtDeck en instances de BuildingCard
      const buildingCards = data.districtDeck.map(cardData =>
        new BuildingCard(
          cardData.id,
          cardData.title,
          cardData.content,
          cardData.type,
          cardData.cost,
          cardData.utility,
          cardData.quantity
        )
      );
      setDistrictDeck(buildingCards);
      // Transformer raw characterDeck en instances de CharacterCard
      setAvailableCharacterCards(
        data.characterDeck.map(cardData =>
          new CharacterCard(
            cardData.id,
            cardData.title,
            cardData.content,
            cardData.type,
            cardData.power
          )
        )
      );
      setLoading(false);
    }
    loadDecks();
  }, []);

  // Distribuer 4 cartes et 2 pièces d'or à tous les joueurs, si ce n'est pas déjà fait
  useEffect(() => {
    if (!loading && districtDeck.length > 0 && !gameConfig.initialized && engineRef.current) {
      let deckCopy = [...districtDeck];
      engineRef.current.players.forEach(player => {
        player.gold = 2;
        if (deckCopy.length >= 4) {
          player.hand = deckCopy.splice(0, 4);
        } else {
          player.hand = [...deckCopy];
          deckCopy = [];
        }
      });
      updateGameConfig({ ...gameConfig, initialized: true });
      setDistrictDeck(deckCopy);
      setUpdateCounter(prev => prev + 1);
    }
  }, [loading, districtDeck, gameConfig, updateGameConfig]);

  if (loading) {
    return <div>Chargement...</div>;
  }
  if (!engineRef.current) {
    router.push('/');
  }

  const currentPlayer = engineRef.current.getCurrentPlayer();
  const currentTurn = engineRef.current.currentTurn;
  const currentPlayerIndex = engineRef.current.currentPlayerIndex;

  // Afficher la main du joueur à partir de currentPlayer.hand
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
    if (districtDeck.length === 0) {
      alert("Le deck est vide, vous ne pouvez pas piocher de cartes.");
      return;
    }
    // Retirer la dernière carte du deck pour simuler une pioche
    const drawnCard = districtDeck[districtDeck.length - 1];
    setDistrictDeck(prev => prev.slice(0, prev.length - 1));
    currentPlayer.hand.push(drawnCard);
    console.log(`${currentPlayer.name} a pioché la carte "${drawnCard.title}".`);
    setUpdateCounter(prev => prev + 1);
  };

  const handlePlayBuildingCard = () => {
    if (!selectedHandCard) {
      alert("Veuillez sélectionner une carte bâtiment de votre main.");
      return;
    }
    // Chercher la BuildingCard dans la main du joueur
    const buildingCard = currentPlayer.hand.find(card => card.id === selectedHandCard);
    if (!buildingCard) {
      alert("Carte non trouvée dans votre main.");
      return;
    }
    if (currentPlayer.gold < buildingCard.cost) {
      alert("Vous n'avez pas assez d'or pour construire ce bâtiment.");
      return;
    }
    // Jouer la BuildingCard
    buildingCard.play();
    // Déduire le coût du bâtiment
    currentPlayer.removeGold(buildingCard.cost);
    // Déplacer la carte de la main vers la cité
    currentPlayer.playCard(buildingCard.id);
    updateGameConfig({ ...gameConfig });
    setSelectedHandCard(null);
    setUpdateCounter(prev => prev + 1);
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
      } else if (power === 'Échange') {
        currentPlayer.selectedCharacter.activatePower(engineRef.current, currentPlayer);
      } else {
        alert("Pouvoir non implémenté pour ce personnage.");
      }
      engineRef.current.nextTurn();
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

  if (engineRef.current.phase === 'characterSelection') {
    return (
      <div className={styles.container}>
        <Head>
          <title>Citadelles - Sélection de personnage</title>
        </Head>
        <CharacterSelectionPanel
          availableCards={availableCharacterCards.filter(card =>
            !gameConfig.players.some(player => player.selectedCharacter && player.selectedCharacter.id === card.id)
          )}
          gameEngine={engineRef.current}
          onSelectionComplete={() => {
            setUpdateCounter(prev => prev + 1);
          }}
          gameConfig={gameConfig}
          updateGameConfig={updateGameConfig}
        />
      </div>
    );
  }

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
            {currentPlayer.hand && currentPlayer.hand.length > 0 ? (
              currentPlayer.hand.map((card, idx) => (
                <CardView
                  key={`${card.id}-${idx}`}
                  card={card}
                  onClick={() => handleHandCardClick(card.id)}
                  selected={card.id === selectedHandCard}
                />
              ))
            ) : (
              <p>Votre main est vide.</p>
            )}
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
