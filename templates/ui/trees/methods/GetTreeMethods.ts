export default {
    getTree(nodeKey?: any) {
        return this.treesMap[nodeKey];
    },

    getTrees(out?: any) {
        if (out === undefined) {
            out = [];
        }
        for (var nodeKey in this.treesMap) {
            out.push(this.treesMap[nodeKey]);
        }
        return out;
    },

    getNode(nodeKey?: any) {
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