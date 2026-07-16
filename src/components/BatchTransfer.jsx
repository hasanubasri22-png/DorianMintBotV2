import React, { useState, useEffect } from 'react';
import { useTransactionContext } from '@/context/TransactionContext';
import { Pause, Play, Trash2, RefreshCw } from 'lucide-react';

const BatchTransfer = () => {
  const {
    queue,
    loading,
    executing,
    paused,
    loadQueue,
    queueBatchTransfer,
    executeQueue,
    pauseQueue,
    resumeQueue,
    cancelQueue
  } = useTransactionContext();

  const [fromAddress, setFromAddress] = useState('');
  const [recipients, setRecipients] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [chainId, setChainId] = useState(1);
  const [password, setPassword] = useState('');
  const [rpcUrl, setRpcUrl] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  const parseRecipients = (text) => {
    return text
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const [address, amount] = line.split(',').map((s) => s.trim());
        return { address, amount };
      });
  };

  const handleQueueTransfer = async () => {
    try {
      setError('');
      setMessage('');

      if (!fromAddress || !recipients || !gasPrice) {
        setError('Please fill all required fields');
        return;
      }

      const recipientList = parseRecipients(recipients);
      if (recipientList.some((r) => !r.address || !r.amount)) {
        setError('Invalid recipient format. Use: address,amount on each line');
        return;
      }

      await queueBatchTransfer(fromAddress, recipientList, gasPrice, chainId);
      setRecipients('');
      setMessage(`Queued ${recipientList.length} transactions`);
    } catch (err) {
      setError(err.message || 'Failed to queue transfers');
    }
  };

  const handleExecute = async () => {
    try {
      setError('');
      setMessage('');

      if (!password || !rpcUrl) {
        setError('Please enter password and RPC URL');
        return;
      }

      await executeQueue(password, rpcUrl);
      setMessage('Queue execution started');
    } catch (err) {
      setError(err.message || 'Failed to execute queue');
    }
  };

  const handlePause = async () => {
    try {
      await pauseQueue();
      setMessage('Queue paused');
    } catch (err) {
      setError(err.message || 'Failed to pause queue');
    }
  };

  const handleResume = async () => {
    try {
      await resumeQueue();
      setMessage('Queue resumed');
    } catch (err) {
      setError(err.message || 'Failed to resume queue');
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel all queued transactions?')) {
      try {
        await cancelQueue();
        setMessage('Queue cancelled');
      } catch (err) {
        setError(err.message || 'Failed to cancel queue');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Batch Transfer</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Queue Transfers</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">From Address</label>
              <input
                type="text"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Gas Price (Gwei)</label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                placeholder="20"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
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
              <label className="block text-sm font-semibold mb-2">Recipients (address,amount per line)</label>
              <textarea
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="0x123...,1.5\n0x456...,2.0"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded h-32"
              />
            </div>
            <button
              onClick={handleQueueTransfer}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
            >
              {loading ? 'Queuing...' : 'Queue Transfers'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Execute Queue</h3>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
            <div className="space-y-2">
              <div>
                <span className="text-gray-400">Pending:</span>
                <div className="text-2xl font-bold">{queue?.pending || 0}</div>
              </div>
              <div>
                <span className="text-gray-400">Queued:</span>
                <div className="text-2xl font-bold">{queue?.queued || 0}</div>
              </div>
              <div>
                <span className="text-gray-400">Total:</span>
                <div className="text-2xl font-bold">{queue?.total || 0}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">RPC URL</label>
              <input
                type="text"
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={handleExecute}
                disabled={loading || executing || !queue?.total}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
              >
                {executing ? 'Executing...' : 'Execute Queue'}
              </button>

              <div className="flex gap-2">
                {executing && (
                  <>
                    <button
                      onClick={handlePause}
                      disabled={paused}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2"
                    >
                      <Pause size={18} />
                      Pause
                    </button>
                    <button
                      onClick={handleResume}
                      disabled={!paused}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2"
                    >
                      <Play size={18} />
                      Resume
                    </button>
                  </>
                )}
                <button
                  onClick={handleCancel}
                  disabled={!queue?.total}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Cancel
                </button>
              </div>

              <button
                onClick={loadQueue}
                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
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

export default BatchTransfer;