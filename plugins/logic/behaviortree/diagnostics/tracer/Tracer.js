import Recorder from '../recorder/Recorder.js';
import TracerMethods from './TracerMethods.js';

class Tracer {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        this.recorder = new Recorder(config);
        this.tree = this.recorder.tree;
    }

    get records() {
        return this.recorder.records;
    }

    get currentRecord() {
        return this.recorder.currentRecord;
    }

    get tickID() {
        return this.recorder.tickID;
    }

    get isStarted() {
        return this.recorder.isStarted;
    }

    get maxRecords() {
        return this.recorder.maxRecords;
    }

    set maxRecords(value) {
        this.recorder.maxRecords = value;
    }

    destroy() {
        this.recorder.destroy();
        this.tree = undefined;
        this.recorder = undefined;
    }
}

Object.assign(
    Tracer.prototype,
    TracerMethods,
)

export default Tracer;
