import CSVToArray from './csvtoarray'

import { Plugins as PhaserPlugins } from 'phaser';
class CSVToArrayPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    convert(csvString?: any, config?: any) {
        return CSVToArray(csvString, config);
    }
}

export default CSVToArrayPlugin;