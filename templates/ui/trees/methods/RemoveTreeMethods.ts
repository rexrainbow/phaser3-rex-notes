export default {
    removeTree(gameObject?: any, destroyChild?: any) {
        if (typeof (gameObject) === 'string') {
            gameObject = this.getTree(gameObject);
        }

        if (!gameObject) {
            return this;
        }

        delete this.treesMap[gameObject.nodeKey];
        gameObject.nodeKey = null;

        this.remove(gameObject, destroyChild);
        return this;
    },

    removeAllNodes(destroyChild?: any) {
        var treesMap = this.treesMap;
        for (var nodeKey in treesMap) {
            this.removeTree(treesMap[nodeKey], destroyChild);
        }
        return this;
    }
}