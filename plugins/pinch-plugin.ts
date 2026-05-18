import Pinch from './pinch';

import { Plugins as PhaserPlugins } from 'phaser';
class PinchPlugin extends PhaserPlugins.BasePlugin {
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
        return new Pinch(scene, config);
    }

}

export default PinchPlugin;