// models/BuildingCard.js
import { Card } from './card';

export  class BuildingCard extends Card {
  constructor(id, title, content, cost) {
    super(id, title, content);
    this.cost = cost; // Coût de construction par exemple
  }

  play() {
    // Logique spécifique pour construire un bâtiment
    console.log(`Construction du bâtiment "${this.title}" pour un coût de ${this.cost} pièces.`);
  }
}
