'use strict'

import DragDelta from './dragdelta.js';

class DragDeltaPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new DragDelta(gameobject, config);
    }

}

export default DragDeltaPlugin;