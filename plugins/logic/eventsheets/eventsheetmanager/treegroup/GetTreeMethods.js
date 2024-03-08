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

    getTreeByID(treeID) {
        var trees = this.trees;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            if (tree.id === treeID) {
                return tree;
            }
        }
    },
}