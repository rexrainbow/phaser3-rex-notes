import Achievements from './achievements.js'

class AchievementsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Achievements(config);
    }
}

export default AchievementsPlugin;