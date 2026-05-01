import LayerManager from './layermanager.js';

import { Plugins as PhaserPlugins } from 'phaser';
class LayerManagerPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new LayerManager(scene, config);
    }
}

export default LayerManagerPlugin;