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
      cost INTEGER NOT NULL
    );
  `);

  // Création de la table pour les CharacterCards
  await db.exec(`
    CREATE TABLE IF NOT EXISTS CharacterCards (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      power TEXT NOT NULL,
      rank INTEGER NOT NULL
    );
  `);

  // Insertion de quelques exemples de BuildingCards si la table est vide
  const buildingCardsCount = await db.get(`SELECT COUNT(*) as count FROM BuildingCards;`);
  if (buildingCardsCount.count === 0) {
    const insertStmt = `
      INSERT INTO BuildingCards (id, title, content, cost)
      VALUES
        (101, 'Manoir', 'Un beau manoir', 3),
        (102, 'Château', 'Un château imposant', 5),
        (103, 'Temple', 'Un temple sacré', 1),
        (104, 'Bastion', 'Un bastion fortifié', 4),
        (105, 'Tour', 'Une tour imposante', 5),
        (106, 'Hôtel de Ville', 'Centre administratif', 6);
    `;
    await db.exec(insertStmt);
  }

  // Pareil pour les CharacterCards
  const characterCardsCount = await db.get(`SELECT COUNT(*) as count FROM CharacterCards;`);
  if (characterCardsCount.count === 0) {
    const insertStmt = `
      INSERT INTO CharacterCards (id, title, content, power, rank)
      VALUES
        (1, 'Assassin', 'Elimine un joueur', 'Elimination', 1),
        (2, 'Voleur', 'Voler de l''or', 'Vol', 2),
        (3, 'Magicien', 'Échanger sa main', 'Échange', 3),
        (4, 'Roi', 'Recevoir des bonus', 'Leadership', 4),
        (5, 'Évêque', 'Protection contre le Warlord', 'Protection', 5),
        (6, 'Marchand', 'Recevoir de l''or', 'Commerce', 6),
        (7, 'Architecte', 'Tirer des cartes supplémentaires', 'Créativité', 7),
        (8, 'Condottière', 'Détruire un quartier adverse', 'Destruction', 8);
    `;
    await db.exec(insertStmt);
  }

  console.log("Base de données initialisée");
}

initDb();
