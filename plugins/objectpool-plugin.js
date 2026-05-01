import ObjectPool from './objectpool.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ObjectPoolPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ObjectPool();
    }
}

export default ObjectPoolPlugin;