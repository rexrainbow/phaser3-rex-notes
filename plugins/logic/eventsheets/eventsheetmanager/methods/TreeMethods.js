import TreeGroup from '../eventsheetgroup/EventBehaviorTreeGroup.js';

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

    getTree(eventsheet, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTree(eventsheet);
    },

    getTreeState(eventsheet, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeState(eventsheet);
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