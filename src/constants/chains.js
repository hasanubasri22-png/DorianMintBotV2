export const ETHEREUM_MAINNET = 1;
export const ETHEREUM_SEPOLIA = 11155111;
export const POLYGON_MAINNET = 137;
export const POLYGON_MUMBAI = 80001;

export const CHAIN_NAMES = {
  1: 'Ethereum Mainnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon Mainnet',
  80001: 'Polygon Mumbai'
};

export const DEFAULT_RPC_ENDPOINTS = [
  {
    chainId: 1,
    name: 'Infura Mainnet',
    url: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    isActive: 1,
    priority: 10
  },
  {
    chainId: 11155111,
    name: 'Infura Sepolia',
    url: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
    isActive: 1,
    priority: 9
  },
  {
    chainId: 137,
    name: 'Polygon RPC',
    url: 'https://polygon-rpc.com',
    isActive: 1,
    priority: 8
  }
];
