import { ethers } from "ethers";

export class ProviderService {

    constructor(rpc = "") {

        this.rpc = rpc;

        this.provider = null;

    }

    connect(rpc = this.rpc) {

        this.rpc = rpc;

        this.provider = new ethers.JsonRpcProvider(rpc);

        return this.provider;

    }

    getProvider() {

        if (!this.provider) {

            throw new Error("Provider belum dibuat.");

        }

        return this.provider;

    }

    async getBlockNumber() {

        return await this.getProvider().getBlockNumber();

    }

    async getGasPrice() {

        return await this.getProvider().getFeeData();

    }

    async getBalance(address) {

        return await this.getProvider().getBalance(address);

    }

    async getNonce(address) {

        return await this.getProvider().getTransactionCount(address);

    }

    async getNetwork() {

        return await this.getProvider().getNetwork();

    }

}

export default ProviderService;