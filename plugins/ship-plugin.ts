import Ship from './ship';

import { Plugins as PhaserPlugins } from 'phaser';
class ShipPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new Ship(gameObject, config);
    }

}

export default ShipPlugin;