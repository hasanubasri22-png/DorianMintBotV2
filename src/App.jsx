import React, { useState } from 'react';
import { Wallet, Send, Settings, LogOut, Menu, X } from 'lucide-react';
import WalletManager from './components/WalletManager';
import MnemonicManager from './components/MnemonicManager';
import BatchTransfer from './components/BatchTransfer';
import ActivityLog from './components/ActivityLog';
import RPCManager from './components/RPCManager';

export default function App() {
  const [currentPage, setCurrentPage] = useState('wallets');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = [
    { id: 'wallets', label: 'Wallets', icon: Wallet, component: WalletManager },
    { id: 'mnemonic', label: 'Mnemonic', icon: Wallet, component: MnemonicManager },
    { id: 'transfer', label: 'Batch Transfer', icon: Send, component: BatchTransfer },
    { id: 'rpc', label: 'RPC Settings', icon: Settings, component: RPCManager },
    { id: 'logs', label: 'Activity Log', icon: LogOut, component: ActivityLog }
  ];

  const currentPageObj = pages.find((p) => p.id === currentPage);
  const CurrentComponent = currentPageObj?.component || WalletManager;

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Wallet className="text-blue-500" size={24} />
              <span className="font-bold text-lg">Dorian Mint</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  currentPage === page.id
                    ? 'bg-blue-600 border-r-2 border-blue-400 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                title={sidebarOpen ? '' : page.label}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{page.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          {sidebarOpen && (
            <div className="text-xs text-gray-500">
              <div>Version 1.0.0</div>
              <div>© 2024 Dorian Mint</div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            {currentPageObj?.label}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your crypto wallets and transactions
          </p>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <CurrentComponent />
        </div>
      </main>
    </div>
  );
}