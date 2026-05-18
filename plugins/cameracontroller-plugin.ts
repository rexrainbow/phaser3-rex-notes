import {
    ControllerPack,
    PanScroll,
    PinchZoom,
    BoundsScroll,
    MouseWheelZoom
} from './cameracontroller';

import { Plugins as PhaserPlugins } from 'phaser';
class CameraControllerPlugin extends PhaserPlugins.BasePlugin {
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
        return new ControllerPack(scene, config);
    }

    addPanScroll(scene?: any, config?: any) {
        return new PanScroll(scene, config);
    }

    addPinchZoom(scene?: any, config?: any) {
        return new PinchZoom(scene, config);
    }

    addBoundsScroll(scene?: any, config?: any) {
        return new BoundsScroll(scene, config);
    }

    addMouseWheelZoom(scene?: any, config?: any) {
        return new MouseWheelZoom(scene, config);
    }
}

export default CameraControllerPlugin;