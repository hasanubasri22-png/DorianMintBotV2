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
    
    // Check if mnemonic already exists
    const existing = this.get();
    console.log('Existing mnemonic:', existing ? 'YES - will UPDATE' : 'NO - will INSERT');
    
    if (existing) {
      // Update existing mnemonic
      return this.update(existing.id, data);
    }
    
    const sql = `
      INSERT INTO mnemonics (encryptedMnemonic, hashedPassword)
      VALUES (?, ?)
    `;
    
    const params = [data.encryptedMnemonic, data.hashedPassword];
    console.log('MnemonicRepository.create() about to call db.run with params:', params.map((p, i) => `[${i}]: ${typeof p} = ${p ? p.toString().substring(0, 50) : 'NULL'}`));
    
    const result = db.run(sql, params);
    console.log('MnemonicRepository.create() db.run result:', result);
    
    if (result.changes === 0) {
      throw new Error('Failed to insert mnemonic: no rows affected');
    }
    
    return result;
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
    console.log('MnemonicRepository.update() called with id:', id);
    
    if (!data || !data.encryptedMnemonic || !data.hashedPassword) {
      throw new Error('Invalid mnemonic data: encryptedMnemonic and hashedPassword are required');
    }
    
    const sql = `
      UPDATE mnemonics 
      SET encryptedMnemonic = ?, hashedPassword = ?
      WHERE id = ?
    `;
    
    const result = db.run(sql, [data.encryptedMnemonic, data.hashedPassword, id]);
    console.log('MnemonicRepository.update() result:', result);
    
    if (result.changes === 0) {
      throw new Error('Failed to update mnemonic: no rows affected');
    }
    
    return result;
  }
}

export default new MnemonicRepository();