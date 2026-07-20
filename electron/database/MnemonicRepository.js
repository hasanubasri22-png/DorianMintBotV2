import db from './Database.js';

class MnemonicRepository {
  create(data) {
    if (!data || !data.encryptedMnemonic || !data.hashedPassword) {
      throw new Error('Invalid mnemonic data: encryptedMnemonic and hashedPassword are required');
    }
    const sql = `
      INSERT INTO mnemonics (encryptedMnemonic, hashedPassword)
      VALUES (?, ?)
    `;
    return db.run(sql, [data.encryptedMnemonic, data.hashedPassword]);
  }

  get() {
    const sql = 'SELECT * FROM mnemonics LIMIT 1';
    return db.get(sql);
  }

  delete(id) {
    const sql = 'DELETE FROM mnemonics WHERE id = ?';
    return db.run(sql, [id]);
  }

  update(id, data) {
    if (!data || !data.encryptedMnemonic || !data.hashedPassword) {
      throw new Error('Invalid mnemonic data: encryptedMnemonic and hashedPassword are required');
    }
    const sql = `
      UPDATE mnemonics 
      SET encryptedMnemonic = ?, hashedPassword = ?
      WHERE id = ?
    `;
    return db.run(sql, [data.encryptedMnemonic, data.hashedPassword, id]);
  }
}

export default new MnemonicRepository();