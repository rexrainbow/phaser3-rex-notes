import dagre from 'dagre';
import UIDToObj from '../../graphitem/UIDToObj';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig';

var BuildGraphData = function(graph?: any, config?: any) {
    if (config === undefined) {
        config = {};

    }
    var graphData = new dagre.graphlib.Graph();
    graphData.setGraph(config.layoutConfig);
    graphData.setDefaultEdgeLabel(function() { });

    var nodeGameObjectMap = {};
    graph.graph.forEachNode(function(uid?: any, attributes?: any) {
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

    graph.graph.forEachEdge(function(uid?: any, attributes?: any, sourceUID?: any, targetUID?: any) {
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