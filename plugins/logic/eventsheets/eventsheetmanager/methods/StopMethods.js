export default {
    stopGroup(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).stop();
        return this;
    },

    stop(groupName) {
        this.stopGroup(groupName);
        return this;
    },

    stopAllGroups() {
        for (var name in this.treeGroups) {
            this.treeGroups[name].stop();
        }
        return this;
    },

    stopAll() {
        this.stopAllGroups();
        return this;
    }
}