import LocalMask from './localmask.js';

class LocalMaskPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new LocalMask(gameObject, config);
    }

}

export default LocalMaskPlugin;