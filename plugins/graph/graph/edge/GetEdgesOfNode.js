import UIDToObj from '../graphitem/UIDToObj.js';

var GetEdgesOfNode = function (nodeGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var nodeUID = this.getObjUID(nodeGameObject);
    this.graph.forEachEdge(nodeUID, function (edgeUID) {
        var edgeGameObject = UIDToObj(edgeUID);
        if (!edgeGameObject) {
            return;
        }
        out.puth(edgeGameObject);
    })

    return out;
};

export default GetEdgesOfNode;