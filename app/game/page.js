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
 import { useRouter } from 'next/navigation';
import styles from './game.module.css';


const GameContent = () => {
  const { gameConfig, updateGameConfig } = useGame();
  const [districtDeck, setDistrictDeck] = useState([]);
  const [characterDeck, setCharacterDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHandCard, setSelectedHandCard] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // pour forcer un re-render
  const router = useRouter();
  const [availableCharacterCards, setAvailableCharacterCards] = useState([]);

  // Utiliser une ref pour stocker l'instance du moteur de jeu
  const engineRef = useRef(null);

  if (!gameConfig.players || gameConfig.players.length === 0) {
    return router.push('/');
    updateCounter;
    characterDeck;
  }
  const playersData = gameConfig.players;

  // Initialiser le moteur de jeu une seule fois (au montage)
  useEffect(() => {
    if (!engineRef.current && playersData.length > 0) {
      engineRef.current = new GameEngine(playersData);
    }
  }, []);

  // Charger les decks depuis l'API et transformer les characterCards
  useEffect(() => {
  /**
   * Charge les decks de cartes depuis l'API.
   * Une fois la réponse reçue, les decks sont stockés dans les états districtDeck et characterDeck.
   * Les cartes du characterDeck sont transformées en instances de CharacterCard.
   * Les cartes ainsi transformées sont stockées dans l'état availableCharacterCards.
   * L'état loading est mis à jour pour indiquer que le chargement est terminé.
   */
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

  if (loading) {
    return <div>Chargement...</div>;
  } else if (!engineRef.current) {
    router.push('/');
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

  /**
   * Gestionnaire d'événement pour la sélection d'une carte de main :
   * enregistre l'ID de la carte sélectionnée dans l'état local
   * @param {number} id L'ID de la carte de main cliquée
   */
  const handleHandCardClick = (id) => {
    console.log(`Carte de main ${id} cliquée`);
    setSelectedHandCard(id);
  };

  /**
   * Gestionnaire d'événement pour l'action de prendre 2 pièces :
   * ajoute 2 pièces au joueur courant et force le re-render pour afficher la mise à jour
   */
  const handleTakeCoins = () => {
    console.log("Action : Prendre 2 pièces");
    currentPlayer.addGold(2);
    setUpdateCounter(prev => prev + 1);
  };

  /**
   * Gestionnaire d'événement pour l'action de piocher de l'or :
   * ajoute 1 pièce au joueur courant et force le re-render pour afficher la mise à jour
   */
  const handleDrawGold = () => {
    console.log("Action : Piocher de l'or");
    currentPlayer.addGold(1);
    setUpdateCounter(prev => prev + 1);
  };

/**
 * Gestionnaire d'événement pour l'action de piocher des cartes :
 * affiche un message indiquant l'action et implémente la logique de pioche.
 */

  const handleDrawCards = () => {
    console.log("Action : Piocher des cartes");
    // Implémentez la logique de pioche ici
  };

  // Nouveau bouton : utiliser son pouvoir
  const handleUsePower = () => {
    // Vérifier que le joueur courant a un personnage avec un pouvoir
    if (currentPlayer.selectedCharacter && currentPlayer.selectedCharacter.power) {
      if (currentPlayer.selectedCharacter.power === 'Élimination') {
        const targetId = prompt("Entrez l'ID du personnage à éliminer:");
        if (targetId) {
          currentPlayer.selectedCharacter.activatePower(engineRef.current, currentPlayer, parseInt(targetId));
        }
      } else if (currentPlayer.selectedCharacter.power === 'Vol') {
        const targetId = prompt("Entrez l'ID du personnage dont vous voulez voler l'or:");
        if (targetId) {
          currentPlayer.selectedCharacter.activatePower(engineRef.current, currentPlayer, parseInt(targetId));
        }
      } else if (currentPlayer.selectedCharacter.power === 'Échange') {
        // Implémenter la logique pour l'échange, par exemple via une interface dédiée
        alert("Pouvoir d'échange non implémenté pour le moment.");
      } else {
        alert("Pouvoir non implémenté pour ce personnage.");
      }
      // Après activation, passer au joueur suivant
      
      setUpdateCounter(prev => prev + 1);
    } else {
      alert("Votre personnage n'a pas de pouvoir utilisable.");
    }
  };
  

/**
 * Gestionnaire d'événement pour l'action de passer son tour :
 * passe le tour au joueur suivant et termine la phase d'action si tous les joueurs ont joué.
 * @returns {void}
 */

  const handlePassTurn = () => {
    console.log("Action : Passer son tour");
    engineRef.current.nextTurn();
    // Si on revient au premier joueur, c'est que tous ont joué pendant ce tour d'action.
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
            <ActionButton label="Prendre sa dîme" onClick={handleDrawGold} disabled={false} />
            <ActionButton label="Piocher des cartes" onClick={handleDrawCards} disabled={false} />
            <ActionButton label="Utiliser son pouvoir" onClick={handleUsePower} disabled={false} />
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

/**
 * Page de jeu principal, affichant les informations de la partie et les actions disponibles
 * @returns {JSX.Element} Le composant JSX de la page de jeu
 */
const GamePage = () => {
  return <GameContent />;
};

export default GamePage;