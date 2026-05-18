import VirtualJoyStick from './virtualjoystick';
import VectorToCursorKeys from './vectortocursorkeys';

import { Plugins as PhaserPlugins } from 'phaser';
class VirtualJoyStickPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new VirtualJoyStick(scene, config);
    }

    addVectorToCursorKeys(config?: any) {
        return new VectorToCursorKeys(undefined, config);
    }

}

export default VirtualJoyStickPlugin;