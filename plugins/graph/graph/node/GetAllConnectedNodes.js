import UidToObj from '../../graphitem/UidToObj.js';

var GetAllConnectedNodes = function (nodeGO, out, travelMode) {
    if (out === undefined) {
        out = [];
    }
    if (typeof (travelMode) === 'string') {
        travelMode = TRAVELMODE[travelMode];
    }
    if (travelMode === undefined) {
        travelMode = 0;
    }

    if (!this.isNode(nodeGO)) {
        return out;
    }

    var startVUid = this.getObjUID(nodeGO);
    var isBFS = (travelMode === 0);
    var queue = [startVUid];
    var curVUid, edges, nextVUid;
    var addedNodesUid = {};
    while (queue.length > 0) {
        curVUid = (isBFS) ? queue.shift() : queue.pop();
        // Already added
        if (addedNodesUid.hasOwnProperty(curVUid)) {
            continue;
        }

        addedNodesUid[curVUid] = true;
        if (curVUid !== startVUid) {
            out.push(UidToObj(curVUid)); // Add node into out
        }

        // Add new neighbors into queue
        edges = this.getNodeData(curVUid);
        for (var edgeUid in edges) {
            nextVUid = this.getOppositeNode(curVUid, edgeUid);
            if (!addedNodesUid.hasOwnProperty(nextVUid)) {
                queue.push(nextVUid);
            }
        }
    }

    return out;
}

const TRAVELMODE = {
    'breadth-first': 0,
    'bfs': 0,
    'depth-first': 1,
    'dfs': 1,
}

export default GetAllConnectedNodes;