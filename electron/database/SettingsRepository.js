import db from './Database.js';

class SettingsRepository {
  set(key, value) {
    const sql = 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)';
    return db.run(sql, [key, typeof value === 'string' ? value : JSON.stringify(value)]);
  }

  get(key, defaultValue = null) {
    const sql = 'SELECT value FROM settings WHERE key = ?';
    const result = db.get(sql, [key]);
    if (!result) return defaultValue;
    try {
      return JSON.parse(result.value);
    } catch {
      return result.value;
    }
  }

  getAll() {
    const sql = 'SELECT * FROM settings';
    return db.all(sql);
  }

  delete(key) {
    const sql = 'DELETE FROM settings WHERE key = ?';
    return db.run(sql, [key]);
  }
}

export default new SettingsRepository();