import CSVToArray from './csvtoarray.js'

class CSVToArrayPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    convert(strData, strDelimiter) {
        return CSVToArray(strData, strDelimiter);
    }
}

export default CSVToArrayPlugin;