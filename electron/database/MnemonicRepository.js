import db from './Database.js';

class MnemonicRepository {
  create(data) {
    console.log('MnemonicRepository.create() called with data:', data);
    
    if (!data) {
      throw new Error('Invalid mnemonic data: data is null/undefined');
    }
    
    console.log('data.encryptedMnemonic:', data.encryptedMnemonic ? `[${typeof data.encryptedMnemonic}] length=${data.encryptedMnemonic.length}` : 'UNDEFINED');
    console.log('data.hashedPassword:', data.hashedPassword ? `[${typeof data.hashedPassword}] length=${data.hashedPassword.length}` : 'UNDEFINED');
    
    if (!data.encryptedMnemonic || !data.hashedPassword) {
      throw new Error(`Invalid mnemonic data: encryptedMnemonic=${!!data.encryptedMnemonic}, hashedPassword=${!!data.hashedPassword}`);
    }
    
    const sql = `
      INSERT INTO mnemonics (encryptedMnemonic, hashedPassword)
      VALUES (?, ?)
    `;
    
    const params = [data.encryptedMnemonic, data.hashedPassword];
    console.log('MnemonicRepository.create() about to call db.run with params:', params.map((p, i) => `[${i}]: ${typeof p} = ${p ? p.toString().substring(0, 50) : 'NULL'}`));
    
    return db.run(sql, params);
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