'use strict'

import Clean from './../../utils/object/Clean.js';

class InstQueue {
    constructor(scenario) {
        this.scenario = scenario;
        this.queue = [];
        this.customData = {};
        this.resetFromJSON();
    }

    resetFromJSON(o) {
        this.clean();
        return this;
    }

    clean() {
        this.queue.length = 0;
        this.currentIdx = -1;
        this.nextIdx = 0;
        Clean(this.customData);
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

export default InstQueue;