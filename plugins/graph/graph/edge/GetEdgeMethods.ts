import UIDToObj from '../../graphitem/UIDToObj';
import GetObjUID from '../../graphitem/GetObjUID';
0
export default {
    getAllEdges(out?: any) {
        if (out === undefined) {
            out = [];
        }

        this.graph.forEachEdge(function(uid?: any) {
            var edgeGameObject = UIDToObj(uid);
            if (!edgeGameObject) {
                return;
            }

            out.push(edgeGameObject);
        })

        return out;
    },

    getEdgesOfNode(nodeGameObject?: any, out?: any) {
        if (out === undefined) {
            out = [];
        }

        var nodeUID = GetObjUID(nodeGameObject);
        this.graph.forEachEdge(nodeUID, function(edgeUID?: any) {
            var edgeGameObject = UIDToObj(edgeUID);
            if (!edgeGameObject) {
                return;
            }
            out.push(edgeGameObject);
        })

        return out;
    }
};