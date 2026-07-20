const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  invoke(channel, data) {
    return ipcRenderer.invoke(channel, data);
  },

  send(channel, data) {
    ipcRenderer.send(channel, data);
  },

  on(channel, callback) {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  off(channel, callback) {
    ipcRenderer.off(channel, (_, data) => callback(data));
  }
});

// Wallet API
contextBridge.exposeInMainWorld('walletAPI', {
  generateMnemonic: () => ipcRenderer.invoke('wallet:generateMnemonic'),
  importMnemonic: (mnemonic, password) =>
    ipcRenderer.invoke('wallet:importMnemonic', { mnemonic, password }),
  exportMnemonic: (password) => ipcRenderer.invoke('wallet:exportMnemonic', { password }),
  generateWallet: (index) => ipcRenderer.invoke('wallet:generateWallet', { index }),
  getAll: () => ipcRenderer.invoke('wallet:getAll'),
  updateLabel: (address, label) =>
    ipcRenderer.invoke('wallet:updateLabel', { address, label }),
  delete: (address) => ipcRenderer.invoke('wallet:delete', { address })
});

// Blockchain API
contextBridge.exposeInMainWorld('blockchainAPI', {
  getBalance: (address, rpcUrl) =>
    ipcRenderer.invoke('blockchain:getBalance', { address, rpcUrl }),
  getNonce: (address, rpcUrl) =>
    ipcRenderer.invoke('blockchain:getNonce', { address, rpcUrl }),
  estimateGas: (fromAddress, toAddress, value, rpcUrl) =>
    ipcRenderer.invoke('blockchain:estimateGas', { fromAddress, toAddress, value, rpcUrl }),
  getGasPrice: (rpcUrl) => ipcRenderer.invoke('blockchain:getGasPrice', { rpcUrl }),
  syncWallets: (rpcUrl) => ipcRenderer.invoke('blockchain:syncWallets', { rpcUrl })
});

// Transaction API
contextBridge.exposeInMainWorld('transactionAPI', {
  queueBatchTransfer: (fromAddress, recipients, gasPrice, chainId) =>
    ipcRenderer.invoke('transaction:queueBatchTransfer', {
      fromAddress,
      recipients,
      gasPrice,
      chainId
    }),
  getQueue: () => ipcRenderer.invoke('transaction:getQueue'),
  executeQueue: (password, rpcUrl) =>
    ipcRenderer.invoke('transaction:executeQueue', { password, rpcUrl }),
  pauseQueue: () => ipcRenderer.invoke('transaction:pauseQueue'),
  resumeQueue: () => ipcRenderer.invoke('transaction:resumeQueue'),
  cancelQueue: () => ipcRenderer.invoke('transaction:cancelQueue'),
  getHistory: () => ipcRenderer.invoke('transaction:getHistory')
});

// Settings API
contextBridge.exposeInMainWorld('settingsAPI', {
  getRpcEndpoints: () => ipcRenderer.invoke('settings:getRpcEndpoints'),
  addRpcEndpoint: (rpc) => ipcRenderer.invoke('settings:addRpcEndpoint', rpc),
  updateRpcEndpoint: (id, rpc) =>
    ipcRenderer.invoke('settings:updateRpcEndpoint', { id, ...rpc }),
  deleteRpcEndpoint: (id) => ipcRenderer.invoke('settings:deleteRpcEndpoint', { id }),
  getSetting: (key, defaultValue) =>
    ipcRenderer.invoke('settings:get', { key, defaultValue }),
  setSetting: (key, value) => ipcRenderer.invoke('settings:set', { key, value })
});

// Activity Log API
contextBridge.exposeInMainWorld('activityLogAPI', {
  get: () => ipcRenderer.invoke('activityLog:get'),
  getByType: (type) => ipcRenderer.invoke('activityLog:getByType', { type })
});
