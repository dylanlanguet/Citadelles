export class GameEngine {
  constructor(players) {
    this.players = players; // tableau d'instances de Player
    this.currentTurn = 1;   // Numéro du tour courant
    this.currentPlayerIndex = 0; // Index du joueur dont c'est le tour
    this.phase = 'characterSelection'; // Phase initiale : sélection de personnages
  }

  nextTurn() {
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      if (this.currentPlayerIndex === 0) {
        this.currentTurn++;
      }
    } while (this.players[this.currentPlayerIndex].eliminated);
  }

  allPlayersHaveSelected() {
    return this.players.every(player => player.selectedCharacter);
  }

  // Ici, on trie les joueurs par l'ID de leur personnage sélectionné avant de passer à l'action
  endSelectionPhase() {
    if (this.allPlayersHaveSelected()) {
      this.players.sort((a, b) => a.selectedCharacter.id - b.selectedCharacter.id);
      this.phase = 'action';
      this.currentPlayerIndex = 0;
    }
  }

  endActionPhase() {
    this.players.forEach(player => {
      delete player.selectedCharacter;
      player.eliminated = false;
    });
    this.phase = 'characterSelection';
    this.currentPlayerIndex = 0;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
