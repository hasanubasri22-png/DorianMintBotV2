import { JobStatus } from "@/constants/job";

export class JobManager {

    constructor() {

        this.waiting = new Map();

        this.running = new Map();

        this.success = new Map();

        this.failed = new Map();

    }

    add(job) {

        job.status = JobStatus.WAITING;

        this.waiting.set(job.id, job);

    }

    start(job) {

        this.waiting.delete(job.id);

        job.status = JobStatus.RUNNING;

        job.startedAt = Date.now();

        this.running.set(job.id, job);

    }

    successJob(job) {

        this.running.delete(job.id);

        job.status = JobStatus.SUCCESS;

        job.finishedAt = Date.now();

        this.success.set(job.id, job);

    }

    failedJob(job, error = null) {

        this.running.delete(job.id);

        job.status = JobStatus.FAILED;

        job.error = error;

        job.finishedAt = Date.now();

        this.failed.set(job.id, job);

    }

    stats() {

        return {

            waiting: this.waiting.size,

            running: this.running.size,

            success: this.success.size,

            failed: this.failed.size

        };

    }

    clear() {

        this.waiting.clear();

        this.running.clear();

        this.success.clear();

        this.failed.clear();

    }

}

export default JobManager;