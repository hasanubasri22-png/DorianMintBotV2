import CryptoJS from 'crypto-js';
import { randomBytes } from 'node:crypto';

class CryptoService {
  static encryptAES256(plaintext, password) {
    try {
      const encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();
      return encrypted;
    } catch (error) {
      console.error('AES256 encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  static decryptAES256(ciphertext, password) {
    try {
      const decrypted = CryptoJS.AES.decrypt(ciphertext, password);
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      return plaintext;
    } catch (error) {
      console.error('AES256 decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  static hashPassword(password) {
    try {
      const hashed = CryptoJS.SHA256(password).toString();
      return hashed;
    } catch (error) {
      console.error('Password hashing error:', error);
      throw new Error('Failed to hash password');
    }
  }

  static verifyPassword(password, hash) {
    try {
      const newHash = CryptoJS.SHA256(password).toString();
      return newHash === hash;
    } catch (error) {
      console.error('Password verification error:', error);
      throw new Error('Failed to verify password');
    }
  }

  static generateRandomHex(length = 32) {
    return randomBytes(length).toString('hex');
  }
}

export default CryptoService;