import React, { useState } from 'react';
import { useWallet } from '../app/providers/WalletContext';
import { Copy, Trash2, Edit2, Plus } from 'lucide-react';

const WalletManager = () => {
  const { wallets, loading, generateWallet, updateLabel, deleteWallet } = useWallet();
  const [editingAddress, setEditingAddress] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [newIndex, setNewIndex] = useState(wallets.length);

  const handleGenerateWallet = async () => {
    try {
      await generateWallet(newIndex);
      setNewIndex(newIndex + 1);
    } catch (error) {
      console.error('Error generating wallet:', error);
    }
  };

  const handleUpdateLabel = async (address) => {
    try {
      await updateLabel(address, editLabel);
      setEditingAddress(null);
      setEditLabel('');
    } catch (error) {
      console.error('Error updating label:', error);
    }
  };

  const handleDeleteWallet = async (address) => {
    if (window.confirm('Are you sure you want to delete this wallet?')) {
      try {
        await deleteWallet(address);
      } catch (error) {
        console.error('Error deleting wallet:', error);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Wallet Manager</h2>
        <button
          onClick={handleGenerateWallet}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Generate Wallet
        </button>
      </div>

      <div className="space-y-4">
        {loading && !wallets.length && (
          <div className="text-center text-gray-400">Loading wallets...</div>
        )}

        {wallets.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-8">
            No wallets yet. Generate your first wallet to start.
          </div>
        )}

        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingAddress === wallet.address ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      placeholder="Wallet label"
                      className="bg-gray-700 text-white px-2 py-1 rounded flex-1"
                      autoFocus
                    />
                    <button
                      onClick={() => handleUpdateLabel(wallet.address)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingAddress(null)}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{wallet.label || 'Unlabeled'}</h3>
                    <button
                      onClick={() => {
                        setEditingAddress(wallet.address);
                        setEditLabel(wallet.label || '');
                      }}
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
                <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-700 px-2 py-1 rounded">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(-4)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="text-gray-400 hover:text-blue-400"
                      title="Copy address"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Balance:</span>
                    <div className="font-semibold">{wallet.balance} ETH</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Nonce:</span>
                    <div className="font-semibold">{wallet.nonce}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Index:</span>
                    <div className="font-semibold">{wallet.index}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteWallet(wallet.address)}
                className="text-red-400 hover:text-red-600 ml-4"
                title="Delete wallet"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletManager;
