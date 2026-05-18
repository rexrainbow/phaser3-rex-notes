import ObjectPool from './objectpool';

import { Plugins as PhaserPlugins } from 'phaser';
class ObjectPoolPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
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