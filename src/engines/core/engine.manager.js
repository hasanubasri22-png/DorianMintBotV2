export class EngineManager {

    constructor() {

        this.engines = new Map();

    }

    register(name, engine) {

        this.engines.set(name, engine);

    }

    unregister(name) {

        this.engines.delete(name);

    }

    get(name) {

        return this.engines.get(name);

    }

    has(name) {

        return this.engines.has(name);

    }

    async start(name, ...args) {

        const engine = this.get(name);

        if (!engine) {

            return false;

        }

        await engine.start(...args);

        return true;

    }

    async stop(name) {

        const engine = this.get(name);

        if (!engine) {

            return false;

        }

        await engine.stop();

        return true;

    }

    async stopAll() {

        for (const engine of this.engines.values()) {

            await engine.stop();

        }

    }

}

export default EngineManager;