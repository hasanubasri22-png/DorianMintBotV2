import Engine from "../core/engine";
import WorkerEngine from "./worker.engine";

export class WorkerPool extends Engine {

    constructor(queue, size = 5) {

        super("WorkerPool");

        this.queue = queue;

        this.size = size;

        this.workers = [];

        for (let i = 0; i < size; i++) {

            this.workers.push(

                new WorkerEngine(i + 1, queue)

            );

        }

    }

    async start(handler) {

        this.running = true;

        while (this.running) {

            const idle = this.workers.filter(

                worker => !worker.isBusy()

            );

            await Promise.all(

                idle.map(worker =>

                    worker.run(handler)

                )

            );

            if (

                this.queue.size() === 0 &&

                this.workers.every(

                    worker => !worker.isBusy()

                )

            ) {

                break;

            }

            await new Promise(

                resolve =>

                    setTimeout(resolve, 10)

            );

        }

    }

    async stop() {

        this.running = false;

    }

}