import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../app/providers/BlockchainContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const RPCManager = () => {
  const { rpcEndpoints, loading, loadRpcEndpoints } = useBlockchain();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [chainId, setChainId] = useState(1);
  const [priority, setPriority] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadRpcEndpoints();
  }, [loadRpcEndpoints]);

  const handleAddRpc = async () => {
    try {
      setError('');
      setMessage('');

      if (!name || !url || !chainId) {
        setError('Please fill all required fields');
        return;
      }

      const rpc = { name, url, chainId, priority, isActive: 1 };

      if (editingId) {
        await window.settingsAPI.updateRpcEndpoint(editingId, rpc);
        setMessage('RPC endpoint updated');
        setEditingId(null);
      } else {
        await window.settingsAPI.addRpcEndpoint(rpc);
        setMessage('RPC endpoint added');
      }

      setName('');
      setUrl('');
      setChainId(1);
      setPriority(0);
      loadRpcEndpoints();
    } catch (err) {
      setError(err.message || 'Failed to save RPC endpoint');
    }
  };

  const handleDeleteRpc = async (id) => {
    if (window.confirm('Are you sure you want to delete this RPC endpoint?')) {
      try {
        await window.settingsAPI.deleteRpcEndpoint(id);
        setMessage('RPC endpoint deleted');
        loadRpcEndpoints();
      } catch (err) {
        setError(err.message || 'Failed to delete RPC endpoint');
      }
    }
  };

  const handleEditRpc = (rpc) => {
    setEditingId(rpc.id);
    setName(rpc.name);
    setUrl(rpc.url);
    setChainId(rpc.chainId);
    setPriority(rpc.priority);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">RPC Manager</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Add/Edit RPC Endpoint</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Infura"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold mb-2">Chain ID</label>
                <input
                  type="number"
                  value={chainId}
                  onChange={(e) => setChainId(parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Priority</label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddRpc}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
              >
                {editingId ? 'Update' : 'Add'} RPC
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setName('');
                    setUrl('');
                    setChainId(1);
                    setPriority(0);
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">RPC Endpoints</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {loading && !rpcEndpoints.length && (
              <div className="text-center text-gray-400">Loading RPC endpoints...</div>
            )}

            {rpcEndpoints.length === 0 && !loading && (
              <div className="text-center text-gray-400 py-8">No RPC endpoints configured</div>
            )}

            {rpcEndpoints.map((rpc) => (
              <div
                key={rpc.id}
                className="bg-gray-800 border border-gray-700 rounded p-3 hover:border-gray-600 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold">{rpc.name}</div>
                    <div className="text-xs text-gray-400 break-all">{rpc.url}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Chain: {rpc.chainId} | Priority: {rpc.priority}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEditRpc(rpc)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteRpc(rpc.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-900 border border-red-700 text-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-4 bg-green-900 border border-green-700 text-green-100 px-4 py-2 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default RPCManager;
