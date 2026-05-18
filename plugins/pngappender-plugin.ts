import PNGAppender from './pngappender';

import { Plugins as PhaserPlugins } from 'phaser';
class PNGAppenderPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
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