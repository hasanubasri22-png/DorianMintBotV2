import React, { createContext, useContext, useState, useCallback } from 'react';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [queue, setQueue] = useState({ pending: 0, queued: 0, total: 0 });
  const [history, setHistory] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queueBatchTransfer = useCallback(async (fromAddress, recipients, gasPrice, chainId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.queueBatchTransfer(fromAddress, recipients, gasPrice, chainId);
      await getQueue();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.getQueue();
      setQueue(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const executeQueue = useCallback(async (password, rpcUrl) => {
    try {
      setLoading(true);
      setIsExecuting(true);
      setError(null);
      const result = await window.transactionAPI.executeQueue(password, rpcUrl);
      await getQueue();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      setIsExecuting(false);
    }
  }, []);

  const pauseQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.pauseQueue();
      setIsPaused(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resumeQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.resumeQueue();
      setIsPaused(false);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.cancelQueue();
      await getQueue();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.transactionAPI.getHistory();
      setHistory(result || []);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    queue,
    history,
    isExecuting,
    isPaused,
    loading,
    error,
    queueBatchTransfer,
    getQueue,
    executeQueue,
    pauseQueue,
    resumeQueue,
    cancelQueue,
    getHistory
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within TransactionProvider');
  }
  return context;
};
