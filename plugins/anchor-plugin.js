import Anchor from './anchor.js'

import { Plugins as PhaserPlugins } from 'phaser';
class AnchorPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Anchor(gameObject, config);
    }
}

export default AnchorPlugin;