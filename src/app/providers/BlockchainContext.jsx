import React, { createContext, useContext, useState, useCallback } from 'react';

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [balance, setBalance] = useState('0');
  const [nonce, setNonce] = useState(0);
  const [gasPrice, setGasPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBalance = useCallback(async (address, rpcUrl) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.blockchainAPI.getBalance(address, rpcUrl);
      setBalance(result.balance);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNonce = useCallback(async (address, rpcUrl) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.blockchainAPI.getNonce(address, rpcUrl);
      setNonce(result.nonce);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const estimateGas = useCallback(async (fromAddress, toAddress, value, rpcUrl) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.blockchainAPI.estimateGas(fromAddress, toAddress, value, rpcUrl);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGasPrice = useCallback(async (rpcUrl) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.blockchainAPI.getGasPrice(rpcUrl);
      setGasPrice(result.gasPrice);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const syncWallets = useCallback(async (rpcUrl) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.blockchainAPI.syncWallets(rpcUrl);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    balance,
    nonce,
    gasPrice,
    loading,
    error,
    getBalance,
    getNonce,
    estimateGas,
    getGasPrice,
    syncWallets
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within BlockchainProvider');
  }
  return context;
};
