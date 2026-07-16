import {
    Contract,
    Wallet,
    parseEther
} from "ethers";

import { getProvider } from "./rpcService";

export async function mint({

    privateKey,

    contractAddress,

    abi,

    functionName,

    value,

    args = []

}) {

    const provider = getProvider();

    const wallet = new Wallet(

        privateKey,

        provider

    );

    const contract = new Contract(

        contractAddress,

        abi,

        wallet

    );

    const tx = await contract[functionName](

        ...args,

        {

            value: parseEther(value)

        }

    );

    return tx;

}