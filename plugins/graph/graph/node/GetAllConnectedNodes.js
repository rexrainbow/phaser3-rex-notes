import UidToObj from '../../graphitem/UidToObj.js';

var GetAllConnectedNodes = function (vertexGO, out, travelMode) {
    if (out === undefined) {
        out = [];
    }
    if (typeof (travelMode) === 'string') {
        travelMode = TRAVELMODE[travelMode];
    }
    if (travelMode === undefined) {
        travelMode = 0;
    }

    if (!this.isNode(vertexGO)) {
        return out;
    }

    var startVUid = this.getObjUID(vertexGO);
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
            out.push(UidToObj(curVUid)); // Add vertex into out
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