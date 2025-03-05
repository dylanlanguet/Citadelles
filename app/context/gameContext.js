'use client';

import { createContext, useState, useContext } from 'react';

// Création du contexte
const GameContext = createContext();

// Fournisseur qui englobe l'application et rend l'état accessible partout
export const GameProvider = ({ children }) => {
  // L'état initial peut inclure le nombre de joueurs et la liste des joueurs
  const [gameConfig, setGameConfig] = useState({
    numberOfPlayers: 4,
    players: [],
    // On pourra ajouter ici d'autres informations au fur et à mesure, comme l'ordre des tours, etc.
  });

  // Fonction pour mettre à jour la configuration de jeu
  const updateGameConfig = (newConfig) => {
    setGameConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  return (
    <GameContext.Provider value={{ gameConfig, updateGameConfig }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useGame = () => useContext(GameContext);
