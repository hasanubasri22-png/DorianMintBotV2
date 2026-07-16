import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';
import fs from 'node:fs';

class DatabaseService {
  constructor() {
    this.db = null;
    this.dbPath = null;
  }

  initialize() {
    try {
      const userData = app.getPath('userData');
      this.dbPath = path.join(userData, 'dorian-mint-bot.db');

      // Ensure directory exists
      if (!fs.existsSync(userData)) {
        fs.mkdirSync(userData, { recursive: true });
      }

      this.db = new Database(this.dbPath);
      this.db.pragma('journal_mode = WAL');
      this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  createTables() {
    // Wallets table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT UNIQUE NOT NULL,
        publicKey TEXT,
        encryptedPrivateKey TEXT NOT NULL,
        label TEXT,
        derivationPath TEXT,
        index INTEGER,
        balance TEXT DEFAULT '0',
        nonce INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Mnemonic table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS mnemonics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        encryptedMnemonic TEXT NOT NULL,
        hashedPassword TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // RPC Endpoints table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS rpc_endpoints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chainId INTEGER NOT NULL,
        name TEXT NOT NULL,
        url TEXT UNIQUE NOT NULL,
        isActive INTEGER DEFAULT 1,
        priority INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Transactions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transactionHash TEXT UNIQUE,
        fromAddress TEXT NOT NULL,
        toAddress TEXT NOT NULL,
        value TEXT NOT NULL,
        gasPrice TEXT,
        gasLimit TEXT,
        nonce INTEGER,
        status TEXT DEFAULT 'pending',
        chainId INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        sentAt DATETIME,
        confirmedAt DATETIME
      )
    `);

    // Activity Log table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        status TEXT DEFAULT 'info',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  run(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.run(...params);
    } catch (error) {
      console.error('Database run error:', error);
      throw error;
    }
  }

  get(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.get(...params);
    } catch (error) {
      console.error('Database get error:', error);
      throw error;
    }
  }

  all(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.all(...params);
    } catch (error) {
      console.error('Database all error:', error);
      throw error;
    }
  }

  close() {
    try {
      if (this.db) {
        this.db.close();
        console.log('Database closed');
      }
    } catch (error) {
      console.error('Error closing database:', error);
    }
  }
}

export default new DatabaseService();