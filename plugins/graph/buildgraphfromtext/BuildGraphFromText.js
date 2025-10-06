import { Parser } from './flowparser/parser.js';

var BuildGraphFromText = function (graph, config) {
    graph.clear();

    var {
        onCreateNodeGameObject,
        onCreateEdgeGameObject,
        text
    } = config;

    var { nodes, edges } = new Parser().parse(text);

    var scene = graph.scene;

    var nodeGameObject;
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var nodeData = nodes[i];
        var { id, parameters, layoutOptions } = nodeData;
        parameters.layoutOptions = layoutOptions;

        if (onCreateNodeGameObject && !parameters.$dummy) {
            nodeGameObject = onCreateNodeGameObject(scene, id, parameters);
        } else {
            nodeGameObject = graph.createNullNode();
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
        if (onCreateEdgeGameObject && !parameters.$invisible) {
            edgeGameObject = onCreateEdgeGameObject(scene, id, parameters);
        } else {
            edgeGameObject = graph.createNullEdge();
        }

        graph.addEdge(edgeGameObject, sourceId, targetId, undefined, parameters, id);
    }
}

export default BuildGraphFromText;