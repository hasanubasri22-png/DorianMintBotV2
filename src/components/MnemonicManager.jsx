import React, { useState } from 'react';
import { useWallet } from '../app/providers/WalletContext';
import { Copy, Eye, EyeOff } from 'lucide-react';

const MnemonicManager = () => {
  const { mnemonicPassword, setMnemonicPassword } = useWallet();
  const [mnemonic, setMnemonic] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('generate'); // generate, import, export
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateMnemonic = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await window.walletAPI.generateMnemonic();
      setMnemonic(result.mnemonic);
      setMessage('Mnemonic generated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to generate mnemonic');
    } finally {
      setLoading(false);
    }
  };

  const handleImportMnemonic = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await window.walletAPI.importMnemonic(mnemonic, password);
      setMnemonicPassword(password);
      setMnemonic('');
      setPassword('');
      setConfirmPassword('');
      setMode('generate');
      setMessage('Mnemonic imported successfully!');
    } catch (err) {
      setError(err.message || 'Failed to import mnemonic');
    } finally {
      setLoading(false);
    }
  };

  const handleExportMnemonic = async () => {
    if (!password) {
      setError('Please enter your password');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const result = await window.walletAPI.exportMnemonic(password);
      setMnemonic(result.mnemonic);
      setShowMnemonic(true);
      setMessage('Mnemonic exported successfully!');
    } catch (err) {
      setError(err.message || 'Failed to export mnemonic');
      setShowMnemonic(false);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage('Copied to clipboard!');
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Mnemonic Manager</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setMode('generate');
            setMnemonic('');
            setError('');
            setMessage('');
          }}
          className={`px-4 py-2 rounded ${
            mode === 'generate'
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Generate
        </button>
        <button
          onClick={() => {
            setMode('import');
            setMnemonic('');
            setError('');
            setMessage('');
          }}
          className={`px-4 py-2 rounded ${
            mode === 'import'
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Import
        </button>
        <button
          onClick={() => {
            setMode('export');
            setMnemonic('');
            setError('');
            setMessage('');
          }}
          className={`px-4 py-2 rounded ${
            mode === 'export'
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Export
        </button>
      </div>

      {mode === 'generate' && (
        <div className="space-y-4">
          <button
            onClick={handleGenerateMnemonic}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Generating...' : 'Generate New Mnemonic'}
          </button>
          {mnemonic && (
            <div className="bg-gray-800 border border-yellow-500 rounded-lg p-4">
              <div className="text-yellow-400 font-semibold mb-2">⚠️ Save this mnemonic in a safe place</div>
              <div className="relative">
                <div className="flex items-center gap-2 cursor-pointer mb-2" onClick={() => setShowMnemonic(!showMnemonic)}>
                  {showMnemonic ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span className="text-sm text-gray-400">{showMnemonic ? 'Hide' : 'Show'} Mnemonic</span>
                </div>
                {showMnemonic && (
                  <div className="bg-gray-700 p-4 rounded mb-2 break-words font-mono text-sm">
                    {mnemonic}
                  </div>
                )}
              </div>
              <button
                onClick={() => copyToClipboard(mnemonic)}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <Copy size={18} />
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}

      {mode === 'import' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Mnemonic (12 or 24 words)</label>
            <textarea
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              placeholder="Enter your mnemonic words here..."
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <button
            onClick={handleImportMnemonic}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Importing...' : 'Import Mnemonic'}
          </button>
        </div>
      )}

      {mode === 'export' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <button
            onClick={handleExportMnemonic}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Exporting...' : 'Export Mnemonic'}
          </button>
          {showMnemonic && mnemonic && (
            <div className="bg-gray-800 border border-orange-500 rounded-lg p-4">
              <div className="bg-gray-700 p-4 rounded mb-2 break-words font-mono text-sm">
                {mnemonic}
              </div>
              <button
                onClick={() => copyToClipboard(mnemonic)}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <Copy size={18} />
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}

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

export default MnemonicManager;
