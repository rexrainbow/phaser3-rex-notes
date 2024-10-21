import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

var RemoveNode = function (nodeGameObject, destroy) {
    if (!this.isNode(nodeGameObject)) {
        return this;
    }

    if (destroy === undefined) {
        destroy = false;
    }

    // Remove node
    var nodeUID = GetGraphItem(nodeGameObject);
    this.graph.dropNode(nodeUID);

    // Clear reference of graph
    GetGraphItem(nodeGameObject).setGraph(null);

    // Destroy game object
    if (destroy && nodeGameObject.destroy) {
        nodeGameObject.destroy();
    }

    return this;
}

export default RemoveNode;