import EightDirection from './eightdirection.js';

import { Plugins as PhaserPlugins } from 'phaser';
class EightDirectionPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EightDirection(gameObject, config);
    }

}

export default EightDirectionPlugin;