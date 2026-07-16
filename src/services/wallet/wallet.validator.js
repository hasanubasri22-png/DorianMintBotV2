import { ethers } from "ethers";

export function isValidPrivateKey(privateKey) {
    try {
        new ethers.Wallet(privateKey);
        return true;
    } catch {
        return false;
    }
}

export function isValidAddress(address) {
    return ethers.isAddress(address);
}

export default {
    isValidPrivateKey,
    isValidAddress,
};