import db from './Database.js';

class ActivityLogRepository {
  create(log) {
    const sql = `
      INSERT INTO activity_logs (type, action, details, status)
      VALUES (?, ?, ?, ?)
    `;
    return db.run(sql, [
      log.type || '',
      log.action || '',
      log.details ? String(log.details) : '',
      log.status || 'info'
    ]);
  }

  getAll() {
    const sql = 'SELECT * FROM activity_logs ORDER BY createdAt DESC';
    return db.all(sql);
  }

  getRecent(limit = 50) {
    const sql = 'SELECT * FROM activity_logs ORDER BY createdAt DESC LIMIT ?';
    return db.all(sql, [limit]);
  }

  getByType(type) {
    const sql = 'SELECT * FROM activity_logs WHERE type = ? ORDER BY createdAt DESC';
    return db.all(sql, [type]);
  }

  getByStatus(status) {
    const sql = 'SELECT * FROM activity_logs WHERE status = ? ORDER BY createdAt DESC';
    return db.all(sql, [status]);
  }

  delete(id) {
    const sql = 'DELETE FROM activity_logs WHERE id = ?';
    return db.run(sql, [id]);
  }
}

export default new ActivityLogRepository();