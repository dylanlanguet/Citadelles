export class Player {
    constructor(name, birthDate, isOldest = false) {
      this.name = name;
      this.birthDate = birthDate;
      this.isOldest = isOldest;
      this.gold = 0;      // On remplace "resources" par "gold"
      this.hand = [];     // Cartes en main
      this.city = [];     // Quartiers construits dans la cité
      this.resourceActionTaken = false;
    }
  
    // Ajouter de l'or
    addGold(amount) {
      this.gold += amount;
      console.log(`${this.name} a maintenant ${this.gold} pièces d'or.`);
    }
  
    // Déduire de l'or
    removeGold(amount) {
      if (this.gold >= amount) {
        this.gold -= amount;
        console.log(`${this.name} a dépensé ${amount} pièces d'or. Il lui reste ${this.gold} pièces d'or.`);
        return true;
      } else {
        console.log(`${this.name} n'a pas assez de pièces d'or.`);
        return false;
      }
    }
  
    // Pioche simple : une carte va directement dans la main
    drawCard(deck) {
      const drawnCard = deck.draw();
      if (drawnCard) {
        this.hand.push(drawnCard);
        console.log(`${this.name} a pioché la carte "${drawnCard.title}" et elle va directement dans sa main.`);
      } else {
        console.log(`Le deck est vide, ${this.name} ne peut pas piocher.`);
      }
    }
  
    // Pioche multiple avec choix :
    // Le joueur pioche x cartes, garde les y premières (par exemple) et retourne le reste en bas du deck.
    // En réalité, cette sélection devrait être interactive, mais ici on simule en gardant les y premières cartes.
    drawCardsWithChoice(deck, x, y) {
      let drawnCards = [];
      for (let i = 0; i < x; i++) {
        const card = deck.draw();
        if (card) {
          drawnCards.push(card);
        }
      }
      if (drawnCards.length === 0) {
        console.log(`${this.name} n'a pas pioché de cartes car le deck est vide.`);
        return;
      }
      
      // Simulation : garder les y premières cartes et retourner le reste
      const cardsToKeep = drawnCards.slice(0, y);
      const cardsToReturn = drawnCards.slice(y);
      
      this.hand.push(...cardsToKeep);
      console.log(`${this.name} a choisi de garder ${cardsToKeep.length} cartes : ${cardsToKeep.map(c => c.title).join(", ")}`);
      
      // Retourner les cartes restantes en bas du deck
      cardsToReturn.forEach(card => {
        deck.addCard(card, false); // false pour ajouter en bas du deck
        console.log(`La carte "${card.title}" est retournée en bas du deck.`);
      });
    }
  
    // Joue une carte depuis la main pour la mettre dans la cité
    playCard(cardId) {
      const index = this.hand.findIndex(card => card.id === cardId);
      if (index !== -1) {
        const [card] = this.hand.splice(index, 1);
        this.city.push(card);
        console.log(`${this.name} a joué la carte "${card.title}" dans sa cité.`);
      } else {
        console.log(`La carte avec l'ID ${cardId} n'est pas dans la main de ${this.name}.`);
      }
    }
  
    // Récupère une carte depuis la cité vers la main
    retrieveCardFromCity(cardId) {
      const index = this.city.findIndex(card => card.id === cardId);
      if (index !== -1) {
        const [card] = this.city.splice(index, 1);
        this.hand.push(card);
        console.log(`${this.name} a récupéré la carte "${card.title}" depuis sa cité.`);
      } else {
        console.log(`La carte avec l'ID ${cardId} n'est pas dans la cité de ${this.name}.`);
      }
    }
  }
   