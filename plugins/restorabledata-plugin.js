import DataManager from './restorabledata.js';

class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(parent, eventEmitter) {
        return new DataManager(parent, eventEmitter);
    }

}

export default DataManagerPlugin;