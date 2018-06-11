'use strict'

import Scroller from './scroller.js';

class ScrollerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new Scroller(gameobject, config);
    }

}

export default ScrollerPlugin;