'use strict'

class CmdQueue {
    constructor(scenario) {
        this.scenario = scenario;
        this.queue = [];
        this.resetFromJSON();
    }

    resetFromJSON(o) {
        this.clean();
        return this;
    }

    clean() {
        this.queue.length = 0;
        this.currentIdx = -1;
        this.nextIdx = undefined;
        return this;
    }

    append(item) {
        this.queue.push(item);
        return this;
    }

    appendMultiple(queue) {
        for (var i = 0, len = queue.length; i < len; i++) {
            this.append(queue[i]);
        }
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

export default CmdQueue;