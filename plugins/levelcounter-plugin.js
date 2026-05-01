import LevelCounter from './levelcounter.js'

import { Plugins as PhaserPlugins } from 'phaser';
class LevelCounterPlugin extends PhaserPlugins.BasePlugin {
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