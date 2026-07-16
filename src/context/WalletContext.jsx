import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mnemonicPassword, setMnemonicPassword] = useState(null);

  const loadWallets = useCallback(async () => {
    try {
      setLoading(true);
      const result = await window.walletAPI.getAll();
      setWallets(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load wallets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateWallet = useCallback(async (index) => {
    try {
      setLoading(true);
      const result = await window.walletAPI.generateWallet(index);
      await loadWallets();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Failed to generate wallet:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadWallets]);

  const updateWalletLabel = useCallback(async (address, label) => {
    try {
      setLoading(true);
      await window.walletAPI.updateLabel(address, label);
      await loadWallets();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to update wallet label:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadWallets]);

  const deleteWallet = useCallback(async (address) => {
    try {
      setLoading(true);
      await window.walletAPI.delete(address);
      await loadWallets();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete wallet:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadWallets]);

  useEffect(() => {
    loadWallets();
  }, [loadWallets]);

  return (
    <WalletContext.Provider
      value={{
        wallets,
        loading,
        error,
        mnemonicPassword,
        setMnemonicPassword,
        loadWallets,
        generateWallet,
        updateWalletLabel,
        deleteWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within WalletProvider');
  }
  return context;
};