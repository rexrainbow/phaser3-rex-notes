export default {
    getTree(nodeKey) {
        return this.treesMap[nodeKey];
    },

    getNode(nodeKey) {
        var dotIndex = nodeKey.indexOf('.');
        if (dotIndex === -1) {
            return this.getTree(nodeKey);
        }

        var tree = this.getTree(nodeKey.substring(0, dotIndex));
        if (!tree) {
            return undefined;
        }

        return tree.getNode(nodeKey.substring(dotIndex + 1))
    }
}