import { ProviderService } from "./provider.service";

export class RpcPoolService {

    constructor(rpcs = []) {

        this.rpcs = rpcs;

        this.currentIndex = 0;

        this.providers = this.rpcs.map(rpc => ({

            ...rpc,

            provider: new ProviderService(rpc.url)

        }));

    }

    getCurrent() {

        return this.providers[this.currentIndex];

    }

    getProvider() {

        return this.getCurrent().provider;

    }

    async connect() {

        return this.getProvider().connect();

    }

    async next() {

        this.currentIndex++;

        if (this.currentIndex >= this.providers.length) {

            this.currentIndex = 0;

        }

        return this.connect();

    }

    async healthCheck() {

        const alive = [];

        for (const rpc of this.providers) {

            try {

                rpc.provider.connect();

                await rpc.provider.getBlockNumber();

                alive.push(rpc);

            }

            catch {

            }

        }

        this.providers = alive;

        if (this.currentIndex >= this.providers.length) {

            this.currentIndex = 0;

        }

        return alive.length;

    }

}