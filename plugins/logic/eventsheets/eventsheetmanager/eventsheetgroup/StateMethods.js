export default {
    dumpState(includeTree = false) {
        var state = {
            isRunning: this.isRunning,
            pendingTrees: this.pendingTrees
                .filter(function (eventsheet) {
                    // roundComplete eventsheet will be removed from pendingTrees
                    return !eventsheet.roundComplete;
                })
                .map(function (eventsheet) {
                    return eventsheet.id;
                })
        }

        if (includeTree) {
            state.trees = this.dumpEventSheetGroup();
        }

        return state;
    },

    loadState(state) {
        this.stop();

        if (state.trees) {
            this.trees.length = 0;
            this.loadEventSheetGroup(state.trees);
        }

        this.isRunning = state.isRunning;

        var pendingTrees = this.pendingTrees;
        pendingTrees.length = 0;
        this.trees.forEach(function (eventsheet) {
            if (state.pendingTrees.indexOf(eventsheet.id) > -1) {
                pendingTrees.push(eventsheet);
            }
        })

        return this;
    },
}