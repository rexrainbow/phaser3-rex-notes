import AddPolarCoordinateProperties from './polarcoordinate';

import { Plugins as PhaserPlugins } from 'phaser';
class PolarCoordinatePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, ox?: any, oy?: any, rotation?: any, radius?: any) {
        return AddPolarCoordinateProperties(gameObject, ox, oy, rotation, radius)
    }
}

export default PolarCoordinatePlugin;