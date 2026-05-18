import Hexagon from './hexagon';

import { Plugins as PhaserPlugins } from 'phaser';
class HexagonPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x?: any, y?: any, size?: any, type?: any) {
        return new Hexagon(x, y, size, type);
    }
}

export default HexagonPlugin;