import FullGameSize from './fullgamesize.js'

class FullGameSizePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new FullGameSize(gameObject, config);
    }
}

export default FullGameSizePlugin;