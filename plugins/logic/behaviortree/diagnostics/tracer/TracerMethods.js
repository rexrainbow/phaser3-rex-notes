export default {
    setTree(tree) {
        this.recorder.setTree(tree);
        this.tree = this.recorder.tree;
        return this;
    },

    setTrees(trees) {
        this.recorder.setTrees(trees);
        this.tree = this.recorder.tree;
        return this;
    },

    start() {
        this.recorder.start();
        this.tree = this.recorder.tree;
        return this;
    },

    stop() {
        this.recorder.stop();
        return this;
    },

    clear() {
        this.recorder.clear();
        return this;
    },

    getRecords() {
        return this.recorder.getRecords();
    },

    getLastRecord() {
        return this.recorder.getLastRecord();
    },

    getCurrentRecord() {
        return this.recorder.getCurrentRecord();
    },

    toJSON() {
        return this.recorder.toJSON();
    },
}
