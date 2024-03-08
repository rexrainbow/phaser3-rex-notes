export default {
    getTreeActiveState(title) {
        var tree = this.getTree(title);
        if (!tree) {
            return null;
        }

        return tree.active;
    },

    setTreeActiveState(title, active) {
        var tree = this.getTree(title);
        if (tree) {
            tree.setActive(active);
        }

        return this;
    },
}