# Dorian Mint Bot V2 - Development Guide

## Project Structure Overview

### Frontend (React)

```
src/
├── components/
│   ├── WalletManager.jsx       # Wallet CRUD operations
│   ├── MnemonicManager.jsx     # Mnemonic import/export/generate
│   ├── BatchTransfer.jsx       # Batch transaction queuing & execution
│   ├── ActivityLog.jsx         # Transaction and activity history
│   └── RPCManager.jsx          # RPC endpoint configuration
├── context/
│   ├── WalletContext.jsx       # Wallet state management
│   ├── BlockchainContext.jsx   # Blockchain operations
│   ├── TransactionContext.jsx  # Transaction queue management
│   ├── ActivityLogContext.jsx  # Activity log state
│   └── index.js               # Provider setup
├── constants/
│   └── chains.js              # Chain IDs and RPC endpoints
├── utils/
│   └── validators.js          # Input validation utilities
├── App.jsx                    # Main app component with navigation
├── main.jsx                   # React entry point
└── index.css                  # Tailwind styles
```

### Backend (Electron Main)

```
electron/
├── database/
│   ├── Database.js                   # BetterSQLite3 initialization
│   ├── WalletRepository.js           # Wallet CRUD
│   ├── MnemonicRepository.js         # Mnemonic storage
│   ├── RpcRepository.js              # RPC endpoints CRUD
│   ├── TransactionRepository.js      # Transaction history
│   ├── ActivityLogRepository.js      # Activity logs
│   └── SettingsRepository.js         # Settings storage
├── services/
│   ├── WalletService.js              # Wallet generation & management
│   ├── BlockchainService.js          # Blockchain RPC calls (ethers.js)
│   ├── TransactionService.js         # Transaction queue logic
│   ├── SettingsService.js            # Settings management
│   ├── ActivityLogService.js         # Logging service
│   └── CryptoService.js              # AES-256 encryption
├── ipc/
│   └── IPCManager.js                 # IPC handlers for all operations
├── main.js                           # Electron main process
└── preload.js                        # Electron preload (context bridge)
```

## Data Flow

### User Action Flow

```
UI Component (React)
    ↓
Context Provider (State Management)
    ↓
Preload API (window.walletAPI, etc.)
    ↓
ipcRenderer.invoke() → Main Process
    ↓
IPCManager Handler
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Database Access)
    ↓
BetterSQLite3 Database
```

### Example: Generate Wallet

1. User clicks "Generate Wallet" in WalletManager component
2. `handleGenerateWallet()` calls `generateWallet(index)` from WalletContext
3. Context calls `window.walletAPI.generateWallet(index)` 
4. Preload bridges to `ipcRenderer.invoke('wallet:generateWallet', { index })`
5. Main process receives in IPCManager: `ipcMain.handle('wallet:generateWallet', ...)`
6. IPCManager calls `WalletService.generateWallet(index)`
7. WalletService:
   - Retrieves mnemonic from MnemonicRepository
   - Decrypts mnemonic with password
   - Derives wallet using ethers.js HDNodeWallet
   - Encrypts private key
   - Creates wallet object
8. Calls `WalletRepository.create(wallet)` to save to database
9. Returns result back through IPC to renderer
10. UI updates with new wallet

## Key Technologies

### Wallet Generation
- **BIP39 Mnemonic**: Standard 12/24 word seed phrases
- **HD Derivation**: `m/44'/60'/0'/0/n` (Ethereum standard)
- **ethers.js v6**: Modern cryptographic operations

### Encryption
- **AES-256**: Encrypts private keys and mnemonics
- **CryptoJS**: Cross-browser compatible encryption
- **SHA-256**: Password hashing

### Database
- **BetterSQLite3**: Synchronous SQLite3 binding
- **WAL Mode**: Write-ahead logging for better concurrency
- **7 Tables**: Wallets, Mnemonics, RPC Endpoints, Transactions, Activity Logs, Settings

### Transaction Queue
- **Status Tracking**: pending, queued, failed, cancelled, confirmed
- **Pause/Resume**: Control execution flow
- **Batch Processing**: Multiple recipients
- **Retry Logic**: Configurable retry attempts

## API Reference

### Window APIs (Preload)

#### Wallet API
```javascript
window.walletAPI.generateMnemonic()              // Generate new mnemonic
window.walletAPI.importMnemonic(m, pwd)         // Import existing mnemonic
window.walletAPI.exportMnemonic(pwd)            // Export mnemonic
window.walletAPI.generateWallet(index)          // Generate wallet from mnemonic
window.walletAPI.getAll()                       // Get all wallets
window.walletAPI.updateLabel(address, label)    // Update wallet label
window.walletAPI.delete(address)                // Delete wallet
```

#### Blockchain API
```javascript
window.blockchainAPI.getBalance(address, rpcUrl)        // Get wallet balance
window.blockchainAPI.getNonce(address, rpcUrl)          // Get transaction nonce
window.blockchainAPI.estimateGas(from, to, value, url)  // Estimate gas
window.blockchainAPI.getGasPrice(rpcUrl)                // Get current gas price
window.blockchainAPI.syncWallets(rpcUrl)                // Sync all wallets
```

