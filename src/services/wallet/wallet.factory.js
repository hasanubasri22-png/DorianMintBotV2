import { DEFAULT_WALLET } from "@/constants/wallet";

export function createWallet(data = {}) {
    return {
        id: crypto.randomUUID(),
        ...DEFAULT_WALLET,
        ...data,
    };
}

export function createWalletList(wallets = []) {
    return wallets.map(createWallet);
}