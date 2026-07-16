import Engine from "../core/engine";

export class WorkerEngine extends Engine {

    constructor(id, queue) {

        super(`Worker-${id}`);

        this.id = id;

        this.queue = queue;

        this.busy = false;

        this.currentJob = null;

    }

    isBusy() {

        return this.busy;

    }

    async run(handler) {

        if (this.busy) {

            return;
        }

        const job = this.queue.storage.next();

        if (!job) {

            return;
        }

        this.busy = true;

        this.currentJob = job;

        this.queue.jobs.start(job);

        try {

            await handler(job);

            this.queue.jobs.successJob(job);

        }

        catch (error) {

            this.queue.jobs.failedJob(job, error);

        }

        this.currentJob = null;

        this.busy = false;

    }

}