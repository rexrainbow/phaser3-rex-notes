import {
    ControllerPack,
    PanScroll,
    PinchZoom,
    BoundsScroll,
    MouseWheelZoom
} from './cameracontroller';

class CameraControllerPlugin extends Phaser.Plugins.BasePlugin {

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

    addPanScroll(scene, config) {
        return new PanScroll(scene, config);
    }

    addPinchZoom(scene, config) {
        return new PinchZoom(scene, config);
    }

    addBoundsScroll(scene, config) {
        return new BoundsScroll(scene, config);
    }

    addMouseWheelZoom(scene, config) {
        return new MouseWheelZoom(scene, config);
    }
}

export default CameraControllerPlugin;