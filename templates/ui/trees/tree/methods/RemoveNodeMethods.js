export default {
    removeNode(gameObject, destroyChild) {
        if (typeof (gameObject) === 'string') {
            gameObject = this.getTree(gameObject);
        }

        if (!gameObject) {
            return this;
        }

        var treeParent = this.getTreePatent(gameObject);
        if (!treeParent) {
            return this;
        }

        delete treeParent.nodesMap[gameObject.nodeKey];
        gameObject.nodeKey = null;
        gameObject.rexSizer.treeParent = null;

        var childrenSizer = treeParent.childrenMap.child;
        childrenSizer.remove(gameObject, destroyChild);
        return this;
    },

    removeAllNodes(destroyChild) {
        var nodesMap = this.nodesMap;
        for (var nodeKey in nodesMap) {
            this.removeNode(nodesMap[nodeKey], destroyChild);
        }
        return this;
    }
}