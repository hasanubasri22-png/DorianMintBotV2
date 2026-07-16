import React, { createContext, useContext, useState, useCallback } from 'react';

const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);
      const result = await window.activityLogAPI.get();
      setLogs(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load activity logs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getByType = useCallback(async (type) => {
    try {
      setLoading(true);
      const result = await window.activityLogAPI.getByType(type);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Failed to get logs by type:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ActivityLogContext.Provider
      value={{
        logs,
        loading,
        error,
        loadLogs,
        getByType
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLogContext = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLogContext must be used within ActivityLogProvider');
  }
  return context;
};