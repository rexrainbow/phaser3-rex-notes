export default {
    // Override it
    addEventSheet(s, groupName, config) {

    },

    addTree(tree, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).addTree(tree);
        return this;
    },

}