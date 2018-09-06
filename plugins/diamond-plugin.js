'use strict'

import Diamond from './diamond.js';

class DiamondPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(x, y, width, height) {
        return new Diamond(x, y, width, height);
    }
}

export default DiamondPlugin;