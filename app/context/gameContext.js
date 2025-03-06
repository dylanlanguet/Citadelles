'use client';

import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameConfig, setGameConfig] = useState({
    numberOfPlayers: 4,
    players: [],
    // Vous pouvez ajouter d'autres propriétés ici (deck, tour, etc.)
  });

  const updateGameConfig = (newConfig) => {
    setGameConfig(newConfig);
  };

  return (
    <GameContext.Provider value={{ gameConfig, updateGameConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
