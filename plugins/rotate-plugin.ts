import Rotate from './rotate';

import { Plugins as PhaserPlugins } from 'phaser';
class RotatePlugin extends PhaserPlugins.BasePlugin {
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
        return new Rotate(gameObject, config);
    }
}

export default RotatePlugin;