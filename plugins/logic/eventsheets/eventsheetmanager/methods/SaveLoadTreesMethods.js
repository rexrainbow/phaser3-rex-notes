export default {
    dumpEventSheetGroup(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).dumpEventSheetGroup();
    },

    loadEventSheetGroup(data, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).loadEventSheetGroup(data);
        return this;
    },
}