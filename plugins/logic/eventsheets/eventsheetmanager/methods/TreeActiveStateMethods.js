export default {
    getTreeActiveState(tree, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeActiveState(tree);
    },

    setTreeActiveState(tree, groupName, active) {
        if (typeof (groupName) === 'boolean') {
            active = groupName;
            groupName = undefined;
        }
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).setTreeActiveState(tree, active);
    },
}