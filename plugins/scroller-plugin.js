import Scroller from './scroller.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ScrollerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Scroller(gameObject, config);
    }

}

export default ScrollerPlugin;