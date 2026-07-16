export const CREATE_WALLET_TABLE = `

CREATE TABLE IF NOT EXISTS wallets (

    id TEXT PRIMARY KEY,

    privateKey TEXT NOT NULL,

    address TEXT NOT NULL,

    balance TEXT,

    nonce INTEGER,

    status TEXT,

    txHash TEXT,

    error TEXT,

    worker TEXT,

    rpc TEXT,

    selected INTEGER,

    createdAt TEXT,

    updatedAt TEXT

);

`;

export default CREATE_WALLET_TABLE;