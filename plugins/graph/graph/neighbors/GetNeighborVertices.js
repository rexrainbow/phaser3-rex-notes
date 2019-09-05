var GetNeighborVertices = function (gameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var vertex = this.getVertexData(gameObject),
        vGO;
    if (vertex) {
        for (var edgeUid in vertex) {
            vGO = this.getOppositeVertex(gameObject, edgeUid);
            if (vGO) {
                out.push(vGO);
            }
        }
    }
    return out;
};

export default GetNeighborVertices;