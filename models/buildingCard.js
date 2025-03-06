// models/BuildingCard.js
import { Card } from './card';

export  class BuildingCard extends Card {
  constructor(id, title, content, type, cost, utility, quantity) {
    super(id, title, content);
    this.type = type;
    this.cost = cost; 
    this.utility = utility;
    this.quantity = quantity;
  }

  play() {
    // Logique spécifique pour construire un bâtiment
    console.log(`Construction du bâtiment "${this.title}" pour un coût de ${this.cost} pièces.`);
  }
}
