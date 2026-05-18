import LZString from './lzstring';

import { Plugins as PhaserPlugins } from 'phaser';
class LZStringPlugin extends PhaserPlugins.BasePlugin {
    game: any;
    lzstring: any;
    pluginManager: any;
    scene: any;
    systems: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.lzstring = new LZString();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.lzstring = null;


        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
    }

    add(config?: any) {
        return new LZString(config);
    }
}
export default LZStringPlugin;