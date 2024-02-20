export default {
    getNode(mapNameList) {
        if (typeof (mapNameList) === 'string') {
            mapNameList = mapNameList.split('.');
        }
        if (mapNameList.length === 0) {
            return undefined;
        }

        var name = mapNameList.shift();

        var childrenSizer = this.childrenMap.child;
        var element = childrenSizer.getElement(name);

        if (mapNameList.length === 0) {
            return element;
        } else if (element && this.isTree(element)) {
            return element.getElement(mapNameList);
        } else {
            return null;
        }
    },

    getNodes(out) {
        var childrenSizer = this.childrenMap.child;
        var nodes = childrenSizer.childrenMap.items;

        if (!out) {
            out = nodes; // Return internal children array
        } else {
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                out.push(nodes[i]);
            }
            // Copy children
        }
        return out;
    },

    getAllNodes(out) {

    }
}