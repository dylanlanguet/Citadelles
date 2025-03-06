// lib/initDb.js
import { openDb } from './db.js';


async function initDb() {
  const db = await openDb();

  // Création de la table pour les BuildingCards
  await db.exec(`
    CREATE TABLE IF NOT EXISTS BuildingCards (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL,
      cost INTEGER NOT NULL,
      utility TEXT,
      quantity INTEGER NOT NULL
    );
  `);

  // Création de la table pour les CharacterCards
  await db.exec(`
    CREATE TABLE IF NOT EXISTS CharacterCards (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL,
      power TEXT NOT NULL
    );
  `);

  // Insertion de quelques exemples de BuildingCards si la table est vide
  const buildingCardsCount = await db.get(`SELECT COUNT(*) as count FROM BuildingCards;`);
  if (buildingCardsCount.count === 0) {
    const insertStmt = `
      INSERT INTO BuildingCards (id, title, content, type, cost, utility, quantity) 
      VALUES

    (101, 'Palais', 'Un grand édifice luxueux appartenant à la noblesse.', 'Noble', 5, NULL, 3),
    (102, 'Château', 'Une imposante forteresse habitable pour les seigneurs.', 'Noble', 4, NULL, 4),
    (103, 'Manoir', 'Un somptueux domaine réservé aux familles aisées.', 'Noble', 3, NULL, 5),

    (104, 'Cathédrale', 'Un majestueux lieu de culte dédié aux divinités.', 'Religieux', 5, NULL, 2),
    (105, 'Temple', 'Un sanctuaire dédié aux cultes et prières.', 'Religieux', 1, NULL, 3),
    (106, 'Monastère', 'Un refuge spirituel éloigné du tumulte des villes.', 'Religieux', 3, NULL, 3),
    (107, 'Église', 'Un lieu de prière fréquenté par les croyants.', 'Religieux', 2, NULL, 3),

    (108, 'Port', 'Un lieu d''échange animé où accostent les navires marchands.', 'Commerçant', 4, NULL, 3),
    (109, 'Hôtel de Ville', 'Le centre administratif de la cité.', 'Commerçant', 5, NULL, 2),
    (110, 'Marché', 'Un vaste espace où commerçants et artisans vendent leurs produits.', 'Commerçant', 2, NULL, 4),
    (111, 'Comptoir', 'Un lieu d''échange prospère pour les négociants.', 'Commerçant', 3, NULL, 3),
    (112, 'Taverne', 'Un endroit convivial où l''on boit et discute affaires.', 'Commerçant', 1, NULL, 5),
    (113, 'Échoppe', 'Un petit magasin vendant divers articles.', 'Commerçant', 2, NULL, 3),

    (114, 'Forteresse', 'Une structure défensive imprenable en haut d''une colline.', 'Militaire', 5, NULL, 2),
    (115, 'Caserne', 'Un bâtiment où s''entraînent et vivent les soldats.', 'Militaire', 3, NULL, 3),
    (116, 'Tour de Guet', 'Une haute structure permettant d''anticiper les attaques.', 'Militaire', 1, NULL, 3),
    (117, 'Prison', 'Un lieu où sont enfermés les criminels de la cité.', 'Militaire', 2, NULL, 3),

    (118, 'Bibliothèque', 'Un lieu rempli de manuscrits et de connaissances anciennes.', 'Merveille', 6, 'Si vous choisissez de piocher des cartes au début de votre tour, conservez-les toutes.', 1),
    (119, 'Université', 'Un établissement où les esprits les plus brillants étudient.', 'Merveille', 6, 'Coûte 6 pièces d''or à bâtir mais vaut 8 points pour le calcul du score.', 1),
    (120, 'École de Magie', 'Un mystérieux bâtiment où sont enseignés les arts occultes.', 'Merveille', 6, 'Pour la perception des revenus, l''École de Magie est considérée comme un quartier de la couleur de votre choix. Elle vous rapporte donc si vous êtes Roi, Évêque, Marchand ou Condottière.', 1),
    (121, 'Dracoport', 'Un immense port dominé par un dragon.', 'Merveille', 6, 'Coûte 6 pièces d''or à bâtir mais vaut 8 points pour le calcul du score.', 1),
    (122, 'Donjon', 'Une ancienne tour imprenable aux murs épais.', 'Merveille', 3, 'Le Donjon ne peut pas être détruit par le Condottière.', 1),
    (123, 'Cour des Miracles', 'Un quartier légendaire où les règles changent.', 'Merveille', 2, 'Pour le calcul du score, la Cour des Miracles est considérée comme un quartier de la couleur de votre choix.', 1),
    (124, 'Cimetière', 'Un lieu silencieux où reposent les âmes disparues.', 'Merveille', 5, 'Lorsque le Condottière détruit un quartier, vous pouvez payer 1 pièce d''or pour le prendre dans votre main. Vous ne pouvez pas le faire si vous êtes vous-même Condottière.', 1),
    (125, 'Grande Muraille', 'Une imposante muraille défensive.', 'Merveille', 6, 'Le prix à payer par le Condottière pour détruire vos autres quartiers est augmenté de 1.', 1),
    (126, 'Forge', 'Un atelier où l''on façonne armes et objets.', 'Merveille', 5, 'Une fois par tour, vous pouvez payer 2 pièces d''or pour piocher 3 cartes.', 1),
    (127, 'Salle des Cartes', 'Une salle remplie de plans et cartes.', 'Merveille', 5, 'À la fin de la partie, marquez 1 point supplémentaire pour chaque carte dans votre main.', 1),
    (128, 'Observatoire', 'Un lieu d''étude du ciel et des astres.', 'Merveille', 4, 'Si vous choisissez de piocher des cartes au début de votre tour, piochez-en 3 au lieu de 2. Choisissez-en une et défaussez les 2 autres.', 1),
    (129, 'Laboratoire', 'Un atelier d''alchimistes expérimentant sans relâche.', 'Merveille', 5, 'Une fois par tour, vous pouvez défausser 1 carte et recevoir 2 pièces d''or.', 1),
    (130, 'Trésor Impérial', 'Un lieu secret où sont stockées les richesses du royaume.', 'Merveille', 5, 'À la fin de la partie, marquez 1 point supplémentaire pour chaque pièce d''or dans votre trésor.', 1);

    `;
    await db.exec(insertStmt);
  }

  // Pareil pour les CharacterCards
  const characterCardsCount = await db.get(`SELECT COUNT(*) as count FROM CharacterCards;`);
  if (characterCardsCount.count === 0) {
    const insertStmt = `
      INSERT INTO CharacterCards (id, title, content, type, power)
      VALUES
        (1, 'Assassin', 'Élimine un joueur', 'Neutre', 'Élimination'),
        (2, 'Voleur', 'Voler de l''or', 'Neutre', 'Vol'),
        (3, 'Magicien', 'Échanger sa main', 'Neutre', 'Échange'),
        (4, 'Roi', 'Recevoir des bonus', 'Noble', 'Leadership'),
        (5, 'Évêque', 'Protection contre le Condottière', 'Religieux', 'Protection'),
        (6, 'Marchand', 'Recevoir de l''or', 'Commerçant', 'Commerce'),
        (7, 'Architecte', 'Tirer des cartes supplémentaires', 'Neutre', 'Créativité'),
        (8, 'Condottière', 'Détruire un quartier adverse', 'Militaire', 'Destruction');
    `;
    await db.exec(insertStmt);
  }

  console.log("Base de données initialisée");
}

initDb();
