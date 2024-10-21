import UIDListToObjList from '../../graphitem/UIDListToObjList.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

var GetNodesOfEdge = function (edgeGameObject, out) {
    if (out === undefined) {
        out = [];
    }

    var edgeUID = GetObjUID(edgeGameObject);
    if (!this.graph.hasEdge(edgeUID)) {
        return out;
    }

    var uidList = [
        this.graph.source(edgeUID),
        this.graph.target(edgeUID)
    ]
    return UIDListToObjList(uidList, out);
};

export default GetNodesOfEdge;