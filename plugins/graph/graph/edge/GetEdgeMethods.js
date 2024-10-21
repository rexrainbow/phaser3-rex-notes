import UIDToObj from '../../graphitem/UIDToObj.js';
import GetObjUID from '../../graphitem/GetObjUID.js';
0
export default {
    getAllEdges(out) {
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
    },

    getEdgesOfNode(nodeGameObject, out) {
        if (out === undefined) {
            out = [];
        }

        var nodeUID = GetObjUID(nodeGameObject);
        this.graph.forEachEdge(nodeUID, function (edgeUID) {
            var edgeGameObject = UIDToObj(edgeUID);
            if (!edgeGameObject) {
                return;
            }
            out.puth(edgeGameObject);
        })

        return out;
    }
};