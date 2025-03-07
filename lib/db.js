// lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function openDb() {
  // Utilisation de /tmp pour stocker la base de données SQLite sur Vercel
  const dbPath = path.join('/tmp', 'database.db'); // Assurez-vous d'utiliser '/tmp'
  
  try {
    const db = await open({
      filename: dbPath,  // Chemin vers le fichier dans /tmp
      driver: sqlite3.Database
    });
    return db;
  } catch (error) {
    console.error("Erreur lors de l'ouverture de la base de données:", error);
    throw error;
  }
}