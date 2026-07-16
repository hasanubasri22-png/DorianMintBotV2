import { RpcPoolService } from "./rpcpool.service";

export class ChainService {

    constructor(rpcs = []) {

        this.rpcPool = new RpcPoolService(rpcs);

    }

    async connect() {

        return await this.rpcPool.connect();

    }

    async getProvider() {

        return this.rpcPool.getProvider().getProvider();

    }

    async getNetwork() {

        return await this.rpcPool.getProvider().getNetwork();

    }

    async getBlockNumber() {

        return await this.rpcPool.getProvider().getBlockNumber();

    }

    async getGasPrice() {

        return await this.rpcPool.getProvider().getGasPrice();

    }

    async getBalance(address) {

        return await this.rpcPool.getProvider().getBalance(address);

    }

    async getNonce(address) {

        return await this.rpcPool.getProvider().getNonce(address);

    }

    async nextRpc() {

        return await this.rpcPool.next();

    }

}