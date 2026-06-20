export default {
    removeAllEventSheets(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeAllEventSheets();
        return this;
    },

    removeAllEventSheetsLater(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeAllEventSheetsLater();
        return this;
    },

    removeEventSheet(title, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeEventSheet(title);
        return this;
    },

    removeEventSheetLater(title, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).removeEventSheetLater(title);
        return this;
    },

    removeTreeGroup(name) {
        if (!this.hasTreeGroup(name)) {
            return this;
        }

        this.treeGroups[name].destroy();
        delete this.treeGroups[name];

        return this;
    },
}
