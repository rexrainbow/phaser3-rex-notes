import Parser from './parser.js';

var BuildGraph = function (graph, config) {
    var context = config.context;
    var { nodes, edges } = new Parser.Parser().parse(context);

    var scene = graph.scene;
    var onCreateNodeGameObject = config.onCreateNodeGameObject;
    var onCreateEdgeGameObject = config.onCreateEdgeGameObject;
    var callbackScope = config.callbackScope;

    var nodeGameObject;
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var nodeData = nodes[i];
        var id = nodeData.id;
        var parameters = nodeData.parameters;
        if (callbackScope) {
            nodeGameObject = onCreateNodeGameObject.call(callbackScope, scene, id, parameters);
        } else {
            nodeGameObject = onCreateNodeGameObject(scene, id, parameters);
        }

        graph.addNode(nodeGameObject, parameters, id);
    }

    var edgeGameObject;
    for (var i = 0, cnt = edges.length; i < cnt; i++) {
        var edgeData = edges[i];
        var id = undefined;
        var parameters = edgeData.parameters;
        var sourceId = edgeData.sourceId;
        var targetId = edgeData.targetId;
        if (callbackScope) {
            edgeGameObject = onCreateEdgeGameObject.call(callbackScope, scene, id, parameters);
        } else {
            edgeGameObject = onCreateEdgeGameObject(scene, id, parameters);
        }

        graph.addEdge(edgeGameObject, sourceId, targetId, undefined, parameters);
    }

    return graph;
}

export default BuildGraph;