import UidToObj from '../../graphitem/UidToObj.js';

var GetOppositeNode = function (vertexGameObject, edgeGameObject) {
    // uid or game object
    var vertex = this.getNodeData(vertexGameObject);
    if (!vertex) {
        return undefined;
    }

    var edgeUid = this.getObjUID(edgeGameObject);
    if (!edgeUid) {
        return undefined;
    }

    return UidToObj(vertex[edgeUid]);
};

export default GetOppositeNode;