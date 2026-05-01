import RandomPlace from './randomplace.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RandomPlacePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    randomPlace(items, options) {
        return RandomPlace(items, options);
    }
}

export default RandomPlacePlugin;