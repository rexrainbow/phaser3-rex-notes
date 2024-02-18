export default {
    addSubTree(gameObject, config) {
        var subTree;
        this.childrenMap.child.add(subTree, config);
        return this;
    },

    addLeaf(gameObject, config) {
        this.childrenMap.child.add(gameObject, config);
        return this;
    },
}