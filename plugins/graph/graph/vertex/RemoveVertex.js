import GetGraphItem from '../../graphitem/GetGraphItem.js';

var RemoveVertex = function (gameObejct, destroy, removeEdge) {
    if (destroy === undefined) {
        destroy = false;
    }
    if (removeEdge === undefined) {
        removeEdge = true;
    }

    var uid = this.getObjUID(gameObejct);
    if (!this.vertices.hasOwnProperty(uid)) {
        return this;
    }

    // Remove connected edges
    if (removeEdge) {
        var vertex = this.getVertexData(uid);
        for (var edgeUid in vertex) {
            this.removeEdge(edgeUid, destroy);
        }
    }
    // Remove vertex
    delete this.vertices[uid];
    // Clear reference of graph
    GetGraphItem(gameObejct).setGraph(null);
    if (destroy && gameObejct.destroy) {
        gameObject.destroy();
    }

    return this;
}

export default RemoveVertex;