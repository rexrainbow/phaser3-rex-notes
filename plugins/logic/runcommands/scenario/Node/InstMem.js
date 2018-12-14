import Clone from '../../../../utils/object/Clone.js';

class InstMem {
    constructor() {
        this.queue = [];
        this.currentIdx = -1;
        this.nextIdx = 0;
    }

    clear() {
        this.currentIdx = -1;
        this.nextIdx = 0;
        this.queue.length = 0;
        return this;
    }

    clone(items) {
        Clone(items, this.queue);
        return this;
    }

    append(item) {
        this.queue.push(item);
        return this;
    }

    setNextIndex(index) {
        if (index === undefined) {
            index = this.currentIdx + 1;
        }
        this.nextIdx = index;
        return this;
    }

    get(index) {
        if (index === undefined) {
            index = this.nextIdx;
        }
        this.currentIdx = index;
        return this.queue[index];
    }

    get length() {
        return this.queue.length;
    }
}

export default InstMem;