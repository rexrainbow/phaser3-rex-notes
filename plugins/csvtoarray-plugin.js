import CSVToArray from './csvtoarray.js'

class CSVToArrayPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    convert(strData, config) {
        return CSVToArray(strData, config);
    }
}

export default CSVToArrayPlugin;