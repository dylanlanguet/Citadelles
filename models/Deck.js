export class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  // Mélange le deck avec Fisher-Yates
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Pioche une carte du deck
  draw() {
    return this.cards.length > 0 ? this.cards.pop() : null;
  }

  // 📌 Initialisation du deck avec gestion de `quantity`
  static async initializeDeck() {
    try {
      console.log("📡 Appel de l'API pour récupérer les cartes...");
      const response = await fetch('/api/decks');
      if (!response.ok) throw new Error('🚨 Erreur lors de la récupération des cartes');

      const { districtDeck } = await response.json(); // Récupère les cartes Quartier

      // 🔹 DUPLIQUE les cartes en fonction de `quantity`
      let expandedDeck = [];
      districtDeck.forEach(card => {
        for (let i = 0; i < card.quantity; i++) {
          expandedDeck.push({ ...card }); // Copie la carte
        }
      });

      console.log("✅ Cartes après duplication :", expandedDeck.length);

      const deck = new Deck(expandedDeck); // Crée le deck avec les cartes dupliquées
      deck.shuffle(); // Mélange le deck

      console.log("✅ Deck mélangé avec", deck.cards.length, "cartes.");
      return deck;
    } catch (error) {
      console.error("❌ Erreur d'initialisation du deck:", error);
      return null;
    }
  }
}
