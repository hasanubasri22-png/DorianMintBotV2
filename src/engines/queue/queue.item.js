import {

    QueuePriority,

    QueueStatus

} from "@/constants/queue";

export class QueueItem {

    constructor(data = {}) {

        this.id = crypto.randomUUID();

        this.priority = QueuePriority.NORMAL;

        this.status = QueueStatus.WAITING;

        this.retry = 0;

        this.createdAt = Date.now();

        this.startedAt = null;

        this.finishedAt = null;

        this.payload = null;

        Object.assign(this, data);

    }

}

export default QueueItem;