export default {
    dumpState(includeTree = false, groupName = 'default') {
        return this.getTreeGroup(groupName).dumpState(includeTree);
    },

    loadState(state, groupName = 'default') {
        this.getTreeGroup(groupName).loadState(state);
        return this;
    },
}