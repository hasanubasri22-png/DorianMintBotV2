import React, { createContext, useContext, useState, useCallback } from 'react';

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [selectedRpc, setSelectedRpc] = useState(null);
  const [rpcEndpoints, setRpcEndpoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRpcEndpoints = useCallback(async () => {
    try {
      setLoading(true);
      const result = await window.settingsAPI.getRpcEndpoints();
      setRpcEndpoints(result);
      if (result.length > 0 && !selectedRpc) {
        setSelectedRpc(result[0]);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load RPC endpoints:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedRpc]);

  const getBalance = useCallback(async (address) => {
    if (!selectedRpc) throw new Error('No RPC endpoint selected');
    try {
      return await window.blockchainAPI.getBalance(address, selectedRpc.url);
    } catch (err) {
      console.error('Failed to get balance:', err);
      throw err;
    }
  }, [selectedRpc]);

  const getNonce = useCallback(async (address) => {
    if (!selectedRpc) throw new Error('No RPC endpoint selected');
    try {
      return await window.blockchainAPI.getNonce(address, selectedRpc.url);
    } catch (err) {
      console.error('Failed to get nonce:', err);
      throw err;
    }
  }, [selectedRpc]);

  const estimateGas = useCallback(async (fromAddress, toAddress, value) => {
    if (!selectedRpc) throw new Error('No RPC endpoint selected');
    try {
      return await window.blockchainAPI.estimateGas(fromAddress, toAddress, value, selectedRpc.url);
    } catch (err) {
      console.error('Failed to estimate gas:', err);
      throw err;
    }
  }, [selectedRpc]);

  const getGasPrice = useCallback(async () => {
    if (!selectedRpc) throw new Error('No RPC endpoint selected');
    try {
      return await window.blockchainAPI.getGasPrice(selectedRpc.url);
    } catch (err) {
      console.error('Failed to get gas price:', err);
      throw err;
    }
  }, [selectedRpc]);

  const syncWallets = useCallback(async () => {
    if (!selectedRpc) throw new Error('No RPC endpoint selected');
    try {
      setLoading(true);
      return await window.blockchainAPI.syncWallets(selectedRpc.url);
    } catch (err) {
      console.error('Failed to sync wallets:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedRpc]);

  return (
    <BlockchainContext.Provider
      value={{
        selectedRpc,
        setSelectedRpc,
        rpcEndpoints,
        setRpcEndpoints,
        loading,
        error,
        loadRpcEndpoints,
        getBalance,
        getNonce,
        estimateGas,
        getGasPrice,
        syncWallets
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchainContext = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchainContext must be used within BlockchainProvider');
  }
  return context;
};