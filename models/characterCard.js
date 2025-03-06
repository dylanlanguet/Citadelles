import { Card } from './card';

export class CharacterCard extends Card {
  constructor(id, title, content, type, power) {
    super(id, title, content, type);
    this.power = power;
  }

  // Méthode pour activer le pouvoir de la carte
  activatePower(game, player) {
    switch (this.power) {
      case 'Élimination':
        console.log(`${this.title} active son pouvoir : élimination d'un joueur.`);
        // Implémentez ici la logique d'élimination
        break;
      case 'Vol':
        console.log(`${this.title} active son pouvoir : voler de l'or.`);
        // Implémentez ici la logique de vol
        break;
      case 'Échange':
        console.log(`${this.title} active son pouvoir : échanger sa main avec un autre joueur.`);
        // Implémentez ici la logique d'échange
        break;
      // Ajoutez d'autres cas selon vos pouvoirs...
      default:
        console.log(`${this.title} n'a pas de pouvoir défini.`);
    }
  }
}
