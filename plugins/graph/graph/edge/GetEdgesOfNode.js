import UidToObj from '../../graphitem/UidToObj.js';

var GetEdgesOfNode = function (vertexGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var vertex = this.getNodeData(vertexGameObject);
    if (!vertex) {
        return out;
    }

    var edgeGO;
    for (var edgeUid in vertex) {
        edgeGO = UidToObj(edgeUid);
        if (edgeGO) {
            out.push(edgeGO);
        }
    }
    return out;
};

export default GetEdgesOfNode;