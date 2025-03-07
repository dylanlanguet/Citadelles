// lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function openDb() {
  // Utiliser /tmp pour stocker le fichier SQLite sur Vercel
  const dbPath = path.join('/tmp', 'database.db'); // Chemin du fichier SQLite dans /tmp
  return open({
    filename: dbPath, // Utilisation de /tmp pour stocker la DB
    driver: sqlite3.Database
  });
}