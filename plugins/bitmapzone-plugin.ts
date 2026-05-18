import BitmapZone from './bitmapzone';

import { Plugins as PhaserPlugins } from 'phaser';
class BitmapZonePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(source?: any, config?: any) {
        return new BitmapZone(source, config);
    }
}

export default BitmapZonePlugin;