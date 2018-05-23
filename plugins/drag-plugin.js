'use strict'

import Drag from './drag.js';

class DragPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new Drag(gameobject, config);
    }

}

export default DragPlugin;