import LevelCounter from './levelcounter.js'

class LevelCounterPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new LevelCounter(config);
    }
}

export default LevelCounterPlugin;