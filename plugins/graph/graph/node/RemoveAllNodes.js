import UIDToObj from '../graphitem/UIDToObj.js';
import GetGraphItem from '../graphitem/GetGraphItem.js';

var RemoveAllNodes = function (destroy) {
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
};

export default RemoveAllNodes;