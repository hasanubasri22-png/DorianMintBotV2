export class Deque {

    constructor() {

        this.items = {};

        this.head = 0;

        this.tail = 0;

    }

    push(item) {

        this.items[this.tail] = item;

        this.tail++;

    }

    shift() {

        if (this.isEmpty()) {

            return null;

        }

        const item = this.items[this.head];

        delete this.items[this.head];

        this.head++;

        return item;

    }

    isEmpty() {

        return this.size() === 0;

    }

    size() {

        return this.tail - this.head;

    }

    clear() {

        this.items = {};

        this.head = 0;

        this.tail = 0;

    }

}

export default Deque;