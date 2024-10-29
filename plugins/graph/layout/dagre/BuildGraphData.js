import dagre from 'dagre';
import UIDToObj from '../../graphitem/UIDToObj.js';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig.js';

var BuildGraphData = function (graph, config) {
    var graphData = new dagre.graphlib.Graph();
    graphData.setGraph(config);
    graphData.setDefaultEdgeLabel(function () { });

    var nodeGameObjectMap = {};
    graph.graph.forEachNode(function (uid, attributes) {
        var nodeGameObject = UIDToObj(uid);
        if (!nodeGameObject) {
            return;
        }

        var padding = GetBoundsConfig(attributes.padding);
        var width = nodeGameObject.displayWidth + padding.left + padding.right;
        var height = nodeGameObject.displayHeight + padding.top + padding.bottom;

        graphData.setNode(uid, {
            gameObject: nodeGameObject, padding: padding,
            width: width, height: height,
        })

        nodeGameObjectMap[uid] = nodeGameObject;
    })

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

        graphData.setEdge(sourceUID, targetUID, {
            gameObject: edgeGameObject,
            sourceGameObject: sourceGameObject,
            targetGameObject: targetGameObject,
        })
    })

    return graphData;
}

export default BuildGraphData;