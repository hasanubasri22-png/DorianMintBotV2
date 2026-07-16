export const defaultMintConfig = {

    /* ===========================
       NETWORK
    =========================== */

    rpc: "",

    chainId: 1,

    network: "Ethereum",

    /* ===========================
       CONTRACT
    =========================== */

    contract: "",

    abi: [],

    functionName: "",

    /* ===========================
       FUNCTION PARAMETERS
    =========================== */

    mintArguments: {},

    customValue: null,

    /* ===========================
       MINT
    =========================== */

    price: "0",

    quantity: 1,

    /* ===========================
       GAS
    =========================== */

    gasLimit: 250000,

    autoEstimateGas: true,

    maxFee: 30,

    priorityFee: 2,

    /* ===========================
       EXECUTION
    =========================== */

    delay: 300,

    retry: 0,

    timeout: 30000,

    waitForReceipt: true,

    /* ===========================
       WALLET
    =========================== */

    useMultiWallet: true,

    stopOnError: false

};

export default defaultMintConfig;