import DragSpeed from './dragspeed';

import { Plugins as PhaserPlugins } from 'phaser';
class DragSpeedPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new DragSpeed(gameObject, config);
    }

}

export default DragSpeedPlugin;