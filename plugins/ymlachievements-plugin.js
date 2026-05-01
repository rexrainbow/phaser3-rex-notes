import Achievements from './ymlachievements.js'

import { Plugins as PhaserPlugins } from 'phaser';
class AchievementsPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new Achievements();
    }
}

export default AchievementsPlugin;