#### Transaction API
```javascript
window.transactionAPI.queueBatchTransfer(from, recipients, gasPrice, chainId)
window.transactionAPI.getQueue()                // Get queue status
window.transactionAPI.executeQueue(pwd, url)   // Execute queued transactions
window.transactionAPI.pauseQueue()              // Pause execution
window.transactionAPI.resumeQueue()             // Resume execution
window.transactionAPI.cancelQueue()             // Cancel all pending
window.transactionAPI.getHistory()              // Get transaction history
```

#### Settings API
```javascript
window.settingsAPI.getRpcEndpoints()            // Get all RPC endpoints
window.settingsAPI.addRpcEndpoint(rpc)          // Add new RPC endpoint
window.settingsAPI.updateRpcEndpoint(id, rpc)   // Update RPC endpoint
window.settingsAPI.deleteRpcEndpoint(id)        // Delete RPC endpoint
window.settingsAPI.getSetting(key, default)     // Get setting
window.settingsAPI.setSetting(key, value)       // Set setting
```

#### Activity Log API
```javascript
window.activityLogAPI.get()                     // Get recent logs
window.activityLogAPI.getByType(type)           // Filter by type
```

## Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn
- Windows/macOS/Linux

### Installation

```bash
# Clone repository
git clone <repo-url>
cd DorianMintBotV2

# Install dependencies
npm install
```

### Development

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron
electron .

# Or use combined command:
npm run electron:dev
```

### Build

```bash
# Build and create installer
npm run electron:build

# Output in ./release directory
```

## Database Schema

### Wallets Table
```sql
CREATE TABLE wallets (
  id INTEGER PRIMARY KEY,
  address TEXT UNIQUE NOT NULL,
  publicKey TEXT,
  encryptedPrivateKey TEXT,
  label TEXT,
  derivationPath TEXT,
  index INTEGER,
  balance TEXT,
  nonce INTEGER,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Mnemonics Table
```sql
CREATE TABLE mnemonics (
  id INTEGER PRIMARY KEY,
  encryptedMnemonic TEXT,
  hashedPassword TEXT,
  createdAt DATETIME
);
```

### RPC Endpoints Table
```sql
CREATE TABLE rpc_endpoints (
  id INTEGER PRIMARY KEY,
  chainId INTEGER,
  name TEXT,
  url TEXT UNIQUE,
  isActive INTEGER,
  priority INTEGER,
  createdAt DATETIME
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  transactionHash TEXT UNIQUE,
  fromAddress TEXT,
  toAddress TEXT,
  value TEXT,
  gasPrice TEXT,
  gasLimit TEXT,
  nonce INTEGER,
  status TEXT,
  chainId INTEGER,
  createdAt DATETIME,
  sentAt DATETIME,
  confirmedAt DATETIME
);
```

### Activity Logs Table
```sql
CREATE TABLE activity_logs (
  id INTEGER PRIMARY KEY,
  type TEXT,
  action TEXT,
  details TEXT,
  status TEXT,
  createdAt DATETIME
);
```

## Common Tasks

### Add New RPC Endpoint

1. User goes to "RPC Settings" tab
2. Fills in Name, URL, Chain ID, Priority
3. Clicks "Add RPC"
4. Calls `window.settingsAPI.addRpcEndpoint(rpc)`
5. Stored in database
6. Used for blockchain operations

### Generate and Manage Wallets

1. Go to "Mnemonic" tab
2. Click "Generate New Mnemonic" or paste existing
3. Set password (for encryption)
4. Go to "Wallets" tab
5. Click "Generate Wallet" to create from mnemonic
6. Can generate multiple wallets (auto-incremented derivation index)
7. Each wallet encrypted and stored

### Batch Transfer ETH

1. Go to "Batch Transfer" tab
2. Select sender wallet address
3. Set gas price
4. List recipients (address,amount format)
5. Click "Queue Transfers"
6. Enter password and RPC URL
7. Click "Execute Queue"
8. Can pause/resume/cancel
9. All logged in Activity Log

## Troubleshooting

### Application won't start
- Check `npm install` completed successfully
- Verify Node.js version >= 16
- Check database path permissions
- Review console for errors

### Database errors
- Ensure database directory is writable
- Check database file isn't locked by another process
- Delete `.db` file to reset (loses data)

### RPC connection issues
- Verify RPC endpoint URL is correct
- Check internet connectivity
- Ensure chain ID matches RPC endpoint
- Try different RPC provider

### Transaction failures
- Verify wallet has sufficient balance
- Check gas price isn't too low
- Ensure nonce is correct
- Review transaction logs

## Performance Optimization

- Database uses WAL mode for better concurrency
- Batch queries where possible
- Caching for RPC endpoints and settings
- Lazy loading of components
- Efficient state management with contexts

## Security Considerations

1. **Private Keys**: Never exposed to renderer process
2. **Encryption**: All sensitive data encrypted with AES-256
3. **Passwords**: Hashed with SHA-256, never stored
4. **IPC Security**: Only essential APIs exposed
5. **Sandbox**: Disabled to allow native modules (consider enabling in production)
6. **Context Isolation**: Enabled for security

## Contributing

1. Create feature branch
2. Make changes
3. Run `npm run lint` to fix formatting
4. Test thoroughly
5. Commit with clear messages
6. Push and create PR

## License

MIT
