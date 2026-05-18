import CSVToHashTable from './csvtohashtable';

import { Plugins as PhaserPlugins } from 'phaser';
class CSVToHashTablePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new CSVToHashTable(config);
    }
}

export default CSVToHashTablePlugin;