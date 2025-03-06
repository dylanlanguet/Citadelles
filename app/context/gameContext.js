// app/context/gameContext.js
'use client';

import { createContext, useContext } from 'react';
import HomePageConfig from '../page';

const players = HomePageConfig.players;

console.log("players:", players);


const GameContext = createContext({
  gameConfig: defaultGameConfig,
  updateGameConfig: () => { },
});

export const GameProvider = ({ children }) => {
  
  const updateGameConfig = (newConfig) => {
    console.log("dummy updateGameConfig called with:", newConfig);
  };
  
  const defaultGameConfig = {
    numberOfPlayers: 4,
    players: [
      { id: 1, name: 'Alice', role: 'Roi', gold: 5, points: 10 },
      { id: 2, name: 'Bob', role: 'Marchand', gold: 7, points: 12 },
      { id: 3, name: 'Charlie', role: 'Condottière', gold: 3, points: 9 },
      { id: 4, name: 'David', role: 'Évêque', gold: 6, points: 15 },
    ],
  };
  
  return (
    <GameContext.Provider value={{ gameConfig: GameContext, updateGameConfig }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
