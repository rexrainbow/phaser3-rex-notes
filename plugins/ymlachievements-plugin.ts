import Achievements from './ymlachievements'

import { Plugins as PhaserPlugins } from 'phaser';
class AchievementsPlugin extends PhaserPlugins.BasePlugin {
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
        return new Achievements();
    }
}

export default AchievementsPlugin;