import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const DIRAtoB = 1;
const DIRBtoA = 2;
const DIRMODE = {
    '->': DIRAtoB,
    '<-': DIRBtoA,
    '<->': (DIRAtoB | DIRBtoA),
};

export default {
    isEdge(gameObejct) {
        // uid or game object
        var uid = GetObjUID(gameObejct, false);
        if (uid === null) {
            return false;
        }

        return this.graph.hasEdge(uid);
    },

    addEdge(edgeGameObject, nodeAGameObject, nodeBGameObject, dir, attributes, edgeUID) {
        if (this.isEdge(edgeGameObject)) {
            return this;
        }

        if (dir === undefined) {
            dir = 3;
        } else if (typeof (dir) === 'string') {
            dir = DIRMODE[dir];
        }

        // Add node to graph
        if (typeof (nodeAGameObject) !== 'string') {
            this.addNode(nodeAGameObject)
        }
        if (typeof (nodeBGameObject) !== 'string') {
            this.addNode(nodeBGameObject);
        }

        // Add edge
        GetGraphItem(edgeGameObject, edgeUID).setGraph(this);

        var edgeUID = GetObjUID(edgeGameObject);
        var nodeAUID = GetObjUID(nodeAGameObject);
        var nodeBUID = GetObjUID(nodeBGameObject);

        if (!edgeUID || !nodeAUID || !nodeBUID) {
            return this;
        }

        switch (dir) {
            case DIRAtoB:
                this.graph.addDirectedEdgeWithKey(edgeUID, nodeAUID, nodeBUID, attributes);
                break;

            case DIRBtoA:
                this.graph.addDirectedEdgeWithKey(edgeUID, nodeBUID, nodeAUID, attributes);
                break;

            default:
                this.graph.addUndirectedEdgeWithKey(edgeUID, nodeAUID, nodeBUID, attributes);
                break;
        }


        return this;
    },

};