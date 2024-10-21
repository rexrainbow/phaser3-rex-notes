import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';
import UIDToObj from '../../graphitem/UIDToObj.js';

export default {
    removeNode(nodeGameObject, destroy) {
        if (!this.isNode(nodeGameObject)) {
            return this;
        }

        if (destroy === undefined) {
            destroy = false;
        }

        // Remove node
        var nodeUID = GetObjUID(nodeGameObject);
        this.graph.dropNode(nodeUID);

        // Clear reference of graph
        GetGraphItem(nodeGameObject).setGraph(null);

        // Destroy game object
        if (destroy && nodeGameObject.destroy) {
            nodeGameObject.destroy();
        }

        return this;
    },

    removeAllNodes(destroy) {
        for (var nodeUid in this.nodes) {
            this.removeNode(nodeUid, destroy)
        }

        this.graph.forEachNode(function (uid) {
            var gameObject = UIDToObj(uid);
            if (!gameObject) {
                return;
            }

            // Clear reference of graph
            GetGraphItem(gameObject).setGraph(null);
            // Destroy game object
            if (destroy && gameObject.destroy) {
                gameObject.destroy();
            }
        })

        // Clear all nodes and all edges
        this.graph.clear();
        return this;
    }
}