import GetObjUID from '../../graphitem/GetObjUID.js';
import UIDToObj from '../../graphitem/UIDToObj.js';

export default {
    areNeighborNodes(nodeGameObjectA, nodeGameObjectB) {
        var nodeUIDA = GetObjUID(nodeGameObjectA),
            nodeUIDB = GetObjUID(nodeGameObjectB);
        if (!nodeUIDA || !nodeUIDB) {
            return false;
        }

        return this.graph.areNeighbors(nodeUIDA, nodeUIDB);
    },

    getNeighborNodes(nodeGameObject, out) {
        if (out === undefined) {
            out = [];
        }
        var nodeUID = GetObjUID(nodeGameObject);
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
    },
}