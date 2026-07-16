import {
    JsonRpcProvider,
    formatUnits
} from "ethers";

/**
 * Membuat provider dari RPC URL
 */
export function getProvider(rpcUrl) {

    if (!rpcUrl) {

        throw new Error("RPC URL belum diisi.");

    }

    return new JsonRpcProvider(rpcUrl);

}

/**
 * Mengecek koneksi RPC
 */
export async function checkRPC(rpcUrl) {

    try {

        const provider = getProvider(rpcUrl);

        const network = await provider.getNetwork();

        const latestBlock = await provider.getBlockNumber();

        const feeData = await provider.getFeeData();

        return {

            success: true,

            chainId: Number(network.chainId),

            network: network.name,

            latestBlock,

            gasPrice: feeData.gasPrice
                ? formatUnits(feeData.gasPrice, "gwei")
                : null,

            maxFeePerGas: feeData.maxFeePerGas
                ? formatUnits(feeData.maxFeePerGas, "gwei")
                : null,

            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
                ? formatUnits(
                    feeData.maxPriorityFeePerGas,
                    "gwei"
                )
                : null

        };

    }

    catch (err) {

        return {

            success: false,

            error: err.message

        };

    }

}

/**
 * Mendapatkan block terbaru
 */
export async function getLatestBlock(rpcUrl) {

    const provider = getProvider(rpcUrl);

    return await provider.getBlockNumber();

}

/**
 * Mendapatkan fee data
 */
export async function getGasData(rpcUrl) {

    const provider = getProvider(rpcUrl);

    const feeData = await provider.getFeeData();

    return {

        gasPrice: feeData.gasPrice,

        maxFeePerGas: feeData.maxFeePerGas,

        maxPriorityFeePerGas:
            feeData.maxPriorityFeePerGas

    };

}

/**
 * Mendapatkan informasi network
 */
export async function getNetwork(rpcUrl) {

    const provider = getProvider(rpcUrl);

    return await provider.getNetwork();

}

export default {

    getProvider,

    checkRPC,

    getLatestBlock,

    getGasData,

    getNetwork

};