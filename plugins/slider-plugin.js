import Slider from './slider.js';

import { Plugins as PhaserPlugins } from 'phaser';
class SliderPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Slider(gameObject, config);
    }

}

export default SliderPlugin;