// lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './database.db', // le fichier de ta base SQLite
    driver: sqlite3.Database
  });
}
