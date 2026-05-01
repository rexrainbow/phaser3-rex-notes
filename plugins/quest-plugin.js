import QuestionManager from './quest.js';

import { Plugins as PhaserPlugins } from 'phaser';
class QuestPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new QuestionManager(config);
    }
}

export default QuestPlugin;