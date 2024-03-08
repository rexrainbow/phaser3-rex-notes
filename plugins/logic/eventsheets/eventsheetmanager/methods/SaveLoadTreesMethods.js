export default {
    dumpTrees(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).dumpTrees();
    },

    loadTrees(data, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).loadTrees(data);
        return this;
    },
}