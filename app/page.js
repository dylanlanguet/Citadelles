'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Player } from '../models/Player';
import { useGame } from './context/gameContext';
import { Deck } from '../models/Deck';
import styles from './page.module.css';

const HomePageConfig = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [players, setPlayers] = useState([]);
  const [oldestPlayerIndex, setOldestPlayerIndex] = useState(null);
  const router = useRouter();
  const { updateGameConfig } = useGame();

  useEffect(() => {
    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      newPlayers.push(new Player('', ''));
    }
    setPlayers(newPlayers);
    setOldestPlayerIndex(null);
  }, [numberOfPlayers]);

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleOldestPlayerSelection = (index) => {
    let updatedPlayers = [...players];
    if (oldestPlayerIndex === index) {
      setOldestPlayerIndex(null);
      updatedPlayers = updatedPlayers.map(player => {
        player.isOldest = false;
        return player;
      });
    } else {
      setOldestPlayerIndex(index);
      updatedPlayers = updatedPlayers.map((player, i) => {
        player.isOldest = i === index;
        return player;
      });
    }
    setPlayers(updatedPlayers);
  };

  const validateForm = () => {
    return players.every(player => player.name.trim() !== '') && oldestPlayerIndex !== null;
  };

  const handleLaunchGame = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs et sélectionner le joueur le plus âgé.');
      return;
    }
  
    // 🔹 Charger et mélanger le deck avant de lancer la partie
    const deck = await Deck.initializeDeck();
    if (!deck) {
      alert('❌ Erreur lors de l’initialisation du deck. Vérifiez votre connexion.');
      return;
    }
  
    updateGameConfig({
      numberOfPlayers,
      players,
      deck, // 🔹 Ajoute le deck à la config du jeu
    });
  
    console.log('✅ Partie prête avec deck :', deck.cards.length, 'cartes.');
    router.push('/game'); // 🔹 Passe à la page de jeu
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Citadelles - Paramétrer la Partie</title>
        <meta name="description" content="Configurez votre partie de Citadelles avant de lancer le jeu" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Citadelles</h1>
        <p className={styles.subtitle}>Paramétrez votre partie médiévale</p>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleLaunchGame} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="numberOfPlayers">Nombre de joueurs :</label>
            <select
              id="numberOfPlayers"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))}
              className={styles.select}
            >
              {Array.from({ length: 4 }, (_, i) => i + 4).map(num => (
                <option key={num} value={num}>
                  {num} joueurs
                </option>
              ))}
            </select>
          </div>
          <div className={styles.playersList}>
            {players.map((player, index) => (
              <PlayerInputRow
                key={index}
                index={index}
                player={player}
                onChange={handlePlayerChange}
                onSelectOldest={handleOldestPlayerSelection}
                isOldest={index === oldestPlayerIndex}
              />
            ))}
          </div>
          <button type="submit" className={styles.launchButton}>
            Lancer la Partie
          </button>
        </form>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Citadelles Project</p>
      </footer>
    </div>
  );
};

const PlayerInputRow = ({ index, player, onChange, isOldest, onSelectOldest }) => (
  <div className={styles.playerRow}>
    <h3>Joueur {index + 1}</h3>
    <div className={styles.inputGroup}>
      <label htmlFor={`player-name-${index}`}>Nom :</label>
      <input
        type="text"
        id={`player-name-${index}`}
        value={player.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        placeholder="Entrez le nom"
      />
    </div>
    <div className={styles.inputGroup}>
      <label>
        <input
          type="checkbox"
          checked={isOldest}
          onChange={() => onSelectOldest(index)}
        />
        Joueur le plus âgé
      </label>
    </div>
  </div>
);

export default HomePageConfig;
