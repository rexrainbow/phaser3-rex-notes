import Flash from './flash.js';

import { Plugins as PhaserPlugins } from 'phaser';
class FlashPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Flash(gameObject, config);
    }
}

export default FlashPlugin;