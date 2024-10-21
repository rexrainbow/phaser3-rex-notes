import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

const DIRAtoB = 1;
const DIRBtoA = 2;
const DIRMODE = {
    '->': DIRAtoB,
    '<-': DIRBtoA,
    '<->': (DIRAtoB | DIRBtoA),
};

var AddEdge = function (edgeGameObject, nodeAGameObject, nodeBGameObject, dir) {
    if (this.isEdge(edgeGameObject)) {
        return this;
    }

    if (typeof (dir) === 'string') {
        dir = DIRMODE[dir];
    }

    if (dir === undefined) {
        dir = 3;
    }

    // Add node to graph
    this.addNode(nodeAGameObject).addNode(nodeBGameObject);

    // Add edge
    GetGraphItem(edgeGameObject).setGraph(this);

    var edgeUID = GetObjUID(edgeGameObject);
    var nodeAUID = GetObjUID(nodeAGameObject);
    var nodeBUID = GetObjUID(nodeBGameObject);

    if (!edgeUID || !nodeAUID || !nodeBUID) {
        return this;
    }

    switch (dir) {
        case DIRAtoB:
            this.graph.addDirectedEdgeWithKey(edgeUID, nodeAUID, nodeBUID);
            break;

        case DIRBtoA:
            this.graph.addDirectedEdgeWithKey(edgeUID, nodeBUID, nodeAUID);
            break;

        default:
            this.graph.addUndirectedEdgeWithKey(edgeUID, nodeAUID, nodeBUID);
            break;
    }


    return this;
}

export default AddEdge;