import MoveTo from './moveto.js';

import { Plugins as PhaserPlugins } from 'phaser';
class MoveToPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new MoveTo(gameObject, config);
    }
}

export default MoveToPlugin;