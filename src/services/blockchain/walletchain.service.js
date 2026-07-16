import { ChainService } from "./chain.service";

export class WalletChainService {

    constructor(chain) {

        this.chain = chain;

    }

    async getBalance(address) {

        return await this.chain.getBalance(address);

    }

    async getNonce(address) {

        return await this.chain.getNonce(address);

    }

    async getGasPrice() {

        return await this.chain.getGasPrice();

    }

    async getNetwork() {

        return await this.chain.getNetwork();

    }

}