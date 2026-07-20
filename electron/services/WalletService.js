import { ethers } from 'ethers';
import WalletRepository from '../database/WalletRepository.js';
import CryptoService from './CryptoService.js';
import ActivityLogService from './ActivityLogService.js';

class WalletService {
  generateMnemonic() {
    try {
      const mnemonic = ethers.Mnemonic.entropyToMnemonic(ethers.getRandomValues(new Uint8Array(16)));
      ActivityLogService.log('wallet', 'Generated new mnemonic', null, 'success');
      return { mnemonic, success: true };
    } catch (error) {
      console.error('Generate mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to generate mnemonic', error.message, 'error');
      throw error;
    }
  }

  importMnemonic(mnemonic, password) {
    try {
      const hashedPassword = CryptoService.hashPassword(password);
      const encryptedMnemonic = CryptoService.encryptAES256(mnemonic, password);
      WalletRepository.create({
        address: 'mnemonic',
        encryptedMnemonic,
        hashedPassword
      });
      ActivityLogService.log('wallet', 'Imported mnemonic', null, 'success');
      return { success: true };
    } catch (error) {
      console.error('Import mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to import mnemonic', error.message, 'error');
      throw error;
    }
  }

  exportMnemonic(password) {
    try {
      const mnemonicRecord = WalletRepository.get('SELECT * FROM mnemonics LIMIT 1');
      if (!mnemonicRecord) {
        throw new Error('No mnemonic found');
      }
      if (!CryptoService.verifyPassword(password, mnemonicRecord.hashedPassword)) {
        throw new Error('Invalid password');
      }
      const mnemonic = CryptoService.decryptAES256(mnemonicRecord.encryptedMnemonic, password);
      ActivityLogService.log('wallet', 'Exported mnemonic', null, 'success');
      return { mnemonic, success: true };
    } catch (error) {
      console.error('Export mnemonic error:', error);
      ActivityLogService.log('wallet', 'Failed to export mnemonic', error.message, 'error');
      throw error;
    }
  }

  generateWallet(index) {
    try {
      const mnemonicRecord = WalletRepository.get('SELECT * FROM mnemonics LIMIT 1');
      if (!mnemonicRecord) {
        throw new Error('No mnemonic found');
      }
      
      // Decrypt the mnemonic first
      const decryptedMnemonic = CryptoService.decryptAES256(mnemonicRecord.encryptedMnemonic, 'default');
      const mnemonic = ethers.Mnemonic.fromPhrase(decryptedMnemonic);
      const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);
      const wallet = new ethers.Wallet(hdNode.privateKey);

      WalletRepository.create({
        address: wallet.address,
        publicKey: wallet.publicKey,
        encryptedPrivateKey: CryptoService.encryptAES256(wallet.privateKey, 'default'),
        label: `Wallet ${index}`,
        derivationPath: `m/44'/60'/0'/0/${index}`,
        index: index,
        balance: '0',
        nonce: 0
      });

      ActivityLogService.log('wallet', `Generated wallet at index ${index}`, null, 'success');
      return { address: wallet.address, success: true };
    } catch (error) {
      console.error('Generate wallet error:', error);
      ActivityLogService.log('wallet', 'Failed to generate wallet', error.message, 'error');
      throw error;
    }
  }

  getAll() {
    try {
      return WalletRepository.getAll();
    } catch (error) {
      console.error('Get all wallets error:', error);
      throw error;
    }
  }

  updateLabel(address, label) {
    try {
      const wallet = WalletRepository.getByAddress(address);
      if (!wallet) {
        throw new Error(`Wallet ${address} not found`);
      }
      wallet.label = label;
      WalletRepository.update(wallet.id, wallet);
      ActivityLogService.log('wallet', `Updated label for ${address}`, null, 'success');
      return { success: true };
    } catch (error) {
      console.error('Update label error:', error);
      ActivityLogService.log('wallet', 'Failed to update label', error.message, 'error');
      throw error;
    }
  }

  deleteWallet(address) {
    try {
      const wallet = WalletRepository.getByAddress(address);
      if (!wallet) {
        throw new Error(`Wallet ${address} not found`);
      }
      WalletRepository.delete(wallet.id);
      ActivityLogService.log('wallet', `Deleted wallet ${address}`, null, 'success');
      return { success: true };
    } catch (error) {
      console.error('Delete wallet error:', error);
      ActivityLogService.log('wallet', 'Failed to delete wallet', error.message, 'error');
      throw error;
    }
  }
}

export default new WalletService();
