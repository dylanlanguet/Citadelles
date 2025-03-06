// app/api/decks/route.js
import { openDb } from '../../../lib/db';

export async function GET(request) {
  const db = await openDb();
  
  // Récupérer toutes les BuildingCards (districts)
  const districtDeck = await db.all("SELECT * FROM BuildingCards;");
  console.log(districtDeck)
  // Récupérer toutes les CharacterCards
  const characterDeck = await db.all("SELECT * FROM CharacterCards;");
  
  return new Response(JSON.stringify({ districtDeck, characterDeck }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
