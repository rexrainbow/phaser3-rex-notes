export default {
    dumpState(includeTree = false) {
        var state = {
            blackboard: this.blackboard.dump(),
            treeGroups: {},
        };
        var treeGroups = state.treeGroups;
        for (var name in this.treeGroups) {
            treeGroups[name] = this.treeGroups[name].dumpState(includeTree);
        }

        return state;
    },

    loadState(state) {
        if (!state) {
            return this;
        }

        this.blackboard.load(state.blackboard);
        var treeGroups = state.treeGroups;
        for (var name in treeGroups) {
            this.getTreeGroup(name).loadState(treeGroups[name]);
        }

        for (var name in treeGroups) {
            this.getTreeGroup(name).continue();
        }

        return this;
    },
}