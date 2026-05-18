import Perlin from './perlin';

import { Plugins as PhaserPlugins } from 'phaser';
class PerlinPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(seed?: any) {
        return new Perlin(seed);
    }

}

export default PerlinPlugin;