export default {
    dumpState(includeTree = false) {
        var state = {
            isRunning: this.isRunning,
            pendingTrees: this.pendingTrees.map(function (tree) {
                return tree.id;
            })
        }

        if (includeTree) {
            state.trees = this.dumpTrees();
        }

        return state;
    },

    loadState(state) {
        this.stop();

        if (state.trees) {
            this.trees.length = 0;
            this.loadTrees(state.trees);
        }

        this.isRunning = state.isRunning;

        var pendingTrees = this.pendingTrees;
        pendingTrees.length = 0;
        this.trees.forEach(function (tree) {
            if (state.pendingTrees.indexOf(tree.id) > -1) {
                pendingTrees.push(tree);
            }
        })

        return this;
    },
}