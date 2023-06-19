export default {
    dumpState(includeTree, groupName) {
        if (typeof (includeTree) === 'string') {
            groupName = includeTree;
            includeTree = undefined;
        }

        if (includeTree === undefined) {
            includeTree = false;
        }

        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }

        return this.getTreeGroup(groupName).dumpState(includeTree);
    },

    loadState(state, groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).loadState(state);
        return this;
    },
}