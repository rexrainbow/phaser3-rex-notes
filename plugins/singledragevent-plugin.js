'use strict'

import addSingleDragEvent from './singledragevent.js';

class SingleDragEventPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject) {
        return addSingleDragEvent(gameObject);
    }

}

export default SingleDragEventPlugin;