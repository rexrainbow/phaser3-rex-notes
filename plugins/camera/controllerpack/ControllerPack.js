import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import PinchController from '../pinchcontroller/PinchController.js';
import BoundsWheelController from '../boundswheelcontroller/BoundsWheelController.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ControllerPack extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this._enable = true;
        this.pinchController = new PinchController(scene, config);
        this.boundsWheelController = new BoundsWheelController(scene, config);
        this.setEnable(GetValue(config, 'enable', true));
    }

    destroy(fromScene) {
        this.pinchController.destroy(fromScene);
        this.boundsWheelController.destroy(fromScene);
        super.destroy(fromScene);
    }

    set camera(value) {
        this.pinchController.setCamera(value);
        this.boundsWheelController.setCamera(value);
    }

    get camera() {
        return this.pinchController.camera;
    }

    setCamera(camera) {
        this.pinchController.setCamera(camera);
        this.boundsWheelController.setCamera(camera);
        return this;
    }

    set panScrollEnable(value) {
        this.pinchController.panScrollEnable = value;
    }

    get panScrollEnable() {
        return this.pinchController.panScrollEnable;
    }

    setPanScrollEnable = function (enable) {
        this.pinchController.setPanScrollEnable(enable);
        return this;
    }

    set pinchZoomEnable(value) {
        this.pinchController.pinchZoomEnable = value;
    }

    get pinchZoomEnable() {
        return this.pinchController.pinchZoomEnable;
    }

    setPinchZoomEnable = function (enable) {
        this.pinchController.setPinchZoomEnable(enable);
        return this;
    }

    set boundsScrollEnable(value) {
        this.boundsWheelController.boundsScrollEnable = value;
    }

    get boundsScrollEnable() {
        return this.boundsWheelController.boundsScrollEnable;
    }

    setBoundsScrollEnable = function (enable) {
        this.boundsWheelController.setBoundsScrollEnable(enable);
        return this;
    }

    set mouseWheelZoomEnable(value) {
        this.boundsWheelController.mouseWheelZoomEnable = value;
    }

    get mouseWheelZoomEnable() {
        return this.boundsWheelController.mouseWheelZoomEnable;
    }

    setMouseWheelZoomEnable(enable) {
        this.boundsWheelController.setMouseWheelZoomEnable(enable);
        return this;
    }

    set enable(value) {
        value = !!value;
        if (this._enable === value) {
            return;
        }

        if (!value) {
            // Save current enable state, set all enable state to false
            this.panScrollEnableSave = this.panScrollEnable;
            this.pinchZoomEnableSave = this.pinchZoomEnable;
            this.boundsScrollEnableSave = this.boundsScrollEnable;
            this.mouseWheelZoomEnableSave = this.mouseWheelZoomEnable;
            this.panScrollEnable = false;
            this.pinchZoomEnable = false;
            this.boundsScrollEnable = false;
            this.mouseWheelZoomEnable = false;
        } else {
            // Recover enable state to previous value
            this.panScrollEnable = this.panScrollEnableSave;
            this.pinchZoomEnable = this.pinchZoomEnableSave;
            this.boundsScrollEnable = this.boundsScrollEnableSave;
            this.mouseWheelZoomEnable = this.mouseWheelZoomEnableSave;
        }

        this._enable = value;
    }

    get enable() {
        return this._enable;
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    toggleEnable() {
        this.enable = !this.enable;
        return this;
    }
}

export default ControllerPack;