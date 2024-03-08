export default {
    getTreeActiveState(title, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeActiveState(title);
    },

    setTreeActiveState(title, groupName, active) {
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