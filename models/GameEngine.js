export class GameEngine {
  constructor(players) {
    this.players = players; // Tableau d'instances de Player
    this.currentTurn = 1;   // Numéro du tour courant
    this.currentPlayerIndex = 0; // Index du joueur actif
    this.currentRoleAction = 1; // Index du joueur actif
    this.phase = 'characterSelection'; // Phase initiale
  }
  
  // Passe au tour suivant dans la phase d'action
  nextTurn() {
    this.currentRoleAction++;
  }
  
  // Permet de changer de phase : de la sélection de personnages à la phase d'action
  nextPhase() {
    if (this.phase === 'characterSelection') {
      // Ici, vous pouvez, par exemple, vérifier que chaque joueur a choisi un personnage
      // et éventuellement réorganiser l'ordre de passage selon un critère (par ex. par ordre de valeur du personnage)
      this.phase = 'action';
      this.currentTurn = 1;
      this.currentPlayerIndex = 0; // ou un nouvel ordre basé sur la sélection
    }
  }

  // Retourne le joueur courant
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
