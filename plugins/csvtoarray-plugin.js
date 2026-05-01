import CSVToArray from './csvtoarray.js'

import { Plugins as PhaserPlugins } from 'phaser';
class CSVToArrayPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    convert(csvString, config) {
        return CSVToArray(csvString, config);
    }
}

export default CSVToArrayPlugin;