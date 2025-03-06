// app/api/characterCards/route.js
import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db'; // Supposons que vous ayez une fonction openDb pour ouvrir la DB

export async function GET() {
  const db = await openDb(); // Fonction qui ouvre la DB
  const characterCards = await db.all(`SELECT id, title, content, type, power FROM CharacterCards;`);
  return NextResponse.json(characterCards);
}
