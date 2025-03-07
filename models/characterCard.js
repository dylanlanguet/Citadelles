import { Card } from './card';

export class CharacterCard extends Card {
  constructor(id, title, content, type, power) {
    super(id, title, content, type);
    this.power = power;
  }

  // Méthode pour activer le pouvoir de la carte
  // Pour le Voleur, on passe targetCharacterId pour identifier la cible
  activatePower(game, player, targetCharacterId) {
    switch (this.power) {
      case 'Élimination':
        console.log(`${this.title} active son pouvoir : élimination d'un joueur.`);
        // Logique d'élimination (déjà implémentée pour l'assassin)
        const affectedPlayers = game.players.filter(p =>
          p.selectedCharacter && p.selectedCharacter.id === targetCharacterId
        );
        if (affectedPlayers.length === 0) {
          console.log("Aucun joueur n'a sélectionné ce personnage.");
        } else {
          affectedPlayers.forEach(p => {
            p.eliminated = true;
            console.log(`${p.name} est éliminé par l'assassin.`);
          });
        }
        break;

      case 'Vol':
        console.log(`${this.title} active son pouvoir : voler de l'or.`);
        // Trouver le ou les joueurs dont le personnage sélectionné correspond à la cible
        const targets = game.players.filter(p =>
          p.selectedCharacter && p.selectedCharacter.id === targetCharacterId
        );
        if (targets.length === 0) {
          console.log("Aucun joueur n'a sélectionné ce personnage.");
        } else {
          targets.forEach(target => {
            const stolenGold = target.gold;
            target.gold = 0; // Le joueur ciblé perd tout son or
            player.gold += stolenGold; // Le voleur gagne l'or volé
            console.log(`${player.name} vole ${stolenGold} pièces d'or à ${target.name}.`);
          });
        }
        break;

        case 'Échange': {
          // Pour le Magicien
          const choice = prompt(
            "Tapez 'E' pour échanger votre main avec un autre joueur, ou 'D' pour défausser votre main et piocher le même nombre de cartes."
          );
          if (!choice) {
            console.log("Aucun choix effectué.");
            return;
          }
          if (choice.toUpperCase() === 'E') {
            const targetPlayerId = prompt("Entrez l'ID du joueur avec lequel vous souhaitez échanger votre main:");
            const targetPlayer = game.players.find(p => p.id === parseInt(targetPlayerId));
            if (!targetPlayer) {
              console.log("Joueur cible non trouvé.");
              return;
            }
            // Échanger les mains
            const tempHand = player.hand;
            player.hand = targetPlayer.hand;
            targetPlayer.hand = tempHand;
            console.log(`${player.name} a échangé sa main avec ${targetPlayer.name}.`);
          } else if (choice.toUpperCase() === 'D') {
            const numberToDraw = player.hand.length;
            // Défausser la main (on vide le tableau)
            player.hand = [];
            // Ici, vous devriez appeler la méthode de pioche du joueur pour obtenir le même nombre de cartes.
            // Par exemple, si le joueur a une méthode drawCards(n) qui utilise le deck, on pourrait l'appeler.
            // Pour l'instant, nous simulons avec un message.
            console.log(`${player.name} a défaussé sa main et pioche ${numberToDraw} cartes.`);
          } else {
            console.log("Choix non valide.");
          }
          break;
        }
  
        default:
        console.log(`${this.title} n'a pas de pouvoir défini.`);
    }
  }
}
