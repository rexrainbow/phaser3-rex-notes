import GetObjUID from '../../graphitem/GetObjUID';
import UIDToObj from '../../graphitem/UIDToObj';

export default {
    areNeighborNodes(nodeGameObjectA?: any, nodeGameObjectB?: any) {
        var nodeUIDA = GetObjUID(nodeGameObjectA),
            nodeUIDB = GetObjUID(nodeGameObjectB);
        if (!nodeUIDA || !nodeUIDB) {
            return false;
        }

        return this.graph.areNeighbors(nodeUIDA, nodeUIDB);
    },

    getNeighborNodes(nodeGameObject?: any, out?: any) {
        if (out === undefined) {
            out = [];
        }
        var nodeUID = GetObjUID(nodeGameObject);
        if (!nodeUID) {
            return out;
        }

        this.graph.forEachNeighbor(nodeUID, function(neighborUID?: any) {
            var neighborGameObject = UIDToObj(neighborUID);
            if (!neighborGameObject) {
                return;
            }
            out.push(neighborGameObject);
        });

        return out;
    },
}