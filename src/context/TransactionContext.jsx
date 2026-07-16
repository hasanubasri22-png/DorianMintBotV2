import React, { createContext, useContext, useState, useCallback } from 'react';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [queue, setQueue] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(null);

  const loadQueue = useCallback(async () => {
    try {
      setLoading(true);
      const result = await window.transactionAPI.getQueue();
      setQueue(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load queue:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const queueBatchTransfer = useCallback(async (fromAddress, recipients, gasPrice, chainId) => {
    try {
      setLoading(true);
      const result = await window.transactionAPI.queueBatchTransfer(
        fromAddress,
        recipients,
        gasPrice,
        chainId
      );
      await loadQueue();
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Failed to queue batch transfer:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadQueue]);

  const executeQueue = useCallback(async (password, rpcUrl) => {
    try {
      setExecuting(true);
      const result = await window.transactionAPI.executeQueue(password, rpcUrl);
      await loadQueue();
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Failed to execute queue:', err);
      throw err;
    } finally {
      setExecuting(false);
    }
  }, [loadQueue]);

  const pauseQueue = useCallback(async () => {
    try {
      await window.transactionAPI.pauseQueue();
      setPaused(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to pause queue:', err);
      throw err;
    }
  }, []);

  const resumeQueue = useCallback(async () => {
    try {
      await window.transactionAPI.resumeQueue();
      setPaused(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to resume queue:', err);
      throw err;
    }
  }, []);

  const cancelQueue = useCallback(async () => {
    try {
      await window.transactionAPI.cancelQueue();
      await loadQueue();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to cancel queue:', err);
      throw err;
    }
  }, [loadQueue]);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const result = await window.transactionAPI.getHistory();
      setHistory(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        queue,
        history,
        loading,
        executing,
        paused,
        error,
        loadQueue,
        loadHistory,
        queueBatchTransfer,
        executeQueue,
        pauseQueue,
        resumeQueue,
        cancelQueue
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within TransactionProvider');
  }
  return context;
};