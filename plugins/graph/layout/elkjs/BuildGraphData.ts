import UIDToObj from '../../graphitem/UIDToObj';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig';

var BuildGraphData = function(graph?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }

    var nodes = [];
    var nodeGameObjectMap = {};
    graph.graph.forEachNode(function(uid?: any, attributes?: any) {
        var nodeGameObject = UIDToObj(uid);
        if (!nodeGameObject) {
            return;
        }

        var padding = GetBoundsConfig(attributes.padding);
        var width = nodeGameObject.displayWidth + padding.left + padding.right;
        var height = nodeGameObject.displayHeight + padding.top + padding.bottom;
        var nodeData = {
            gameObject: nodeGameObject, padding: padding,
            id: uid, width: width, height: height
        };
        if (attributes.hasOwnProperty('layoutOptions')) {
            nodeData.layoutOptions = { ...attributes.layoutOptions };
        }
        nodes.push(nodeData);

        nodeGameObjectMap[uid] = nodeGameObject;
    })

    var edges = [];
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