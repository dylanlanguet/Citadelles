import { Player } from '../Player.js';
import { test, expect } from 'vitest';

test('Ajout et soustraction d’or', () => {
  const player = new Player('Joueur 1', '2000-01-01');
  player.addGold(2);
  expect(player.gold).toBe(2);

  player.removeGold(1);
  expect(player.gold).toBe(1);
});

test('removeGold échoue si or insuffisant', () => {
  const player = new Player('Joueur 2', '2000-01-01');
  player.addGold(1);
  const result = player.removeGold(2);
  expect(result).toBe(false);
  expect(player.gold).toBe(1);
});

test('drawCard ajoute une carte à la main si le deck n’est pas vide', () => {
  const player = new Player('Joueur 3', '2000-01-01');
  // Création d'un deck factice avec une méthode draw qui retourne une carte
  const deck = {
    cards: [{ id: 1, title: 'Carte A', content: 'Contenu A' }],
    draw() {
      return this.cards.shift() || null;
    }
  };
  player.drawCard(deck);
  expect(player.hand).toHaveLength(1);
  expect(player.hand[0].title).toBe('Carte A');
});

test('drawCard ne modifie pas la main si le deck est vide', () => {
  const player = new Player('Joueur 4', '2000-01-01');
  const deck = {
    cards: [],
    draw() {
      return this.cards.shift() || null;
    }
  };
  player.drawCard(deck);
  expect(player.hand).toHaveLength(0);
});

test('drawCardsWithChoice garde les cartes et retourne le reste', () => {
  const player = new Player('Joueur 5', '2000-01-01');
  // On simule un deck avec 4 cartes
  let deckCards = [
    { id: 1, title: 'Carte 1', content: 'Contenu 1' },
    { id: 2, title: 'Carte 2', content: 'Contenu 2' },
    { id: 3, title: 'Carte 3', content: 'Contenu 3' },
    { id: 4, title: 'Carte 4', content: 'Contenu 4' },
  ];
  // Tableau pour capturer les cartes retournées
  const addedCards = [];
  const deck = {
    draw() {
      return deckCards.shift() || null;
    },
    addCard(card, toTop) {
      // On stocke la carte ajoutée pour vérifier que le comportement est correct.
      addedCards.push(card);
    }
  };

  // Simuler : piocher 3 cartes, garder les 2 premières et retourner la 3ème
  player.drawCardsWithChoice(deck, 3, 2);

  // Vérifier que la main contient les 2 premières cartes
  expect(player.hand).toHaveLength(2);
  expect(player.hand.map(card => card.title)).toEqual(['Carte 1', 'Carte 2']);

  // Vérifier que la 3ème carte a été retournée dans le deck
  expect(addedCards).toHaveLength(1);
  expect(addedCards[0].title).toBe('Carte 3');
});

test('playCard déplace une carte de la main à la cité', () => {
  const player = new Player('Joueur 6', '2000-01-01');
  const card = { id: 10, title: 'Carte Test', content: 'Contenu Test' };
  player.hand.push(card);
  
  player.playCard(10);
  
  expect(player.hand).toHaveLength(0);
  expect(player.city).toHaveLength(1);
  expect(player.city[0].id).toBe(10);
});

test('playCard ne fait rien si la carte n’existe pas dans la main', () => {
  const player = new Player('Joueur 7', '2000-01-01');
  // Sans carte dans la main, l’appel ne doit pas modifier l’état.
  player.playCard(99);
  expect(player.hand).toHaveLength(0);
  expect(player.city).toHaveLength(0);
});

test('retrieveCardFromCity déplace une carte de la cité à la main', () => {
  const player = new Player('Joueur 8', '2000-01-01');
  const card = { id: 20, title: 'Carte de la cité', content: 'Contenu cité' };
  player.city.push(card);
  
  player.retrieveCardFromCity(20);
  
  expect(player.city).toHaveLength(0);
  expect(player.hand).toHaveLength(1);
  expect(player.hand[0].id).toBe(20);
});

test('retrieveCardFromCity ne fait rien si la carte n’existe pas dans la cité', () => {
  const player = new Player('Joueur 9', '2000-01-01');
  // Sans carte dans la cité, l’appel ne doit rien changer.
  player.retrieveCardFromCity(100);
  expect(player.city).toHaveLength(0);
  expect(player.hand).toHaveLength(0);
});
