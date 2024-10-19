import UidToObj from '../../graphitem/UidToObj.js';

var GetNeighborNodes = function (nodeAGO, out) {
    if (out === undefined) {
        out = [];
    }

    var node = this.getNodeData(nodeAGO),
        nodeBGO;
    if (node) {
        for (var edgeUid in node) {
            nodeBGO = UidToObj(node[edgeUid]);
            if (nodeBGO) {
                out.push(nodeBGO);
            }
        }
    }
    return out;
};

export default GetNeighborNodes;