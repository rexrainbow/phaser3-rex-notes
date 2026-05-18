import DataManager from './localstorage-data';
import Extend from './storage/localstorage/data/Extend';
import { SetItem, GetItem, RemoveItem } from './storage/localstorage/utils/StorageMethods';


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

    extend(dataManager?: any, config?: any) {
        return Extend(dataManager, config);
    }

    setItem(dataKey?: any, name?: any, value?: any) {
        SetItem(dataKey, name, value);
        return this;
    }

    getItem(dataKey?: any, name?: any) {
        return GetItem(dataKey, name);
    }

    removeItem(dataKey?: any, name?: any) {
        RemoveItem(dataKey, name);
        return this;
    }
}

export default DataManagerPlugin;