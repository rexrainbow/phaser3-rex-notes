import DataManager from './localstorage-data.js';
import Extend from './storage/localstorage/data/Extend.js';

class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

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

    extend(dataManager, config) {
        return Extend(dataManager, config);
    }
}

export default DataManagerPlugin;