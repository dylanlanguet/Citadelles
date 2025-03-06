'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Import du hook pour la navigation
import styles from './page.module.css';
import { useGame } from '../context/GameContext';

/**
 * HomePageConfig est un composant qui permet de configurer la partie de
 * Citadelles avant de lancer le jeu. Il permet de choisir le nombre de joueurs
 * et de saisir les informations de chaque joueur (nom et date de naissance).
 *
 * @returns {JSX.Element} Un JSX.Element représentant le formulaire de
 * configuration de la partie.
 */
const HomePageConfig = () => {
  const { gameConfig, updateGameConfig } = useGame();
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [players, setPlayers] = useState([]);
  const [oldestPlayerIndex, setOldestPlayerIndex] = useState(null);
  const router = useRouter(); // Initialisation du router

  useEffect(() => {
    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      newPlayers.push({ name: '', isOldest: false });
    }
    setPlayers(newPlayers);
    setOldestPlayerIndex(null);
  }, [numberOfPlayers]);

  /**
   * Met à jour les informations d'un joueur en fonction de son index et
   * du champ modifié.
   *
   * @param {number} index - L'index du joueur à modifier
   * @param {string} field - Le nom du champ à modifier (nom ou birthDate)
   * @param {any} value - La nouvelle valeur du champ
   */
  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleOldestPlayerSelection = (index) => {
    if (oldestPlayerIndex === index) {
      setOldestPlayerIndex(null);
      const updatedPlayers = players.map((player) => ({
        ...player,
        isOldest: false,
      }));
      setPlayers(updatedPlayers);
    } else {
      setOldestPlayerIndex(index);
      const updatedPlayers = players.map((player, i) => ({
        ...player,
        isOldest: i === index,
      }));
      setPlayers(updatedPlayers);
    }
  };

  /**
   * Vérifie si le formulaire de configuration de la partie est valide.
   *
   * Le formulaire est valide si tous les champs (nom et date de naissance)
   * sont renseignés pour chaque joueur.
   *
   * @returns {boolean} true si le formulaire est valide, false sinon
   */
  const validateForm = () => {
    return players.every((player) => player.name) && oldestPlayerIndex !== null;
  };

  /**
   * Gère la soumission du formulaire de configuration de la partie.
   * 
   * Vérifie si le formulaire est valide, et si c'est le cas, logue les
   * informations de configuration de la partie dans la console et affiche
   * un message indiquant que la partie a été lancée.
   * 
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleLaunchGame = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs et sélectionner un joueur le plus âgé.');
      return;
    }
    console.log('Configuration de la partie:', { numberOfPlayers, players });
    // Redirection vers la page /game
    router.push('/game');
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
              {Array.from({ length: 4 }, (_, i) => i + 4).map((num) => (
              {Array.from({ length: 4 }, (_, i) => i + 4).map((num) => (
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

/**
 * Composant qui permet de saisir les informations d'un joueur (nom et date
 * de naissance) dans le formulaire de configuration de la partie.
 *
 * @param {number} index - L'index du joueur
 * @param {object} player - L'objet contenant les informations du joueur
 * @param {function(number, string, any)} onChange - La fonction qui sera
 * appelée pour mettre à jour les informations du joueur
 * @returns {JSX.Element} Un JSX.Element représentant le formulaire pour un
 * joueur
 */
const PlayerInputRow = ({ index, player, onChange }) => (
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