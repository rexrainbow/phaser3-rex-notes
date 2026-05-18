import Shake from './shakeposition';

import { Plugins as PhaserPlugins } from 'phaser';
class ShakePlugin extends PhaserPlugins.BasePlugin {
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
        return new Shake(gameObject, config);
    }
}

export default ShakePlugin;