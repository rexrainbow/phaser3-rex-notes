import Recorder from '../recorder/Recorder.js';
import TracerMethods from './TracerMethods.js';

class Tracer {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        this.recorder = new Recorder(config);
        this.manager = this.recorder.manager;
    }

    get records() {
        return this.recorder.records;
    }

    get currentRecord() {
        return this.recorder.currentRecord;
    }

    get roundID() {
        return this.recorder.roundID;
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
        this.manager = undefined;
        this.recorder = undefined;
    }
}

Object.assign(
    Tracer.prototype,
    TracerMethods,
)

export default Tracer;
