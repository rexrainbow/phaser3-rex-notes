'use strict'

import Slider from './slider.js';

class SliderPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new Slider(gameobject, config);
    }

}

export default SliderPlugin;