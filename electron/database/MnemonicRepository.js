import db from './Database.js';

class MnemonicRepository {
  create(encryptedMnemonic, hashedPassword) {
    const sql = 'INSERT INTO mnemonics (encryptedMnemonic, hashedPassword) VALUES (?, ?)';
    return db.run(sql, [encryptedMnemonic, hashedPassword]);
  }

  get() {
    const sql = 'SELECT * FROM mnemonics LIMIT 1';
    return db.get(sql);
  }

  exists() {
    const sql = 'SELECT COUNT(*) as count FROM mnemonics';
    return db.get(sql).count > 0;
  }

  delete() {
    const sql = 'DELETE FROM mnemonics';
    return db.run(sql);
  }
}

export default new MnemonicRepository();