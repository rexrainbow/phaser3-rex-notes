import Bounds from './bounds';

import { Plugins as PhaserPlugins } from 'phaser';
class BoundsPlugin extends PhaserPlugins.BasePlugin {
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
        return new Bounds(gameObject, config);
    }

}

export default BoundsPlugin;