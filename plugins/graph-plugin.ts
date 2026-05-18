import ObjectFactory from './graph/ObjectFactory';
import GraphFactory from './graph/graph/Factory';
import LineFactory from './graph/line/Factory';

import BuildGraphFromText from './graph/buildgraphfromtext/BuildGraphFromText';
import ELKLayout from './graph/layout/ELKLayout';
import DagreLayout from './graph/layout/DagreLayout';

import { Plugins as PhaserPlugins } from 'phaser';
class GraphPlugin extends PhaserPlugins.ScenePlugin {
    add: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
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

    buildGraphFromText(graph?: any, config?: any) {
        BuildGraphFromText(graph, config);
    }

    ELKLayout(graph?: any, config?: any) {
        return ELKLayout(graph, config);
    }

    DagreLayout(graph?: any, config?: any) {
        return DagreLayout(graph, config);
    }


}

export default GraphPlugin;