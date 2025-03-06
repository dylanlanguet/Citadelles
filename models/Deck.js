export class Deck {
    constructor(cards = []) {
      this.cards = cards;
    }
  
    // Mélange le deck avec l'algorithme Fisher-Yates
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    // Pioche une carte (la retire du deck et la renvoie)
    draw() {
      if (this.cards.length === 0) {
        console.log('Le deck est vide.');
        return null;
      }
      return this.cards.pop();
    }
  
    // Ajoute une carte dans le deck
    // toTop : si true, ajoute en haut, sinon en bas
    addCard(card, toTop = false) {
      if (toTop) {
        this.cards.push(card);
      } else {
        this.cards.unshift(card);
      }
    }
  }
  