export class GameEngine {
  constructor(players) {
    this.players = players; // tableau d'instances de Player
    this.currentTurn = 1;   // Numéro du tour courant
    this.currentPlayerIndex = 0; // Index du joueur dont c'est le tour
    this.phase = 'characterSelection'; // Phase initiale : sélection de personnages
  }

  // Passe au joueur suivant
  nextTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    // Incrémente le tour si on revient au premier joueur
    if (this.currentPlayerIndex === 0) {
      this.currentTurn++;
    }
  }

  // Vérifie si tous les joueurs ont sélectionné leur personnage
  allPlayersHaveSelected() {
    return this.players.every(player => player.selectedCharacter);
  }

  // Passe de la phase de sélection à la phase d'action
  endSelectionPhase() {
    if (this.allPlayersHaveSelected()) {
      this.phase = 'action';
      // Optionnellement, remettre l'indice à 0 pour la phase d'action
      this.currentPlayerIndex = 0;
    }
  }

  // Retourne le joueur courant
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
