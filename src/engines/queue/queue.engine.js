import Engine from "../core/engine";

import QueueItem from "./queue.item";
import { QueueStorage } from "./queue.storage";
import JobManager from "./job.manager";

export class QueueEngine extends Engine {

    constructor() {

        super("QueueEngine");

        this.storage = new QueueStorage();

        this.jobs = new JobManager();

        this.paused = false;

    }

    add(data) {

        const item =

            data instanceof QueueItem

                ? data

                : new QueueItem(data);

        this.storage.add(item);

        this.jobs.add(item);

        return item;

    }

    addMany(items = []) {

        return items.map(

            item => this.add(item)

        );

    }

    size() {

        return this.storage.size();

    }

    clear() {

        this.storage.clear();

        this.jobs.clear();

    }

    pause() {

        this.paused = true;

    }

    resume() {

        this.paused = false;

    }

    isPaused() {

        return this.paused;

    }

    stats() {

        return this.jobs.stats();

    }

}

export default QueueEngine;