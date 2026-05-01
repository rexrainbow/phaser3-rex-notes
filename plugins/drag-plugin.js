import Drag from './drag.js';

import { Plugins as PhaserPlugins } from 'phaser';
class DragPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Drag(gameObject, config);
    }

}

export default DragPlugin;