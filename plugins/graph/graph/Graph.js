import LogicGraph from './LogicGraph.js';
import GameObjectsMethods from './methods/GameObjectsMethods.js';
import BuildFromTextMethods from './methods/BuildFromTextMethods.js';
import LayoutMethods from './methods/LayoutMethods.js';

class Graph extends LogicGraph {
    constructor(scene, config) {
        super(scene, config);

        this.graphOffsetX = 0;
        this.graphOffsetY = 0;

        this.setOnCreateNodeGameObjectCallback(config.onCreateNodeGameObject);
        this.setOnCreateEdgeGameObjectCallback(config.onCreateEdgeGameObject);

        this.setGameObjectContainer(config.container);

        this.on('layout.complete', this.fitContainer, this);
    }

}

Object.assign(
    Graph.prototype,
    GameObjectsMethods,
    BuildFromTextMethods,
    LayoutMethods
);

export default Graph;