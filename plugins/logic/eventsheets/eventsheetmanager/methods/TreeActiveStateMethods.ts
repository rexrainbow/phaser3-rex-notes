export default {
    getEventSheetActiveState(title?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeActiveState(title);
    },

    setEventSheetActiveState(title?: any, groupName?: any, active?: any) {
        if (typeof (groupName) === 'boolean') {
            active = groupName;
            groupName = undefined;
        }
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).setTreeActiveState(title, active);
    },
}