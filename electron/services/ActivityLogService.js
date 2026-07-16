import ActivityLogRepository from '../database/ActivityLogRepository.js';

class ActivityLogService {
  log(type, action, details, status = 'info') {
    try {
      const logEntry = {
        type,
        action,
        details,
        status
      };
      ActivityLogRepository.create(logEntry);
      console.log(`[${type}] ${action}`);
    } catch (error) {
      console.error('Activity log error:', error);
    }
  }

  getRecent(limit = 50) {
    try {
      return ActivityLogRepository.getRecent(limit);
    } catch (error) {
      console.error('Get recent logs error:', error);
      throw error;
    }
  }

  getByType(type) {
    try {
      return ActivityLogRepository.getByType(type);
    } catch (error) {
      console.error('Get logs by type error:', error);
      throw error;
    }
  }
}

export default new ActivityLogService();