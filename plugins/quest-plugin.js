import From from './quest.js';

class QuestPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(config) {
        return new From(config);
    }
}

export default QuestPlugin;