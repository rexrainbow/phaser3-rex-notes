import DataManager from './data/buff/DataManager';
import Extend from './data/buff/Extend';

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

    add(parent?: any, eventEmitter?: any) {
        return new DataManager(parent, eventEmitter);
    }

    extend(dataManager?: any) {
        return Extend(dataManager);
    }
}

export default DataManagerPlugin;