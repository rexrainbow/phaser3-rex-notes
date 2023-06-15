import TreeGroup from '../treegroup/EventBehaviorTreeGroup.js';

export default {
    // Override it
    addEventSheet(s, config, groupName = 'default') {

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

    addTree(tree, groupName = 'default') {
        this.getTreeGroup(groupName).addTree(tree);
        return this;
    },

    getTreeState(tree, groupName = 'default') {
        return this.getTreeGroup(groupName).getTreeState(tree);
    },

    clearAllEventSheets(groupName = 'default') {
        this.getTreeGroup(groupName).clearAllEventSheets();
        return this;
    },

    getEventSheetTitleList(out, groupName = 'default') {
        if (out === undefined) {
            out = [];
        }
        this.getTreeGroup(groupName).getEventSheetTitleList(out);
        return out;
    },

    removeEventSheet(title, groupName = 'default') {
        this.getTreeGroup(groupName).removeEventSheet(title);
        return this;
    },

    dumpTrees(groupName = 'default') {
        return this.getTreeGroup(groupName).dumpTrees();
    },

    loadTrees(data, groupName = 'default') {
        this.getTreeGroup(groupName).loadTrees(data);
        return this;
    },

}