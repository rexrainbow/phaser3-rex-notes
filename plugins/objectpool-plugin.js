import ObjectPool from './objectpool.js';

class ObjectPoolPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add() {
        return new ObjectPool();
    }
}

export default ObjectPoolPlugin;