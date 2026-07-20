# Dorian Mint Bot V2

HD Wallet Manager & Batch Transaction Tool - Production-Ready Electron + React Application

## Features

- **HD Wallet Management**
  - Generate wallets from BIP39 mnemonic
  - Import/export encrypted mnemonics
  - Support for up to 1000 managed wallets
  - AES-256 encryption for private keys
  - Display address, balance, nonce for each wallet

- **Batch Transactions**
  - Queue batch ETH transfers
  - Multi-RPC support
  - Transaction queue management
  - Pause, resume, and cancel functionality
  - Gas estimation with EIP-1559 support

- **Blockchain Integration**
  - Real-time wallet sync
  - Balance and nonce tracking
  - Gas price estimation
  - Multiple RPC endpoint support

- **Activity Logging**
  - Comprehensive transaction logging
  - Filter by type and status
  - Real-time updates

## Architecture

```
src/
├── components/        # React UI components
├── context/          # React context providers
├── constants/        # Application constants
├── utils/           # Utility functions
├── App.jsx          # Main application component
├── main.jsx         # React entry point
└── index.css        # Tailwind CSS

electron/
├── database/        # Database layer (BetterSQLite3)
├── services/        # Business logic services
├── ipc/            # Electron IPC handlers
├── main.js         # Electron main process
└── preload.js      # Electron preload script
```

## Installation

```bash
npm install
```

## Development

```bash
# Start Vite dev server and Electron together
npm run electron:dev

# Or separately:
npm run dev        # Vite dev server
electron .         # Electron app
```

## Building

```bash
npm run electron:build
```

## Linting

```bash
npm run lint        # Fix linting issues
npm run lint:check  # Check for issues
```

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Desktop**: Electron 43
- **Backend**: Node.js with native modules
- **Database**: BetterSQLite3
- **Crypto**: ethers.js v6, crypto-js, bip39
- **Build**: Vite, Electron Builder

## Security

- Context isolation enabled
- Sandbox disabled (required for native modules)
- AES-256 encryption for sensitive data
- IPC-based database access
- Private keys never exposed to renderer process

## License

MIT
