<!-- markdownlint-disable -->
# Dorian Mint Bot V2

> Production-ready Electron + React HD Wallet Manager with Batch Transaction Support

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Electron](https://img.shields.io/badge/Electron-43-9feaf0.svg)](https://www.electronjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Features

### 💼 HD Wallet Management
- Generate HD wallets from BIP39 mnemonics (12/24 words)
- Support for up to 1000 managed wallets
- AES-256 encryption for private keys and mnemonics
- Real-time balance and nonce tracking
- Wallet metadata and labeling

### 🔗 Blockchain Integration
- Multi-RPC endpoint support with failover
- Real-time wallet synchronization
- Gas estimation with EIP-1559 support
- Multiple chain support (Ethereum, Polygon, etc.)
- Powered by ethers.js v6

### 📦 Batch Transaction Processing
- Queue and execute batch ETH transfers
- Support for hundreds of recipients
- Pause, resume, and cancel operations
- Progress tracking with real-time updates
- Comprehensive transaction logging

### 📊 Advanced Features
- Activity logging system
- RPC endpoint management
- Transaction history and status tracking
- Application settings management

## 📋 Quick Start

### Installation
```bash
git clone <repo-url>
cd DorianMintBotV2
npm install
```

### Development
```bash
# Start development environment
npm run electron:dev

# Or run separately:
npm run dev              # Terminal 1 - Vite dev server
npm run electron         # Terminal 2 - Electron app
```

### Production Build
```bash
npm run electron:build
# Output: ./release/
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Architecture and API reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[COMMITS.md](./COMMITS.md)** - Commit guidelines

## 🏗️ Architecture

### Layer Separation
```
┌─────────────────────────────────┐
│  UI Layer (React Components)    │
├─────────────────────────────────┤
│  Context Layer (State Mgmt)     │
├─────────────────────────────────┤
│  IPC Layer (Electron Bridge)    │
├─────────────────────────────────┤
│  Service Layer (Business Logic) │
├─────────────────────────────────┤
│  Repository Layer (Data Access) │
├─────────────────────────────────┤
│  Database (BetterSQLite3)       │
└─────────────────────────────────┘
```

### Technology Stack

**Frontend**
- React 19.2.7
- Tailwind CSS 4.3.2
- Lucide React Icons
- Context API for state

**Backend**
- Electron 43.1.1
- BetterSQLite3 11.5.0
- ethers.js 6.17.0
- crypto-js 4.2.1

**Build & Dev**
- Vite 8.1.1
- Electron Builder 26.15.3
- ESLint 10.6.0
- TypeScript 5.0+

## 🔒 Security

✅ **Encryption**
- AES-256 for sensitive data
- SHA-256 for password hashing
- Private keys never exposed to renderer

✅ **Isolation**
- Electron context isolation enabled
- IPC-based access control
- No direct process access from UI

✅ **Database**
- WAL mode for integrity
- Encrypted storage
- Validated input

## 📊 Project Structure

```
DorianMintBotV2/
├── electron/              # Main process & services
│   ├── database/         # BetterSQLite3 repositories
│   ├── services/         # Business logic
│   ├── ipc/             # IPC handlers
│   ├── main.js          # Entry point
│   └── preload.js       # Context bridge
├── src/                  # Renderer process
│   ├── components/       # React UI components
│   ├── context/         # State management
│   ├── constants/       # App constants
│   ├── utils/          # Utilities
│   ├── App.jsx         # Main app
│   ├── main.jsx        # React entry
│   └── index.css       # Styles
├── package.json          # Dependencies
├── vite.config.js       # Vite config
├── tsconfig.json        # TypeScript config
└── eslint.config.js     # Linting rules
```

## 🚀 Usage

### 1. Generate or Import Mnemonic
```
Mnemonic Tab → Generate/Import → Set Password
```

### 2. Create Wallets
```
Wallets Tab → Generate Wallet → Creates HD-derived wallets
```

### 3. Configure RPC
```
RPC Settings → Add Endpoint → Set Priority
```

### 4. Execute Batch Transfers
```
Batch Transfer Tab → Queue Recipients → Execute → Monitor
```

## 🧪 Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                 # Vite dev server
npm run electron           # Electron app
npm run electron:dev       # Both combined

# Build
npm run build              # Vite build
npm run electron:build     # Full build with installer

# Linting
npm run lint               # Fix issues
npm run lint:check         # Check only

# Preview
npm run preview            # Preview build
```

## 📝 API Reference

### Window APIs (Preload Exposed)

**Wallets**
```javascript
window.walletAPI.generateMnemonic()
window.walletAPI.importMnemonic(mnemonic, password)
window.walletAPI.exportMnemonic(password)
window.walletAPI.generateWallet(index)
window.walletAPI.getAll()
window.walletAPI.updateLabel(address, label)
window.walletAPI.delete(address)
```

**Blockchain**
```javascript
window.blockchainAPI.getBalance(address, rpcUrl)
window.blockchainAPI.getNonce(address, rpcUrl)
window.blockchainAPI.estimateGas(from, to, value, rpcUrl)
window.blockchainAPI.getGasPrice(rpcUrl)
window.blockchainAPI.syncWallets(rpcUrl)
```

**Transactions**
```javascript
window.transactionAPI.queueBatchTransfer(...)
window.transactionAPI.executeQueue(password, rpcUrl)
window.transactionAPI.pauseQueue()
window.transactionAPI.resumeQueue()
window.transactionAPI.cancelQueue()
```

**Settings**
```javascript
window.settingsAPI.getRpcEndpoints()
window.settingsAPI.addRpcEndpoint(rpc)
window.settingsAPI.updateRpcEndpoint(id, rpc)
window.settingsAPI.deleteRpcEndpoint(id)
window.settingsAPI.getSetting(key, default)
window.settingsAPI.setSetting(key, value)
```

**Activity Logs**
```javascript
window.activityLogAPI.get()
window.activityLogAPI.getByType(type)
```

## 🗄️ Database Schema

7 optimized tables:
- `wallets` - HD wallet data
- `mnemonics` - Encrypted mnemonic backup
- `rpc_endpoints` - Provider configuration
- `transactions` - TX history & queue
- `activity_logs` - Audit logs
- `settings` - App settings
- `indices` - Performance optimization

## 🎯 Features

- ✅ HD Wallet generation from BIP39 mnemonic
- ✅ Import/export encrypted mnemonics
- ✅ Up to 1000 wallet management
- ✅ AES-256 private key encryption
- ✅ Real-time balance & nonce tracking
- ✅ Multi-RPC endpoint support
- ✅ Batch ETH transfers
- ✅ Transaction queue management
- ✅ Pause/resume/cancel operations
- ✅ Gas estimation
- ✅ EIP-1559 support
- ✅ Activity logging
- ✅ Error recovery
- ✅ Beautiful dark UI

## 📦 Dependencies

### Production
- React 19.2.7
- ethers.js 6.17.0
- bip39 4.0.1
- hdkey 2.2.0
- better-sqlite3 11.5.0
- crypto-js 4.2.1
- Tailwind CSS 4.3.2

### Development
- Vite 8.1.1
- Electron 43.1.1
- Electron Builder 26.15.3
- ESLint 10.6.0
- TypeScript 5.0+

## 🐛 Troubleshooting

**App won't start**
- Verify `npm install` completed
- Check Node.js version (16+)
- Review database path permissions

**Database errors**
- Check database directory is writable
- Ensure database isn't locked
- Review error logs in Activity tab

**RPC issues**
- Verify endpoint URL
- Check internet connection
- Ensure chain ID matches

## 📄 License

MIT © 2024

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [Electron](https://www.electronjs.org/)
- [ethers.js](https://docs.ethers.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [BetterSQLite3](https://github.com/WiseLibs/better-sqlite3)

## 📞 Support

1. Check [QUICKSTART.md](./QUICKSTART.md) for setup help
2. Review [DEVELOPMENT.md](./DEVELOPMENT.md) for technical docs
3. Check Activity Log for error messages
4. Review console (F12) for debugging

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: 2024-07-20
