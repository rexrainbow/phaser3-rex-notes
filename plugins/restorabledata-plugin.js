import DataManager from './restorabledata.js';

import { Plugins as PhaserPlugins } from 'phaser';
class DataManagerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(parent, eventEmitter, config) {
        return new DataManager(parent, eventEmitter, config);
    }

}

export default DataManagerPlugin;