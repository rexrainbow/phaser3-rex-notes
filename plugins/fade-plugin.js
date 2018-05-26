'use strict'

import Fade from './fade.js';
import fadeOutDestroy from './fade-out-destroy.js';

class FadePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new Fade(gameobject, config);
    }
}

// mixin
Object.assign(
    FadePlugin.prototype, {
        fadeOutDestroy: fadeOutDestroy
    }
);

export default FadePlugin;