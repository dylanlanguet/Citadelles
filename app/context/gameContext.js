// app/context/gameContext.js
'use client';

import { createContext, useContext } from 'react';

const GameContext = createContext({
  gameConfig: {
    numberOfPlayers: 4,
    players: [
      { name: 'Alice', birthDate: '1990-01-01' },
      { name: 'Bob', birthDate: '1991-02-02' },
      { name: 'Charlie', birthDate: '1992-03-03' },
      { name: 'David', birthDate: '1993-04-04' }
    ]
  },
  updateGameConfig: () => {}
});

export const GameProvider = ({ children }) => {
  // Contexte factice : on renvoie juste une config par défaut et une fonction d'update qui fait un console.log.
  const dummyGameConfig = {
    numberOfPlayers: 4,
    players: [
      { name: 'Alice', birthDate: '1990-01-01' },
      { name: 'Bob', birthDate: '1991-02-02' },
      { name: 'Charlie', birthDate: '1992-03-03' },
      { name: 'David', birthDate: '1993-04-04' }
    ]
  };

  const updateGameConfig = (newConfig) => {
    console.log("dummy updateGameConfig called with:", newConfig);
  };

  return (
    <GameContext.Provider value={{ gameConfig: dummyGameConfig, updateGameConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
