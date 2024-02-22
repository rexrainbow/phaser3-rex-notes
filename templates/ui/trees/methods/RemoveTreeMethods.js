export default {
    removeTree(gameObject, destroyChild) {
        if (!gameObject) {
            return this;
        }

        delete this.treesMap[gameObject.nodeKey];
        gameObject.nodeKey = null;

        this.remove(gameObject, destroyChild);
        return this;
    },

    removeAllNodes(destroyChild) {
        var treesMap = this.treesMap;
        for (var nodeKey in treesMap) {
            this.removeTree(treesMap[nodeKey], destroyChild);
        }
        return this;
    }
}