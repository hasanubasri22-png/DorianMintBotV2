import db from './Database.js';

class WalletRepository {
  create(wallet) {
    const sql = `
      INSERT INTO wallets (address, publicKey, encryptedPrivateKey, label, derivationPath, index_num, balance, nonce)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return db.run(sql, [
      wallet.address,
      wallet.publicKey,
      wallet.encryptedPrivateKey,
      wallet.label || null,
      wallet.derivationPath,
      wallet.index,
      wallet.balance || '0',
      wallet.nonce || 0
    ]);
  }

  getByAddress(address) {
    const sql = 'SELECT * FROM wallets WHERE address = ?';
    return db.get(sql, [address]);
  }

  getAll() {
    const sql = 'SELECT * FROM wallets ORDER BY index_num ASC';
    return db.all(sql);
  }

  getById(id) {
    const sql = 'SELECT * FROM wallets WHERE id = ?';
    return db.get(sql, [id]);
  }

  update(id, wallet) {
    const sql = `
      UPDATE wallets 
      SET address = ?, publicKey = ?, encryptedPrivateKey = ?, label = ?, derivationPath = ?, index_num = ?, balance = ?, nonce = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    return db.run(sql, [
      wallet.address,
      wallet.publicKey,
      wallet.encryptedPrivateKey,
      wallet.label,
      wallet.derivationPath,
      wallet.index,
      wallet.balance,
      wallet.nonce,
      id
    ]);
  }

  delete(id) {
    const sql = 'DELETE FROM wallets WHERE id = ?';
    return db.run(sql, [id]);
  }

  updateBalance(address, balance) {
    const sql = 'UPDATE wallets SET balance = ?, updatedAt = CURRENT_TIMESTAMP WHERE address = ?';
    return db.run(sql, [balance, address]);
  }

  updateNonce(address, nonce) {
    const sql = 'UPDATE wallets SET nonce = ?, updatedAt = CURRENT_TIMESTAMP WHERE address = ?';
    return db.run(sql, [nonce, address]);
  }

  getCount() {
    const sql = 'SELECT COUNT(*) as count FROM wallets';
    return db.get(sql).count;
  }
}

export default new WalletRepository();
