import UIDToObj from '../../graphitem/UIDToObj.js';
import UIDListToObjList from '../../graphitem/UIDListToObjList.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

export default {
    getAllNodes(out) {
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
    },

    getNodesOfEdge(edgeGameObject, out) {
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
    },

    getOppositeNode(nodeGameObject, edgeGameObject) {
        var nodeGameObjects = this.getNodesOfEdge(edgeGameObject);

        if (nodeGameObjects.length < 2) {
            return;
        }

        return (nodeGameObject === nodeGameObjects[0]) ? nodeGameObjects[1] : nodeGameObjects[0];
    },

}