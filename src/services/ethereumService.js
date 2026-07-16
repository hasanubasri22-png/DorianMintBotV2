import { provider } from "../config/ethereum";
import { formatEther } from "ethers";

export async function getWalletInfo(address) {

    try {

        const balance = await provider.getBalance(address);
        const nonce = await provider.getTransactionCount(address);

        return {
            balance: Number(formatEther(balance)).toFixed(4),
            nonce,
            status: Number(formatEther(balance)) > 0
                ? "Ready"
                : "Low Balance"
        };

    } catch (err) {

        return {
            balance: "-",
            nonce: "-",
            status: "RPC Error"
        };

    }

}