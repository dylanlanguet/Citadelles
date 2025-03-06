'use strict';

export class Player {
  constructor(name, isOldest = false) {
    this.name = name;
    
    this.isOldest = isOldest; // Indique si ce joueur est le plus âgé (et donc qui commence)
    this.resources = 0;
    this.hand = [];
    this.city = [];
  }

  addResources(amount) {
    this.resources += amount;
    console.log(`${this.name} a maintenant ${this.resources} pièces.`);
  }

  removeResources(amount) {
    if (this.resources >= amount) {
      this.resources -= amount;
      console.log(`${this.name} a dépensé ${amount} pièces. Il lui reste ${this.resources} pièces.`);
      return true;
    } else {
      console.log(`${this.name} n'a pas assez de pièces pour dépenser ${amount}.`);
      return false;
    }
  }

  addCardToHand(card) {
    this.hand.push(card);
    console.log(`La carte ${card.title} a été ajoutée à la main de ${this.name}.`);
  }

  playCard(cardId) {
    const cardIndex = this.hand.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
      console.log(`La carte avec l'ID ${cardId} n'est pas dans la main de ${this.name}.`);
      return;
    }
    const card = this.hand.splice(cardIndex, 1)[0];
    this.city.push(card);
    console.log(`${this.name} a construit le quartier ${card.title}.`);
  }
}
