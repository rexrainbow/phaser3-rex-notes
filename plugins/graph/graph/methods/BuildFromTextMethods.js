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

    buildFromText(context) {
        this.clear();

        BuildGraphFromText({
            graph: this,
            onCreateNodeGameObject: this.onCreateNodeGameObject,
            onCreateEdgeGameObject: this.onCreateEdgeGameObject,
            context: context,
        })

        this.addToContainer();

        return this;
    }

}