import ObjectFactory from './graph/ObjectFactory.js';
import GraphFactory from './graph/graph/Factory.js';
import LineFactory from './graph/line/Factory.js';

import BuildGraphFromText from './graph/buildgraphfromtext/BuildGraphFromText.js';
import ELKLayout from './graph/layout/ELKLayout.js';
import DagreLayout from './graph/layout/DagreLayout.js';

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

    buildGraphFromText(graph, config) {
        BuildGraphFromText(graph, config);
    }

    ELKLayout(graph, config) {
        return ELKLayout(graph, config);
    }

    DagreLayout(graph, config) {
        return DagreLayout(graph, config);
    }


}

export default GraphPlugin;
