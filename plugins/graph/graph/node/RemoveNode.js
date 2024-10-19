import GetGraphItem from '../../graphitem/GetGraphItem.js';

var RemoveNode = function (gameObejct, destroy, removeEdge) {
    if (!this.isNode(gameObejct)) {
        return this;
    }
    
    if (destroy === undefined) {
        destroy = false;
    }
    if (removeEdge === undefined) {
        removeEdge = true;
    }

    var uid = this.getObjUID(gameObejct);
    // Remove connected edges
    if (removeEdge) {
        var vertex = this.getNodeData(uid);
        for (var edgeUid in vertex) {
            this.removeEdge(edgeUid, destroy);
        }
    }
    // Remove vertex
    delete this.vertices[uid];
    this.vertexCount--;
    // Clear reference of graph
    GetGraphItem(gameObejct).setGraph(null);
    if (destroy && gameObejct.destroy) {
        gameObject.destroy();
    }

    return this;
}

export default RemoveNode;