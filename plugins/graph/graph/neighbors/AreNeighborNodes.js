import GetObjUID from '../../graphitem/GetObjUID.js';

var AreNeighborNodes = function (nodeGameObjectA, nodeGameObjectB) {
    var nodeUIDA = GetObjUID(nodeGameObjectA),
        nodeUIDB = GetObjUID(nodeGameObjectB);
    if (!nodeUIDA || !nodeUIDB) {
        return false;
    }

    return this.graph.areNeighbors(nodeUIDA, nodeUIDB);
}

export default AreNeighborNodes;