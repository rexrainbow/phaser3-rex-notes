import UIDToObj from '../../graphitem/UIDToObj.js';
import { GetTopLeft } from '../../../utils/bounds/GetBounds.js';

var BuildGraphData = function (graph, config) {
    var nodes = [];
    graph.graph.forEachNode(function (uid) {
        var nodeGameObject = UIDToObj(uid);
        if (!nodeGameObject) {
            return;
        }

        var nodeData = { id: uid, gameObject: nodeGameObject };
        GetTopLeft(nodeGameObject, nodeData);
        nodeData.width = nodeGameObject.displayWidth;
        nodeData.height = nodeGameObject.displayHeight;
        nodes.push(nodeData);
    })

    var edges = [];
    graph.graph.forEachEdge(function (uid, attributes, sourceUID, targetUID) {
        edges.puth({ id: uid, source: sourceUID, target: targetUID });
    })

    return {
        id: 'root',
        children: nodes,
        edges: edges
    }
}

export default BuildGraphData;