export default {
    // Override it
    addEventSheet(data, groupName, config) {
        return this;
    },

    addTree(eventsheet, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).addTree(eventsheet);
        return this;
    },

}