import LoopInTicks from './loopinticks.js'

import { Plugins as PhaserPlugins } from 'phaser';
class LoopInTicksPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new LoopInTicks(scene, config);
    }
}

export default LoopInTicksPlugin;