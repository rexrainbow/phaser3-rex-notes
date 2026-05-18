import LevelCounter from './levelcounter'

import { Plugins as PhaserPlugins } from 'phaser';
class LevelCounterPlugin extends PhaserPlugins.BasePlugin {
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
        return new LevelCounter(config);
    }
}

export default LevelCounterPlugin;