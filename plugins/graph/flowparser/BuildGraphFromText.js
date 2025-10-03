import { Parser } from './parser.js';

var BuildGraphFromText = function (config) {
    var {
        graph,
        onCreateNodeGameObject, onCreateEdgeGameObject,
        context
    } = config;

    var { nodes, edges } = new Parser().parse(context);

    var scene = graph.scene;

    var nodeGameObject;
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var nodeData = nodes[i];
        var id = nodeData.id;
        var parameters = nodeData.parameters;

        if (onCreateNodeGameObject) {
            nodeGameObject = onCreateNodeGameObject(scene, id, parameters);
        } else {
            nodeGameObject = { width: 0, height: 0 };
        }

        graph.addNode(nodeGameObject, parameters, id);
    }

    var edgeGameObject;
    for (var i = 0, cnt = edges.length; i < cnt; i++) {
        var edgeData = edges[i];
        var id = edgeData.id;
        var parameters = edgeData.parameters;
        var sourceId = edgeData.sourceId;
        var targetId = edgeData.targetId;

        if (onCreateEdgeGameObject) {
            edgeGameObject = onCreateEdgeGameObject(scene, id, parameters);
        } else {
            edgeGameObject = {};
        }

        graph.addEdge(edgeGameObject, sourceId, targetId, undefined, parameters, id);
    }

}

export default BuildGraphFromText;