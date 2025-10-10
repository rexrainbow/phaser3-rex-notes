import LogicGraph from './LogicGraph.js';
import GameObjectsMethods from './methods/GameObjectsMethods.js';
import ContainerMethods from './methods/ContainerMethods.js';

class Graph extends LogicGraph {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);

        this.graphOffsetX = 0;
        this.graphOffsetY = 0;
    }

}

Object.assign(
    Graph.prototype,
    GameObjectsMethods,
    ContainerMethods,
);

export default Graph;