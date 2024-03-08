export default {
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