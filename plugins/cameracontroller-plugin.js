import {
    ControllerPack,
} from './cameracontroller';

class LifeTimePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new ControllerPack(scene, config);
    }

}

export default LifeTimePlugin;