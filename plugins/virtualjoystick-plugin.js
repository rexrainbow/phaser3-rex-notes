import VirtualJoyStick from './virtualjoystick.js';
import VectorToCursorKeys from './vectortocursorkeys.js';

class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {

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