import BuildGraphFromText from '../../flowparser/BuildGraphFromText.js';

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
        this.clear();

        BuildGraphFromText({
            graph: this,
            onCreateNodeGameObject: this.onCreateNodeGameObject,
            onCreateEdgeGameObject: this.onCreateEdgeGameObject,
            layer: this.gameObjectLayer,
            context: context,
        })

        return this;
    }

}