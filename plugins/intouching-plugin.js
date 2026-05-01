import InTouching from './intouching.js';

import { Plugins as PhaserPlugins } from 'phaser';
class InTouchingPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new InTouching(gameObject, config);
    }

}

export default InTouchingPlugin;