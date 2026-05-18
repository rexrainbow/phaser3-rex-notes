import QuestionManager from './quest';

import { Plugins as PhaserPlugins } from 'phaser';
class QuestPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new QuestionManager(config);
    }
}

export default QuestPlugin;