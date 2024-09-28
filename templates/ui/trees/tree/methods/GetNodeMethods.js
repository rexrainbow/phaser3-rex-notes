export default {
    getNode(mapNameList) {
        if (typeof (mapNameList) === 'string') {
            mapNameList = mapNameList.split('.');
        }
        if (mapNameList.length === 0) {
            return undefined;
        }

        var name = mapNameList.shift();

        var element = this.nodesMap[name];

        if (mapNameList.length === 0) {
            return element;
        } else if (element && this.isTreeObject(element)) {
            return element.getNode(mapNameList);
        } else {
            return null;
        }
    },

    getNodes(out) {
        var nodesMap = this.nodesMap;

        if (!out) {
            out = nodes; // Return internal children array
        } else {
            for (var nodeKey in nodesMap) {
                out.push(nodesMap[nodeKey]);
            }
            // Copy children
        }
        return out;
    },

    getAllNodes(out) {
        // TODO
    }
}