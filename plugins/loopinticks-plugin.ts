import LoopInTicks from './loopinticks'

import { Plugins as PhaserPlugins } from 'phaser';
class LoopInTicksPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new LoopInTicks(scene, config);
    }
}

export default LoopInTicksPlugin;