import UIDToObj from '../../graphitem/UIDToObj';
import UIDListToObjList from '../../graphitem/UIDListToObjList';
import GetObjUID from '../../graphitem/GetObjUID';

export default {
    getAllNodes(out?: any) {
        if (out === undefined) {
            out = [];
        }

        this.graph.forEachNode(function(uid?: any) {
            var nodeGameObject = UIDToObj(uid);
            if (!nodeGameObject) {
                return;
            }

            out.push(nodeGameObject);
        })

        return out;
    },

    getNodesOfEdge(edgeGameObject?: any, out?: any) {
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

    getOppositeNode(nodeGameObject?: any, edgeGameObject?: any) {
        var nodeGameObjects = this.getNodesOfEdge(edgeGameObject);

        if (nodeGameObjects.length < 2) {
            return;
        }

        return (nodeGameObject === nodeGameObjects[0]) ? nodeGameObjects[1] : nodeGameObjects[0];
    },

}