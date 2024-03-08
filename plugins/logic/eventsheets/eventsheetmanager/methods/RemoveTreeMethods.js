export default {
    removeAllEventSheets(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeAllEventSheets();
        return this;
    },

    removeEventSheet(title, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeEventSheet(title);
        return this;
    },
}