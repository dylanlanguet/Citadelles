import { GameEngine } from '../GameEngine.js';
import { Player } from '../Player.js';
import { test, expect } from 'vitest';

test('Passage au tour suivant', () => {
  const players = [new Player('Alice'), new Player('Bob')];
  const engine = new GameEngine(players);

  engine.nextTurn();
  expect(engine.getCurrentPlayer().name).toBe('Bob');

  engine.nextTurn();
  expect(engine.getCurrentPlayer().name).toBe('Alice'); // Retour au premier joueur
});
