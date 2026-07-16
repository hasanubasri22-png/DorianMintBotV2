import { ethers } from 'ethers';
import WalletRepository from '../database/WalletRepository.js';
import CryptoService from './CryptoService.js';
import ActivityLogService from './ActivityLogService.js';

class WalletService {
  constructor() {
    this.mnemonicPassword = null;
    this.derivationPath = "m/44'/60'/0'/0";
  }

  generateMnemonic() {
    try {
      const mnemonic = ethers.Mnemonic.entropyToPhrase(
        ethers.getRandomValues(new Uint8Array(16))
      );
      ActivityLogService.log('wallet', 'Mnemonic generated', null, 'success');
      return { mnemonic, success: true };
    } catch (error) {
      console.error('Generate mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to generate mnemonic', error.message, 'error');
      throw error;
    }
  }

  importMnemonic(mnemonic, password) {
    try {
      // Validate mnemonic
      ethers.Mnemonic.fromPhrase(mnemonic);

      this.mnemonicPassword = password;
      const encryptedMnemonic = CryptoService.encryptAES256(mnemonic, password);
      const hashedPassword = CryptoService.hashPassword(password);

      // Store encrypted mnemonic
      const mnemonicRepo = require('../database/MnemonicRepository.js').default;
      mnemonicRepo.create(encryptedMnemonic, hashedPassword);

      ActivityLogService.log('wallet', 'Mnemonic imported successfully', null, 'success');
      return { success: true, message: 'Mnemonic imported successfully' };
    } catch (error) {
      console.error('Import mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to import mnemonic', error.message, 'error');
      throw error;
    }
  }

  exportMnemonic(password) {
    try {
      const mnemonicRepo = require('../database/MnemonicRepository.js').default;
      const stored = mnemonicRepo.get();

      if (!stored) {
        throw new Error('No mnemonic found');
      }

      // Verify password
      if (!CryptoService.verifyPassword(password, stored.hashedPassword)) {
        throw new Error('Invalid password');
      }

      const mnemonic = CryptoService.decryptAES256(stored.encryptedMnemonic, password);
      ActivityLogService.log('wallet', 'Mnemonic exported', null, 'success');
      return { mnemonic, success: true };
    } catch (error) {
      console.error('Export mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to export mnemonic', error.message, 'error');
      throw error;
    }
  }

  generateWallet(index = 0) {
    try {
      const mnemonicRepo = require('../database/MnemonicRepository.js').default;
      if (!this.mnemonicPassword) {
        throw new Error('Mnemonic not initialized. Import or generate mnemonic first.');
      }

      const stored = mnemonicRepo.get();
      if (!stored) {
        throw new Error('No mnemonic found');
      }

      const mnemonic = CryptoService.decryptAES256(stored.encryptedMnemonic, this.mnemonicPassword);
      const hdNode = ethers.HDNodeWallet.fromMnemonic(
        ethers.Mnemonic.fromPhrase(mnemonic),
        `${this.derivationPath}/${index}`
      );

      const wallet = {
        address: hdNode.address,
        publicKey: hdNode.publicKey,
        encryptedPrivateKey: CryptoService.encryptAES256(hdNode.privateKey, this.mnemonicPassword),
        derivationPath: `${this.derivationPath}/${index}`,
        index,
        balance: '0',
        nonce: 0
      };

      WalletRepository.create(wallet);
      ActivityLogService.log('wallet', `Wallet generated at index ${index}`, wallet.address, 'success');
      return { ...wallet, privateKey: undefined, success: true };
    } catch (error) {
      console.error('Generate wallet error:', error);
      ActivityLogService.log('wallet', 'Failed to generate wallet', error.message, 'error');
      throw error;
    }
  }

  getAll() {
    try {
      const wallets = WalletRepository.getAll();
      return wallets.map(w => ({
        ...w,
        encryptedPrivateKey: undefined
      }));
    } catch (error) {
      console.error('Get wallets error:', error);
      throw error;
    }
  }

  updateLabel(address, label) {
    try {
      const wallet = WalletRepository.getByAddress(address);
      if (!wallet) throw new Error('Wallet not found');

      wallet.label = label;
      WalletRepository.update(wallet.id, wallet);
      ActivityLogService.log('wallet', 'Wallet label updated', address, 'success');
      return { success: true };
    } catch (error) {
      console.error('Update label error:', error);
      throw error;
    }
  }

  deleteWallet(address) {
    try {
      const wallet = WalletRepository.getByAddress(address);
      if (!wallet) throw new Error('Wallet not found');

      WalletRepository.delete(wallet.id);
      ActivityLogService.log('wallet', 'Wallet deleted', address, 'success');
      return { success: true };
    } catch (error) {
      console.error('Delete wallet error:', error);
      throw error;
    }
  }
}

export default new WalletService();