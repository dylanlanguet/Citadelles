// models/Card.js
export class Card {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
  
  // Méthode générique à redéfinir dans les sous-classes
  play() {
    throw new Error('La méthode play() doit être redéfinie dans une sous-classe');
  }
}
