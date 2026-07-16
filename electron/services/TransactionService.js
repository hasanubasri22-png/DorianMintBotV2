import TransactionRepository from '../database/TransactionRepository.js';
import WalletRepository from '../database/WalletRepository.js';
import CryptoService from './CryptoService.js';
import { ethers } from 'ethers';
import ActivityLogService from './ActivityLogService.js';

class TransactionService {
  constructor() {
    this.queue = [];
    this.isExecuting = false;
    this.isPaused = false;
  }

  queueBatchTransfer(fromAddress, recipients, gasPrice, chainId) {
    try {
      const transactions = recipients.map(recipient => ({
        fromAddress,
        toAddress: recipient.address,
        value: recipient.amount,
        gasPrice,
        chainId,
        status: 'queued'
      }));

      const savedTransactions = [];
      for (const tx of transactions) {
        const result = TransactionRepository.create(tx);
        savedTransactions.push(result);
      }

      this.queue.push(...savedTransactions);
      ActivityLogService.log('transaction', `Queued ${recipients.length} transactions`, null, 'success');
      return { count: recipients.length, success: true };
    } catch (error) {
      console.error('Queue batch transfer error:', error);
      ActivityLogService.log('transaction', 'Failed to queue transactions', error.message, 'error');
      throw error;
    }
  }

  getQueue() {
    try {
      const pending = TransactionRepository.getByStatus('pending');
      const queued = TransactionRepository.getByStatus('queued');
      return { pending: pending.length, queued: queued.length, total: pending.length + queued.length, success: true };
    } catch (error) {
      console.error('Get queue error:', error);
      throw error;
    }
  }

  async executeQueue(password, rpcUrl) {
    try {
      if (this.isExecuting) {
        throw new Error('Queue is already executing');
      }

      this.isExecuting = true;
      this.isPaused = false;
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const queued = TransactionRepository.getByStatus('queued');
      const results = [];

      for (const tx of queued) {
        if (this.isPaused) {
          break;
        }

        try {
          const wallet = WalletRepository.getByAddress(tx.fromAddress);
          if (!wallet) throw new Error(`Wallet ${tx.fromAddress} not found`);

          // Get private key - would need to decrypt here
          const nonce = await provider.getTransactionCount(tx.fromAddress);

          const txData = {
            to: tx.toAddress,
            value: ethers.parseEther(tx.value),
            gasPrice: ethers.parseUnits(tx.gasPrice, 'gwei'),
            nonce
          };

          // Update status to pending
          TransactionRepository.updateStatus(tx.id, 'pending');
          results.push({ id: tx.id, status: 'pending' });
        } catch (error) {
          console.error(`Failed to execute transaction ${tx.id}:`, error);
          TransactionRepository.updateStatus(tx.id, 'failed');
          results.push({ id: tx.id, status: 'failed', error: error.message });
        }
      }

      this.isExecuting = false;
      ActivityLogService.log('transaction', `Executed queue with ${results.length} transactions`, null, 'success');
      return { results, success: true };
    } catch (error) {
      console.error('Execute queue error:', error);
      this.isExecuting = false;
      throw error;
    }
  }

  pauseQueue() {
    try {
      this.isPaused = true;
      ActivityLogService.log('transaction', 'Queue paused', null, 'success');
      return { success: true };
    } catch (error) {
      console.error('Pause queue error:', error);
      throw error;
    }
  }

  resumeQueue() {
    try {
      this.isPaused = false;
      ActivityLogService.log('transaction', 'Queue resumed', null, 'success');
      return { success: true };
    } catch (error) {
      console.error('Resume queue error:', error);
      throw error;
    }
  }

  cancelQueue() {
    try {
      const queued = TransactionRepository.getByStatus('queued');
      for (const tx of queued) {
        TransactionRepository.updateStatus(tx.id, 'cancelled');
      }
      this.isPaused = false;
      this.isExecuting = false;
      ActivityLogService.log('transaction', `Cancelled ${queued.length} transactions`, null, 'success');
      return { cancelled: queued.length, success: true };
    } catch (error) {
      console.error('Cancel queue error:', error);
      throw error;
    }
  }

  getHistory() {
    try {
      const all = TransactionRepository.getAll();
      return all;
    } catch (error) {
      console.error('Get history error:', error);
      throw error;
    }
  }
}

export default new TransactionService();