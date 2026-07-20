import React, { createContext, useContext, useState, useCallback } from 'react';

const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.activityLogAPI.get();
      setLogs(result || []);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getLogsByType = useCallback(async (type) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.activityLogAPI.getByType(type);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    logs,
    loading,
    error,
    getLogs,
    getLogsByType
  };

  return (
    <ActivityLogContext.Provider value={value}>
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLog must be used within ActivityLogProvider');
  }
  return context;
};
