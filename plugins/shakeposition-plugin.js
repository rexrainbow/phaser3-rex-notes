import Shake from './shakeposition.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ShakePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Shake(gameObject, config);
    }
}

export default ShakePlugin;