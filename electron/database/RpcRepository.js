import db from './Database.js';

class RpcRepository {
  create(rpc) {
    const sql = `
      INSERT INTO rpc_endpoints (chainId, name, url, isActive, priority)
      VALUES (?, ?, ?, ?, ?)
    `;
    return db.run(sql, [
      rpc.chainId,
      rpc.name,
      rpc.url,
      rpc.isActive !== undefined ? rpc.isActive : 1,
      rpc.priority || 0
    ]);
  }

  getAll() {
    const sql = 'SELECT * FROM rpc_endpoints ORDER BY priority DESC, id ASC';
    return db.all(sql);
  }

  getByChainId(chainId) {
    const sql = 'SELECT * FROM rpc_endpoints WHERE chainId = ? AND isActive = 1 ORDER BY priority DESC';
    return db.all(sql, [chainId]);
  }

  getById(id) {
    const sql = 'SELECT * FROM rpc_endpoints WHERE id = ?';
    return db.get(sql, [id]);
  }

  update(id, rpc) {
    const sql = `
      UPDATE rpc_endpoints 
      SET chainId = ?, name = ?, url = ?, isActive = ?, priority = ?
      WHERE id = ?
    `;
    return db.run(sql, [
      rpc.chainId,
      rpc.name,
      rpc.url,
      rpc.isActive,
      rpc.priority,
      id
    ]);
  }

  delete(id) {
    const sql = 'DELETE FROM rpc_endpoints WHERE id = ?';
    return db.run(sql, [id]);
  }

  setActive(id, isActive) {
    const sql = 'UPDATE rpc_endpoints SET isActive = ? WHERE id = ?';
    return db.run(sql, [isActive ? 1 : 0, id]);
  }
}

export default new RpcRepository();