'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './page.module.css';

const HomePageConfig = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [oldestPlayerIndex, setOldestPlayerIndex] = useState(null);

  useEffect(() => {
    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      newPlayers.push({ name: '', isOldest: false });
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
    if (oldestPlayerIndex === index) {
      // Si on clique sur la case déjà cochée, on la décoche
      setOldestPlayerIndex(null);
      const updatedPlayers = players.map((player) => ({
        ...player,
        isOldest: false
      }));
      setPlayers(updatedPlayers);
    } else {
      // Sinon, on sélectionne ce joueur comme le plus âgé
      setOldestPlayerIndex(index);
      const updatedPlayers = players.map((player, i) => ({
        ...player,
        isOldest: i === index
      }));
      setPlayers(updatedPlayers);
    }
  };

  const validateForm = () => {
    return players.every(player => player.name) && oldestPlayerIndex !== null;
  };

  const handleLaunchGame = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs et sélectionner un joueur le plus âgé.');
      return;
    }
    console.log('Configuration de la partie:', { numberOfPlayers, players });
    alert('Partie lancée! (La redirection vers la page de jeu sera implémentée ultérieurement)');
    // router.push('/game');
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
            >
              {Array.from({ length: 7 }, (_, i) => i + 2).map((num) => (
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

const PlayerInputRow = ({ index, player, onChange, onSelectOldest, isOldest }) => (
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
