export default {
    // Override it
    addEventSheet(s, groupName, config) {
        return this;
    },

    addTree(tree, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).addTree(tree);
        return this;
    },

}