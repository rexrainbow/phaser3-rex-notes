import TreeGroup from '../eventsheetgroup/EventBehaviorTreeGroup';

export default {
    hasTreeGroup(name?: any) {
        return this.treeGroups.hasOwnProperty(name);
    },

    getTreeGroup(name?: any) {
        if (!this.hasTreeGroup(name)) {
            this.treeGroups[name] = new TreeGroup(this, { name });
        }
        return this.treeGroups[name];
    },

    getTree(eventsheet?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTree(eventsheet);
    },

    getTreeState(eventsheet?: any, groupName?: any) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        return this.getTreeGroup(groupName).getTreeState(eventsheet);
    },

    getEventSheetTitleList(out?: any, groupName?: any) {
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