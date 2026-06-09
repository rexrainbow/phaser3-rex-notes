import Recorder from '../recorder/Recorder.js';

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

    setTree(tree) {
        this.recorder.setTree(tree);
        this.tree = tree;
        return this;
    }

    setTrees(trees) {
        this.recorder.setTrees(trees);
        this.tree = this.recorder.tree;
        return this;
    }

    start() {
        this.recorder.start();
        this.tree = this.recorder.tree;
        return this;
    }

    stop() {
        this.recorder.stop();
        return this;
    }

    clear() {
        this.recorder.clear();
        return this;
    }

    destroy() {
        this.recorder.destroy();
        this.tree = undefined;
        this.recorder = undefined;
    }

    getRecords() {
        return this.recorder.getRecords();
    }

    getLastRecord() {
        return this.recorder.getLastRecord();
    }

    getCurrentRecord() {
        return this.recorder.getCurrentRecord();
    }

    toJSON() {
        return this.recorder.toJSON();
    }
}

export default Tracer;
