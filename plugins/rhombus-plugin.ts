import Rhombus from './rhombus';

import { Plugins as PhaserPlugins } from 'phaser';
class RhombusPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x?: any, y?: any, width?: any, height?: any) {
        return new Rhombus(x, y, width, height);
    }
}

export default RhombusPlugin;