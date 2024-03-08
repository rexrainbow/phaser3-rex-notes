export default {
    getTree(title) {
        var trees = this.trees;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            if (tree.title === title) {
                return tree;
            }
        }
    },

    getTreeState(tree) {
        var treeID = (typeof (tree) === 'string') ? tree : tree.id;
        return this.blackboard.getTreeState(treeID);
    },

    getEventSheetTitleList(out) {
        if (out === undefined) {
            out = [];
        }
        this.trees.forEach(function (tree) {
            out.push(tree.title);
        })
        return out;
    },
}