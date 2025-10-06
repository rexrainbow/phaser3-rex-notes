import LogicGraph from './LogicGraph.js';
import GameObjectsMethods from './methods/GameObjectsMethods.js';
import ContainerMethods from './methods/ContainerMethods.js';
import BuildFromTextMethods from './methods/BuildFromTextMethods.js';
import LayoutMethods from './methods/LayoutMethods.js';

class Graph extends LogicGraph {
    constructor(scene, config) {
        super(scene, config);

        this.graphOffsetX = 0;
        this.graphOffsetY = 0;

        this.setOnCreateNodeGameObjectCallback(config.onCreateNodeGameObject);
        this.setOnCreateEdgeGameObjectCallback(config.onCreateEdgeGameObject);

        this.setContainer(config.container);
        this.setContainerPadding(config.containerPadding);

        this.on('layout.complete', function () {
            this.fitContainer()
        }, this);
    }

}

Object.assign(
    Graph.prototype,
    GameObjectsMethods,
    ContainerMethods,
    BuildFromTextMethods,
    LayoutMethods
);

export default Graph;