import UidToObj from '../../graphitem/UidToObj.js';

var GetEdgesOfNode = function (nodeGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var node = this.getNodeData(nodeGameObject);
    if (!node) {
        return out;
    }

    var edgeGO;
    for (var edgeUid in node) {
        edgeGO = UidToObj(edgeUid);
        if (edgeGO) {
            out.push(edgeGO);
        }
    }
    return out;
};

export default GetEdgesOfNode;