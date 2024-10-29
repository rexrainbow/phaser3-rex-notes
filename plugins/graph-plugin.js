import ObjectFactory from './graph/ObjectFactory.js';

import GraphFactory from './graph/graph/Factory.js';
import ELKLayout from './graph/layout/elkjs/Layout.js';
import DagreLayout from './graph/layout/dagre/Layout.js';

class GraphPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    boot() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }

    async ELKLayoutPromise(graph, config) {
        return ELKLayout(graph, config);
    }

    ELKLayout(graph, config) {
        ELKLayout(graph, config);
        return graph;
    }

    DagreLayout(graph, config) {
        DagreLayout(graph, config);
        return graph;
    }
}

export default GraphPlugin;
