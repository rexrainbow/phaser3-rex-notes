export default {
    getTreeActiveState(tree) {
        var treeID = (typeof (tree) === 'string') ? tree : tree.id;
        tree = this.getTreeByID(treeID);
        if (!tree) {
            return null;
        }

        return tree.active;
    },

    setTreeActiveState(tree, active) {
        var treeID = (typeof (tree) === 'string') ? tree : tree.id;
        tree = this.getTreeByID(treeID);
        if (tree) {
            tree.setActive(active);
        }

        return this;
    },
}