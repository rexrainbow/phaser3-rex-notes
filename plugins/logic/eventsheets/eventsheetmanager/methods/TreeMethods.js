import TreeGroup from '../treegroup/EventBehaviorTreeGroup.js';

export default {
    // Override it
    addEventSheet(s, groupName, config) {

    },

    hasTreeGroup(name) {
        return this.treeGroups.hasOwnProperty(name);
    },

    getTreeGroup(name) {
        if (!this.hasTreeGroup(name)) {
            this.treeGroups[name] = new TreeGroup(this, { name });
        }
        return this.treeGroups[name];
    },

    addTree(tree, groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).addTree(tree);
        return this;
    },

    getTreeState(tree, groupName = this.defaultTreeGroupName) {
        return this.getTreeGroup(groupName).getTreeState(tree);
    },

    removeAllEventSheets(groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).removeAllEventSheets();
        return this;
    },

    getEventSheetTitleList(out, groupName = this.defaultTreeGroupName) {
        if (out === undefined) {
            out = [];
        }
        this.getTreeGroup(groupName).getEventSheetTitleList(out);
        return out;
    },

    removeEventSheet(title, groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).removeEventSheet(title);
        return this;
    },

    dumpTrees(groupName = this.defaultTreeGroupName) {
        return this.getTreeGroup(groupName).dumpTrees();
    },

    loadTrees(data, groupName = this.defaultTreeGroupName) {
        this.getTreeGroup(groupName).loadTrees(data);
        return this;
    },

}