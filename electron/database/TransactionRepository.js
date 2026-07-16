import db from './Database.js';

class TransactionRepository {
  create(transaction) {
    const sql = `
      INSERT INTO transactions (transactionHash, fromAddress, toAddress, value, gasPrice, gasLimit, nonce, status, chainId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return db.run(sql, [
      transaction.transactionHash || null,
      transaction.fromAddress,
      transaction.toAddress,
      transaction.value,
      transaction.gasPrice,
      transaction.gasLimit,
      transaction.nonce || null,
      transaction.status || 'pending',
      transaction.chainId
    ]);
  }

  getById(id) {
    const sql = 'SELECT * FROM transactions WHERE id = ?';
    return db.get(sql, [id]);
  }

  getAll() {
    const sql = 'SELECT * FROM transactions ORDER BY createdAt DESC';
    return db.all(sql);
  }

  getByStatus(status) {
    const sql = 'SELECT * FROM transactions WHERE status = ? ORDER BY createdAt DESC';
    return db.all(sql, [status]);
  }

  getByHash(hash) {
    const sql = 'SELECT * FROM transactions WHERE transactionHash = ?';
    return db.get(sql, [hash]);
  }

  update(id, transaction) {
    const sql = `
      UPDATE transactions 
      SET transactionHash = ?, status = ?, sentAt = ?, confirmedAt = ?
      WHERE id = ?
    `;
    return db.run(sql, [
      transaction.transactionHash,
      transaction.status,
      transaction.sentAt || null,
      transaction.confirmedAt || null,
      id
    ]);
  }

  delete(id) {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    return db.run(sql, [id]);
  }

  updateStatus(id, status) {
    const sql = 'UPDATE transactions SET status = ? WHERE id = ?';
    return db.run(sql, [status, id]);
  }
}

export default new TransactionRepository();