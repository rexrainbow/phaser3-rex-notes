var AreNeighborNodes = function (nodeGOA, nodeGOB) {
    var vUidA = this.getObjUID(nodeGOA),
        vUidB = this.getObjUID(nodeGOB);
    if ((vUidA != null) && (vUidB != null)) {
        var nodeA = this.getNodeData(nodeGOA);
        vUidB = parseInt(vUidB);
        for (var edgeUid in nodeA) {
            if (nodeA[edgeUid] === vUidB) {
                return true;
            }
        }
    }
    return false;
}

export default AreNeighborNodes;