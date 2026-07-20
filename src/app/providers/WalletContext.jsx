import React, { createContext, useContext, useState, useCallback } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMnemonic = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.generateMnemonic();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const importMnemonic = useCallback(async (mnemonic, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.importMnemonic(mnemonic, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateWallet = useCallback(async (index) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.generateWallet(index);
      await loadWallets();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWallets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.getAll();
      setWallets(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLabel = useCallback(async (address, label) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.updateLabel(address, label);
      await loadWallets();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteWallet = useCallback(async (address) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.walletAPI.delete(address);
      await loadWallets();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    wallets,
    selectedWallet,
    setSelectedWallet,
    loading,
    error,
    generateMnemonic,
    importMnemonic,
    generateWallet,
    loadWallets,
    updateLabel,
    deleteWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
