import { Player } from '../Player.js';
import { test, expect } from 'vitest';


test('Ajout et soustraction d’or', () => {
  const player = new Player('Joueur 1');
  player.addGold(2);
  expect(player.gold).toBe(2);

  player.removeGold(1);
  expect(player.gold).toBe(1);
});
