# Dorian Mint Bot V2 - Quick Start Guide

## Installation

```bash
# Install dependencies
npm install
```

## Running in Development

### Option 1: Combined (Recommended)
```bash
npm run electron:dev
```

This starts both:
- Vite dev server on http://127.0.0.1:5173
- Electron app

### Option 2: Separate Terminals
```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron
npm run electron
```

## Building for Production

```bash
# Build and create installer
npm run electron:build

# Outputs to ./release directory
```

## Linting

```bash
# Fix linting issues
npm run lint

# Check for issues without fixing
npm run lint:check
```

## First Time Setup

1. **Generate Mnemonic**
   - Go to "Mnemonic" tab
   - Click "Generate New Mnemonic"
   - Copy and save mnemonic (12 or 24 words)
   - Set a strong password
   - Click "Generate New Mnemonic" to proceed

2. **Import Mnemonic** (if you have existing)
   - Go to "Mnemonic" tab
   - Switch to "Import" tab
   - Paste your mnemonic
   - Set password (min 8 characters)
   - Click "Import Mnemonic"

3. **Generate Wallets**
   - Go to "Wallets" tab
   - Click "Generate Wallet" to create from mnemonic
   - Repeat for each wallet needed (up to 1000)
   - Optional: Click edit button to add labels

4. **Configure RPC Endpoints**
   - Go to "RPC Settings" tab
   - Click "Add RPC" button
   - Enter RPC provider details:
     - Name: e.g., "Infura Mainnet"
     - URL: e.g., "https://mainnet.infura.io/v3/YOUR_KEY"
     - Chain ID: 1 for Ethereum, 137 for Polygon, etc.
     - Priority: Higher number = higher priority
   - Click "Add RPC"

5. **Perform Batch Transfers**
   - Go to "Batch Transfer" tab
   - Select sender address
   - Set gas price in Gwei
   - Enter recipients (format: address,amount per line)
   - Click "Queue Transfers"
   - Enter password and RPC URL
   - Click "Execute Queue"
   - Monitor progress in Activity Log

## Features

### Wallet Manager
- View all generated wallets
- Check balance and nonce
- Add/edit wallet labels
- Delete wallets
- Copy addresses to clipboard

### Mnemonic Manager
- Generate new BIP39 mnemonics (12/24 words)
- Import existing mnemonics with password protection
- Export mnemonics (with password verification)
- Automatic AES-256 encryption

### Batch Transfer
- Queue multiple transactions
- Set gas price and chain
- Execute, pause, resume, or cancel
- Real-time queue status
- Progress tracking

### RPC Manager
- Add multiple RPC endpoints
- Set priority for fallback
- Edit/delete endpoints
- Support all EVM-compatible chains

### Activity Log
- View all transactions and operations
- Filter by type (wallet, transaction, etc.)
- Filter by status (success, error, info, warning)
- Timestamp tracking

## Keyboard Shortcuts

- `F12`: Open Developer Tools
- `Ctrl+R` / `Cmd+R`: Reload app

## Support

For issues or questions:
1. Check DEVELOPMENT.md for detailed documentation
2. Review Activity Log for error messages
3. Check console (F12 → Console tab)

## Security Tips

✓ Never share your mnemonic
✓ Use a strong password (8+ characters)
✓ Keep backups of your mnemonic in secure location
✓ Don't use this with real funds until tested thoroughly
✓ Always verify RPC endpoint URLs
✓ Test with small amounts first
