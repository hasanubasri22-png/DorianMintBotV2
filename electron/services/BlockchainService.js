import { ethers } from 'ethers';
import WalletRepository from '../database/WalletRepository.js';
import CryptoService from './CryptoService.js';

class BlockchainService {
  async getBalance(address, rpcUrl) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const balance = await provider.getBalance(address);
      return { balance: ethers.formatEther(balance), success: true };
    } catch (error) {
      console.error('Get balance error:', error);
      throw error;
    }
  }

  async getNonce(address, rpcUrl) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const nonce = await provider.getTransactionCount(address);
      return { nonce, success: true };
    } catch (error) {
      console.error('Get nonce error:', error);
      throw error;
    }
  }

  async estimateGas(fromAddress, toAddress, value, rpcUrl) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const tx = {
        from: fromAddress,
        to: toAddress,
        value: ethers.parseEther(value.toString())
      };
      const gasLimit = await provider.estimateGas(tx);
      return { gasLimit: gasLimit.toString(), success: true };
    } catch (error) {
      console.error('Estimate gas error:', error);
      throw error;
    }
  }

  async getGasPrice(rpcUrl) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const feeData = await provider.getFeeData();
      return {
        gasPrice: ethers.formatUnits(feeData.gasPrice, 'gwei'),
        maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, 'gwei') : null,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei') : null,
        success: true
      };
    } catch (error) {
      console.error('Get gas price error:', error);
      throw error;
    }
  }

  async syncWallets(rpcUrl) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const wallets = WalletRepository.getAll();
      const updates = [];

      for (const wallet of wallets) {
        try {
          const balance = await provider.getBalance(wallet.address);
          const nonce = await provider.getTransactionCount(wallet.address);

          WalletRepository.updateBalance(wallet.address, ethers.formatEther(balance));
          WalletRepository.updateNonce(wallet.address, nonce);

          updates.push({
            address: wallet.address,
            balance: ethers.formatEther(balance),
            nonce
          });
        } catch (error) {
          console.error(`Failed to sync wallet ${wallet.address}:`, error);
        }
      }

      return { updates, success: true };
    } catch (error) {
      console.error('Sync wallets error:', error);
      throw error;
    }
  }
}

export default new BlockchainService();