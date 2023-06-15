export default {
    dumpState(includeTree = false, groupName = this.defaultTreeGroupName) {
        return this.getTreeGroup(groupName).dumpState(includeTree);
    },

    loadState(state, groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).loadState(state);
        return this;
    },
}