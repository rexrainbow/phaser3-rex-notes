import UidToObj from '../../graphitem/UidToObj.js';

var GetOppositeVertex = function (vertexGameObject, edgeGameObject) {
    // uid or game object
    var edge = this.getEdgeData(edgeGameObject);
    if (!edge) {
        return undefined;
    }

    var vertexUid = this.getObjUID(vertexGameObject);
    var oppositeVertexUid;
    if (vertexUid === edge.vA) {
        oppositeVertexUid = edge.vB;
    } else if (vertexUid === edge.vB) {
        oppositeVertexUid = edge.vA;
    }
    return UidToObj(oppositeVertexUid);
};

export default GetOppositeVertex;