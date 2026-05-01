import PNGAppender from './pngappender.js';

import { Plugins as PhaserPlugins } from 'phaser';
class PNGAppenderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

// mixin
Object.assign(
    PNGAppenderPlugin.prototype,
    PNGAppender
);

export default PNGAppenderPlugin;