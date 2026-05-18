export default {
    dumpEventSheetGroup(groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).dumpEventSheetGroup();
    },

    loadEventSheetGroup(data?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).loadEventSheetGroup(data);
        return this;
    },
}