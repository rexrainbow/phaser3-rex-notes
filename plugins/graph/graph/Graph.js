import LogicGraph from './LogicGraph.js';
import BuildFromTextMethods from './methods/BuildFromTextMethods.js';
import LayoutMethods from './methods/LayoutMethods.js';

class Graph extends LogicGraph {
    constructor(scene, config) {
        super(scene, config);

        this.setOnCreateNodeGameObjectCallback(config.onCreateNodeGameObject);
        this.setOnCreateEdgeGameObjectCallback(config.onCreateEdgeGameObject);
        this.setGameObjectLayer(config.layer);
    }

}

Object.assign(
    Graph.prototype,
    BuildFromTextMethods,
    LayoutMethods
);

export default Graph;