# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-07-20

### Added

#### Core Features
- HD Wallet Manager with BIP39 support
- Generate multiple wallets from single mnemonic
- Import/export encrypted mnemonics
- AES-256 encryption for private keys
- Support for up to 1000 managed wallets

#### Blockchain Integration
- ethers.js v6 integration
- Multi-RPC endpoint support
- Real-time wallet synchronization
- Balance and nonce tracking
- Gas estimation with EIP-1559 support

#### Batch Operations
- Batch ETH transfers to multiple addresses
- Transaction queue management
- Pause, resume, and cancel functionality
- Progress tracking
- Comprehensive logging

#### User Interface
- Responsive React UI with Tailwind CSS
- Wallet Manager component
- Mnemonic Manager component
- Batch Transfer component
- RPC Manager component
- Activity Log component
- Collapsible sidebar navigation

#### Backend Services
- BetterSQLite3 database integration
- IPC-based database access
- Service layer architecture
- Repository pattern for data access
- Activity logging system

#### Security
- Electron context isolation enabled
- IPC-based security model
- AES-256 encryption for sensitive data
- SHA-256 password hashing
- Private key encryption

#### Development
- ESLint configuration
- Vite build setup
- Electron Builder configuration
- Development and production builds
- TypeScript configuration

### Technical Stack

- Frontend: React 19, Tailwind CSS 4, Lucide Icons
- Desktop: Electron 43
- Backend: Node.js
- Database: BetterSQLite3
- Crypto: ethers.js v6, crypto-js, bip39
- Build: Vite 8, Electron Builder 26
- Linting: ESLint 10

### Project Structure

#### Frontend Structure
```
src/
├── components/          # React UI components
├── context/            # React context providers
├── constants/          # Application constants
├── utils/             # Utility functions
├── App.jsx            # Main app component
├── main.jsx           # React entry point
└── index.css          # Tailwind styles
```

#### Backend Structure
```
electron/
├── database/          # Database repositories
├── services/          # Business logic services
├── ipc/              # IPC handlers
├── main.js           # Electron main process
└── preload.js        # Preload script
```

### Known Limitations

- Currently supports Ethereum and EVM-compatible chains
- Single mnemonic per instance
- No hardware wallet support yet
- Requires manual RPC endpoint configuration
- Transaction signing requires stored encrypted keys

### Future Roadmap

- [ ] Hardware wallet integration (Ledger, Trezor)
- [ ] Multiple mnemonic support
- [ ] Token transfer support
- [ ] DeFi integration
- [ ] Advanced transaction features (swaps, liquidity)
- [ ] Cloud backup for mnemonics
- [ ] Mobile companion app
- [ ] WebSocket provider support
- [ ] Transaction history export
- [ ] Custom gas settings UI

