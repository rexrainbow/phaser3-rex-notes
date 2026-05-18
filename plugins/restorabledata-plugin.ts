import DataManager from './restorabledata';

import { Plugins as PhaserPlugins } from 'phaser';
class DataManagerPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(parent?: any, eventEmitter?: any, config?: any) {
        return new DataManager(parent, eventEmitter, config);
    }

}

export default DataManagerPlugin;