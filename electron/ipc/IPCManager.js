import { BrowserWindow, ipcMain } from 'electron';
import WalletService from '../services/WalletService.js';
import BlockchainService from '../services/BlockchainService.js';
import TransactionService from '../services/TransactionService.js';
import SettingsService from '../services/SettingsService.js';
import ActivityLogService from '../services/ActivityLogService.js';

class IPCManager {
  constructor() {
    this.mainWindow = null;
  }

  initialize(mainWindow) {
    this.mainWindow = mainWindow;
    this.setupWalletHandlers();
    this.setupBlockchainHandlers();
    this.setupTransactionHandlers();
    this.setupSettingsHandlers();
    this.setupActivityLogHandlers();
    console.log('IPC Manager initialized');
  }

  // Wallet Handlers
  setupWalletHandlers() {
    ipcMain.handle('wallet:importMnemonic', async (event, { mnemonic, password }) => {
      try {
        return WalletService.importMnemonic(mnemonic, password);
      } catch (error) {
        console.error('Import mnemonic error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:generateMnemonic', async () => {
      try {
        return WalletService.generateMnemonic();
      } catch (error) {
        console.error('Generate mnemonic error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:exportMnemonic', async (event, { password }) => {
      try {
        return WalletService.exportMnemonic(password);
      } catch (error) {
        console.error('Export mnemonic error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:generateWallet', async (event, { index, password }) => {
      try {
        return WalletService.generateWallet(index, password);
      } catch (error) {
        console.error('Generate wallet error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:getAll', async () => {
      try {
        return WalletService.getAll();
      } catch (error) {
        console.error('Get all wallets error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:updateLabel', async (event, { address, label }) => {
      try {
        return WalletService.updateLabel(address, label);
      } catch (error) {
        console.error('Update label error:', error);
        throw error;
      }
    });

    ipcMain.handle('wallet:delete', async (event, { address }) => {
      try {
        return WalletService.deleteWallet(address);
      } catch (error) {
        console.error('Delete wallet error:', error);
        throw error;
      }
    });
  }

  // Blockchain Handlers
  setupBlockchainHandlers() {
    ipcMain.handle('blockchain:getBalance', async (event, { address, rpcUrl }) => {
      try {
        return BlockchainService.getBalance(address, rpcUrl);
      } catch (error) {
        console.error('Get balance error:', error);
        throw error;
      }
    });

    ipcMain.handle('blockchain:getNonce', async (event, { address, rpcUrl }) => {
      try {
        return BlockchainService.getNonce(address, rpcUrl);
      } catch (error) {
        console.error('Get nonce error:', error);
        throw error;
      }
    });

    ipcMain.handle('blockchain:estimateGas', async (event, { fromAddress, toAddress, value, rpcUrl }) => {
      try {
        return BlockchainService.estimateGas(fromAddress, toAddress, value, rpcUrl);
      } catch (error) {
        console.error('Estimate gas error:', error);
        throw error;
      }
    });

    ipcMain.handle('blockchain:getGasPrice', async (event, { rpcUrl }) => {
      try {
        return BlockchainService.getGasPrice(rpcUrl);
      } catch (error) {
        console.error('Get gas price error:', error);
        throw error;
      }
    });

    ipcMain.handle('blockchain:syncWallets', async (event, { rpcUrl }) => {
      try {
        return BlockchainService.syncWallets(rpcUrl);
      } catch (error) {
        console.error('Sync wallets error:', error);
        throw error;
      }
    });
  }

  // Transaction Handlers
  setupTransactionHandlers() {
    ipcMain.handle('transaction:queueBatchTransfer', async (event, { fromAddress, recipients, gasPrice, chainId }) => {
      try {
        return TransactionService.queueBatchTransfer(fromAddress, recipients, gasPrice, chainId);
      } catch (error) {
        console.error('Queue batch transfer error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:getQueue', async () => {
      try {
        return TransactionService.getQueue();
      } catch (error) {
        console.error('Get queue error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:executeQueue', async (event, { password, rpcUrl }) => {
      try {
        return TransactionService.executeQueue(password, rpcUrl);
      } catch (error) {
        console.error('Execute queue error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:pauseQueue', async () => {
      try {
        return TransactionService.pauseQueue();
      } catch (error) {
        console.error('Pause queue error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:resumeQueue', async () => {
      try {
        return TransactionService.resumeQueue();
      } catch (error) {
        console.error('Resume queue error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:cancelQueue', async () => {
      try {
        return TransactionService.cancelQueue();
      } catch (error) {
        console.error('Cancel queue error:', error);
        throw error;
      }
    });

    ipcMain.handle('transaction:getHistory', async () => {
      try {
        return TransactionService.getHistory();
      } catch (error) {
        console.error('Get history error:', error);
        throw error;
      }
    });
  }

  // Settings Handlers
  setupSettingsHandlers() {
    ipcMain.handle('settings:getRpcEndpoints', async () => {
      try {
        return SettingsService.getRpcEndpoints();
      } catch (error) {
        console.error('Get RPC endpoints error:', error);
        throw error;
      }
    });

    ipcMain.handle('settings:addRpcEndpoint', async (event, rpc) => {
      try {
        return SettingsService.addRpcEndpoint(rpc);
      } catch (error) {
        console.error('Add RPC endpoint error:', error);
        throw error;
      }
    });

    ipcMain.handle('settings:updateRpcEndpoint', async (event, { id, ...rpc }) => {
      try {
        return SettingsService.updateRpcEndpoint(id, rpc);
      } catch (error) {
        console.error('Update RPC endpoint error:', error);
        throw error;
      }
    });

    ipcMain.handle('settings:deleteRpcEndpoint', async (event, { id }) => {
      try {
        return SettingsService.deleteRpcEndpoint(id);
      } catch (error) {
        console.error('Delete RPC endpoint error:', error);
        throw error;
      }
    });

    ipcMain.handle('settings:get', async (event, { key, defaultValue }) => {
      try {
        return SettingsService.getSetting(key, defaultValue);
      } catch (error) {
        console.error('Get setting error:', error);
        throw error;
      }
    });

    ipcMain.handle('settings:set', async (event, { key, value }) => {
      try {
        return SettingsService.setSetting(key, value);
      } catch (error) {
        console.error('Set setting error:', error);
        throw error;
      }
    });
  }

  // Activity Log Handlers
  setupActivityLogHandlers() {
    ipcMain.handle('activityLog:get', async () => {
      try {
        return ActivityLogService.getRecent(100);
      } catch (error) {
        console.error('Get activity log error:', error);
        throw error;
      }
    });

    ipcMain.handle('activityLog:getByType', async (event, { type }) => {
      try {
        return ActivityLogService.getByType(type);
      } catch (error) {
        console.error('Get activity log by type error:', error);
        throw error;
      }
    });
  }

  sendToRenderer(channel, data) {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send(channel, data);
    }
  }
}

export default new IPCManager();
