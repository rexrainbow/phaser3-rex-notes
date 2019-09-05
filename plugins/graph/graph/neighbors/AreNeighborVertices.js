var AreNeighborVertices = function (vertexGOA, vertexGOB) {
    var vertexA = this.getVertexData(vertexGOA),
        vertexB = this.getVertexData(vertexGOB);
    if (vertexA && vertexB) {
        for (var edgeUid in vertexA) {
            if (vertexB[edgeUid]) {
                return true;
            }
        }
    }
    return false;
}

export default AreNeighborVertices;