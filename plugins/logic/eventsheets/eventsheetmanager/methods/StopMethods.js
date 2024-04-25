export default {
    stop(groupName) {
        this.stopGroup(groupName);
        return this;
    },

    stopGroup(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).stop();
        return this;
    },
}