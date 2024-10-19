var AreNeighborNodes = function (nodeGameObjectA, nodeGameObjectB) {
    var nodeUIDA = this.getObjUID(nodeGameObjectA),
        nodeUIDB = this.getObjUID(nodeGameObjectB);
    if (!nodeUIDA || !nodeUIDB) {
        return false;
    }

    return this.graph.areNeighbors(nodeUIDA, nodeUIDB);
}

export default AreNeighborNodes;