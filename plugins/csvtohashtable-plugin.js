import CSVToHashTable from './csvtohashtable.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CSVToHashTablePlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new CSVToHashTable(config);
    }
}

export default CSVToHashTablePlugin;