export default {
    getTree(title?: any) {
        var trees = this.trees;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];
            if (eventsheet.title === title) {
                return eventsheet;
            }
        }
    },

    getTreeState(eventsheet?: any) {
        var treeID = (typeof (eventsheet) === 'string') ? eventsheet : eventsheet.id;
        return this.blackboard.getTreeState(treeID);
    },

    getEventSheetTitleList(out?: any) {
        if (out === undefined) {
            out = [];
        }
        this.trees.forEach(function(eventsheet?: any) {
            out.push(eventsheet.title);
        })
        return out;
    },
}