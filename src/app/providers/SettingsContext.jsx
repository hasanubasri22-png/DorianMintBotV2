import React, { createContext, useContext, useState, useCallback } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [rpcEndpoints, setRpcEndpoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRpcEndpoints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.getRpcEndpoints();
      setRpcEndpoints(result || []);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addRpcEndpoint = useCallback(async (rpc) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.addRpcEndpoint(rpc);
      await getRpcEndpoints();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRpcEndpoint = useCallback(async (id, rpc) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.updateRpcEndpoint(id, rpc);
      await getRpcEndpoints();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRpcEndpoint = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.deleteRpcEndpoint(id);
      await getRpcEndpoints();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSetting = useCallback(async (key, defaultValue) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.getSetting(key, defaultValue);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const setSetting = useCallback(async (key, value) => {
    try {
      setLoading(true);
      setError(null);
      const result = await window.settingsAPI.setSetting(key, value);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    rpcEndpoints,
    loading,
    error,
    getRpcEndpoints,
    addRpcEndpoint,
    updateRpcEndpoint,
    deleteRpcEndpoint,
    getSetting,
    setSetting
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
