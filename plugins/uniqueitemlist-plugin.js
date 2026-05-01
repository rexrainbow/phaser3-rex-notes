import UniqueItemList from './uniqueitemlist.js';

import { Plugins as PhaserPlugins } from 'phaser';
class UniqueItemListPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new UniqueItemList(config);
    }

}

export default UniqueItemListPlugin;