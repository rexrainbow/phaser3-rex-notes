import VirtualJoyStick from './virtualjoystick.js';
import VectorToCursorKeys from './vectortocursorkeys.js';

import { Plugins as PhaserPlugins } from 'phaser';
class VirtualJoyStickPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new VirtualJoyStick(scene, config);
    }

    addVectorToCursorKeys(config) {
        return new VectorToCursorKeys(undefined, config);
    }

}

export default VirtualJoyStickPlugin;