var IsInLoop = function (nodeGO) {
    if (!this.isNode(nodeGO)) {
        return false;
    }

    var startVUid = this.getObjUID(nodeGO);
    var queue = [[startVUid, null]];
    var node, curVUid, edgeUID, edges, nextVUid;
    var addedEdgesUid = {};
    while (queue.length > 0) {
        node = queue.pop();
        curVUid = node[0];
        edgeUID = node[1];
        if ((curVUid === startVUid) && (edgeUID !== null)) {
            return true;
        }

        if (edgeUID !== null) {
            addedEdgesUid[edgeUID] = true;
        }
        edges = this.getNodeData(curVUid);
        for (edgeUID in edges) {
            if (addedEdgesUid.hasOwnProperty(edgeUID)) {
                continue;
            }

            nextVUid = edges[edgeUID];
            queue.push([nextVUid, edgeUID]);
        }
    }
    return false;
}

export default IsInLoop;