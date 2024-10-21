import UIDToObj from '../../graphitem/UIDToObj.js';

var BuildGraphData = function (graph, config) {
    var nodes = [];
    var nodeGameObjectMap = {};
    graph.graph.forEachNode(function (uid) {
        var nodeGameObject = UIDToObj(uid);
        if (!nodeGameObject) {
            return;
        }

        var nodeData = {
            gameObject: nodeGameObject,
            id: uid,
            width: nodeGameObject.displayWidth,
            height: nodeGameObject.displayHeight
        };
        nodes.push(nodeData);

        nodeGameObjectMap[uid] = nodeGameObject;
    })

    var edges = [];
    graph.graph.forEachEdge(function (uid, attributes, sourceUID, targetUID) {
        var sourceGameObject = nodeGameObjectMap[sourceUID];
        var targetGameObject = nodeGameObjectMap[targetUID];

        if (!sourceGameObject || !targetGameObject) {
            return;
        }
        var edgeGameObject = UIDToObj(uid);
        if (!edgeGameObject) {
            return;
        }
        var edgeData = {
            gameObject: edgeGameObject,
            sourceGameObject: sourceGameObject,
            targetGameObject: targetGameObject,
            id: uid, source: sourceUID, target: targetUID,
        };
        edges.push(edgeData);
    })

    return {
        id: 'root',
        children: nodes,
        edges: edges
    }
}

export default BuildGraphData;