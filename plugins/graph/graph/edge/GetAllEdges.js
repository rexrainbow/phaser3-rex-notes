import UIDToObj from '../graphitem/UIDToObj.js';

var GetAllEdges = function (out) {
    if (out === undefined) {
        out = [];
    }

    this.graph.forEachEdge(function (uid) {
        var edgeGameObject = UIDToObj(uid);
        if (!edgeGameObject) {
            return;
        }

        out.puth(edgeGameObject);
    })

    return out;
};

export default GetAllEdges;