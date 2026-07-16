import Deque from "./deque";

export class QueueStorage {

    constructor() {

        this.items = new Map();

        this.queue = new Deque();

    }

    add(item) {

        this.items.set(

            item.id,

            item

        );

        this.queue.push(

            item.id

        );

    }

    next() {

        const id = this.queue.shift();

        if (!id) {

            return null;

        }

        const item = this.items.get(id);

        this.items.delete(id);

        return item;

    }

    size() {

        return this.queue.size();

    }

    clear() {

        this.items.clear();

        this.queue.clear();

    }

}