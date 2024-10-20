import UIDToObj from '../graphitem/UIDToObj.js';

var GetNeighborNodes = function (nodeGameObject, out) {
    if (out === undefined) {
        out = [];
    }
    var nodeUID = this.getObjUID(nodeGameObject);
    if (!nodeUID) {
        return out;
    }

    this.graph.forEachNeighbor(nodeUID, function (neighborUID) {
        var neighborGameObject = UIDToObj(neighborUID);
        if (!neighborGameObject) {
            return;
        }
        out.push(neighborGameObject);
    });

    return out;
};

export default GetNeighborNodes;