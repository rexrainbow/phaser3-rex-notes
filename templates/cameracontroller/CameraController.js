import ComponentBase from '../../plugins/utils/componentbase/ComponentBase.js';
import PinchController from './PinchController.js';
import BoundsWheelController from './BoundsWheelController.js';

class CameraController extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.pinchController = new PinchController(scene, config);
        this.boundsWheelController = new BoundsWheelController(scene, config);

        this.boot();
    }

    boot() {
        this.pinchController.boot();
        this.boundsWheelController.boot();
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.pinchController.destroy();
        this.pinchController = undefined;

        this.boundsWheelController.destroy();
        this.boundsWheelController = undefined;
    }

    setPanScrollEnable(enable) {
        this.pinchController.setPanScrollEnable(enable);
        return this;
    }

    setPinchZoomEnable(enable) {
        this.pinchController.setPinchZoomEnable(enable);
        return this;
    }

    setBoundsScrollEnable(enable) {
        this.boundsWheelController.setBoundsScrollEnable(enable);
        return this;
    }

    setMouseWheelZoomEnable(enable) {
        this.boundsWheelController.setMouseWheelZoomEnable(enable);
        return this;
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.setPanScrollEnable(enable);
        this.setPinchZoomEnable(enable);
        this.setBoundsScrollEnable(enable);
        this.setMouseWheelZoomEnable(enable);
        return this;
    }

}

export default CameraController;