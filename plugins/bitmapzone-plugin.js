import BitmapZone from './bitmapzone.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BitmapZonePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(source, config) {
        return new BitmapZone(source, config);
    }
}

export default BitmapZonePlugin;