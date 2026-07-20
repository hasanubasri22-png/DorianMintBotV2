import CryptoJS from 'crypto-js';
import { randomBytes } from 'node:crypto';

class CryptoService {
  static encryptAES256(plaintext, password) {
    try {
      if (!plaintext || !password) {
        throw new Error('Plaintext and password are required for encryption');
      }
      const encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();
      if (!encrypted) {
        throw new Error('Encryption returned empty result');
      }
      return encrypted;
    } catch (error) {
      console.error('AES256 encryption error:', error);
      throw new Error(`Failed to encrypt data: ${error.message}`);
    }
  }

  static decryptAES256(ciphertext, password) {
    try {
      if (!ciphertext || !password) {
        throw new Error('Ciphertext and password are required for decryption');
      }
      const decrypted = CryptoJS.AES.decrypt(ciphertext, password);
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      if (!plaintext) {
        throw new Error('Decryption returned empty result');
      }
      return plaintext;
    } catch (error) {
      console.error('AES256 decryption error:', error);
      throw new Error(`Failed to decrypt data: ${error.message}`);
    }
  }

  static hashPassword(password) {
    try {
      if (!password) {
        throw new Error('Password is required for hashing');
      }
      const hashed = CryptoJS.SHA256(password).toString();
      if (!hashed) {
        throw new Error('Hashing returned empty result');
      }
      return hashed;
    } catch (error) {
      console.error('Password hashing error:', error);
      throw new Error(`Failed to hash password: ${error.message}`);
    }
  }

  static verifyPassword(password, hash) {
    try {
      if (!password || !hash) {
        throw new Error('Password and hash are required for verification');
      }
      const newHash = CryptoJS.SHA256(password).toString();
      return newHash === hash;
    } catch (error) {
      console.error('Password verification error:', error);
      throw new Error(`Failed to verify password: ${error.message}`);
    }
  }

  static generateRandomHex(length = 32) {
    return randomBytes(length).toString('hex');
  }
}

export default CryptoService;