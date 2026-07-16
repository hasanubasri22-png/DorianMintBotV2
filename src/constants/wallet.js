export const DEFAULT_WALLET = {
    privateKey: "",
    address: "",
    balance: "0",
    nonce: 0,
    status: "Waiting",
    txHash: "",
    error: null,
    worker: null,
    rpc: null,
    selected: true,
};

export const WALLET_LIMIT = 1000;

export default {
    DEFAULT_WALLET,
    WALLET_LIMIT,
};