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
        return this;
    },

    stop() {
        this.recorder.stop();
        return this;
    },

    onRecorderEvent(record, tickRecord, recorder) {
        if (this.filter && !this.filter(record, tickRecord, recorder)) {
            return;
        }

        var value = this.formatter(record, tickRecord, recorder);
        if (value === undefined) {
            return;
        }

        this.write(value, record, tickRecord, recorder);
    },
}
