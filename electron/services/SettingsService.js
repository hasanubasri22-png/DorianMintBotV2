import RpcRepository from '../database/RpcRepository.js';

class SettingsService {
  getRpcEndpoints() {
    try {
      return RpcRepository.getAll();
    } catch (error) {
      console.error('Get RPC endpoints error:', error);
      throw error;
    }
  }

  addRpcEndpoint(rpc) {
    try {
      RpcRepository.create(rpc);
      return { success: true };
    } catch (error) {
      console.error('Add RPC endpoint error:', error);
      throw error;
    }
  }

  updateRpcEndpoint(id, rpc) {
    try {
      RpcRepository.update(id, rpc);
      return { success: true };
    } catch (error) {
      console.error('Update RPC endpoint error:', error);
      throw error;
    }
  }

  deleteRpcEndpoint(id) {
    try {
      RpcRepository.delete(id);
      return { success: true };
    } catch (error) {
      console.error('Delete RPC endpoint error:', error);
      throw error;
    }
  }

  getSetting(key, defaultValue) {
    try {
      const SettingsRepository = require('../database/SettingsRepository.js').default;
      return SettingsRepository.get(key, defaultValue);
    } catch (error) {
      console.error('Get setting error:', error);
      throw error;
    }
  }

  setSetting(key, value) {
    try {
      const SettingsRepository = require('../database/SettingsRepository.js').default;
      SettingsRepository.set(key, value);
      return { success: true };
    } catch (error) {
      console.error('Set setting error:', error);
      throw error;
    }
  }
}

export default new SettingsService();