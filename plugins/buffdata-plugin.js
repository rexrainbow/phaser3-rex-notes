import DataManager from './data/buff/DataManager.js';
import Extend from './data/buff/Extend.js';

class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(parent, eventEmitter, config) {
        return new DataManager(parent, eventEmitter, config);
    }

    extend(dataManager, config) {
        return Extend(dataManager, config);
    }
}

export default DataManagerPlugin;