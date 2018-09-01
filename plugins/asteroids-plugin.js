'use strict'

import Asteroids from './asteroids.js';

class AsteroidsPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Asteroids(gameObject, config);
    }

}

export default AsteroidsPlugin;