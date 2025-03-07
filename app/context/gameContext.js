'use client';

import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children, players }) => {
  const [gameConfig, setGameConfig] = useState({
    numberOfPlayers: 4,
    players: players,
    // Vous pouvez ajouter d'autres propriétés ici (deck, tour, etc.)
  });
  console.log(players);
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
