import { Parser } from '../../flowparser/parser.js';

export default {
    setOnCreateNodeGameObjectCallback(callback, scope) {
        this.onCreateNodeGameObject = callback;
        return this;
    },

    setOnCreateEdgeGameObjectCallback(callback) {
        this.onCreateEdgeGameObject = callback;
        return this;
    },

    setGameObjectLayer(layer) {
        this.gameObjectLayer = layer;
        return this;
    },

    buildFromText(context) {
        var { nodes, edges } = new Parser().parse(context);

        var scene = this.scene;
        var onCreateNodeGameObject = this.onCreateNodeGameObject;
        var onCreateEdgeGameObject = this.onCreateEdgeGameObject;
        var layer = this.gameObjectLayer;

        var nodeGameObject;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            var nodeData = nodes[i];
            var id = nodeData.id;
            var parameters = nodeData.parameters;
            nodeGameObject = onCreateNodeGameObject(scene, id, parameters);

            this.addNode(nodeGameObject, parameters, id);

            if (layer) {
                layer.add(nodeGameObject);
            }
        }

        var edgeGameObject;
        for (var i = 0, cnt = edges.length; i < cnt; i++) {
            var edgeData = edges[i];
            var id = undefined;
            var parameters = edgeData.parameters;
            var sourceId = edgeData.sourceId;
            var targetId = edgeData.targetId;
            edgeGameObject = onCreateEdgeGameObject(scene, id, parameters);

            this.addEdge(edgeGameObject, sourceId, targetId, undefined, parameters);

            if (layer) {
                layer.add(edgeGameObject);
            }
        }

        return this;
    }

}