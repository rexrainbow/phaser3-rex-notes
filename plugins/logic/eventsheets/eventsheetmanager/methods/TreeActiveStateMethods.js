export default {
    getEventSheetActiveState(title, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeActiveState(title);
    },

    setEventSheetActiveState(title, groupName, active) {
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