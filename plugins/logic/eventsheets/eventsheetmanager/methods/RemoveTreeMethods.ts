export default {
    removeAllEventSheets(groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeAllEventSheets();
        return this;
    },

    removeEventSheet(title?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeEventSheet(title);
        return this;
    },
}