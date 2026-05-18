import LogicGraph from './LogicGraph';
import GameObjectsMethods from './methods/GameObjectsMethods';
import ContainerMethods from './methods/ContainerMethods';

class Graph extends LogicGraph {
    graphOffsetX: any;
    graphOffsetY: any;

    constructor(scene?: any, config?: any) {
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