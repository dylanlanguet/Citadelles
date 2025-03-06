export class GameEngine {
  constructor(players) {
    this.players = players; // tableau d'instances de Player
    this.currentTurn = 1;   // Numéro du tour courant
    this.currentPlayerIndex = 0; // Index du joueur dont c'est le tour
  }

  // Passe au tour suivant : incrémente le numéro de tour et sélectionne le joueur suivant
  nextTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.currentTurn++;
  }

  // Retourne le joueur courant
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
