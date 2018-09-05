'use strict'

import Hexagon from './geomhexagon.js';

class GeomHexagonPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(x, y, size, type) {
        return new Hexagon(x, y, size, type);
    }
}

export default GeomHexagonPlugin;