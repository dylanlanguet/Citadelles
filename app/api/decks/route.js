// app/api/decks/route.js
import { openDb } from '../../../lib/db';

/**
 * Renvoie le deck de cartes de district et de personnages en format JSON.
 * @param {import('next/api').NextApiRequest} request
 * @returns {Promise<import('next/api').NextApiResponse>}
 */
export async function GET() {
  const db = await openDb();
  
  // Récupérer toutes les BuildingCards (districts)
  const districtDeck = await db.all("SELECT * FROM BuildingCards;");
  // Récupérer toutes les CharacterCards
  const characterDeck = await db.all("SELECT * FROM CharacterCards;");
  
  return new Response(JSON.stringify({ districtDeck, characterDeck }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
