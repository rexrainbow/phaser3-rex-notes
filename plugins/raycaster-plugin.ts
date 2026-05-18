import Raycaster from './raycaster';

import { Plugins as PhaserPlugins } from 'phaser';
class RaycasterPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new Raycaster(config);
    }
}

export default RaycasterPlugin;