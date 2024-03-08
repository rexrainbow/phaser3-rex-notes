import TreeGroup from '../treegroup/EventBehaviorTreeGroup.js';

export default {
    hasTreeGroup(name) {
        return this.treeGroups.hasOwnProperty(name);
    },

    getTreeGroup(name) {
        if (!this.hasTreeGroup(name)) {
            this.treeGroups[name] = new TreeGroup(this, { name });
        }
        return this.treeGroups[name];
    },

    getTreeState(tree, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeState(tree);
    },

    getEventSheetTitleList(out, groupName) {
        if (out === undefined) {
            out = [];
        }
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).getEventSheetTitleList(out);
        return out;
    },
}