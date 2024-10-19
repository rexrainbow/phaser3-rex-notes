import UIDToObj from '../../graphitem/UIDToObj.js';

var GetAllNodes = function (out) {
    if (out === undefined) {
        out = [];
    }

    this.graph.forEachNode(function (uid) {
        var nodeGameObject = UIDToObj(uid);
        if (!nodeGameObject) {
            return;
        }

        out.puth(nodeGameObject);
    })

    return out;
};

export default GetAllNodes;
