// models/CharacterCard.js
import { Card } from './card';

export class CharacterCard extends Card {
  constructor(id, title, content, type, power, rank) {
    super(id, title, content);
    this.type = type;
    this.power = power; // Pouvoir spécifique du personnage a passer a tant que classe ?
    this.rank = rank;
  }

  play() {
    // Logique spécifique pour utiliser le pouvoir du personnage
    console.log(`Activation du personnage "${this.title}" avec le pouvoir: ${this.power}.`);
  }
}
