import MouseWheelScroller from './mousewheelscroller.js';

import { Plugins as PhaserPlugins } from 'phaser';
class MouseWheelScrollerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new MouseWheelScroller(gameObject, config);
    }

}

export default MouseWheelScrollerPlugin;