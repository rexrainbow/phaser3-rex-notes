var AreNeighborNodes = function (vertexGOA, vertexGOB) {
    var vUidA = this.getObjUID(vertexGOA),
        vUidB = this.getObjUID(vertexGOB);
    if ((vUidA != null) && (vUidB != null)) {
        var vertexA = this.getNodeData(vertexGOA);
        vUidB = parseInt(vUidB);
        for (var edgeUid in vertexA) {
            if (vertexA[edgeUid] === vUidB) {
                return true;
            }
        }
    }
    return false;
}

export default AreNeighborNodes;