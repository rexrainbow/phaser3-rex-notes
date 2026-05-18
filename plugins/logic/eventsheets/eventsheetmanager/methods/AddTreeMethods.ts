export default {
    // Override it
    addEventSheet(data?: any, groupName?: any, config?: any) {
        return this;
    },

    addTree(eventsheet?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).addTree(eventsheet);
        return this;
    },

}