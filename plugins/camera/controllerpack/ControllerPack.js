import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import PanScroll from '../panscroll/PanScroll.js';
import PinchZoom from '../pinchzoom/PinchZoom.js';
import BoundsWheelController from '../boundswheelcontroller/BoundsWheelController.js';
import DeepClone from '../../utils/object/DeepClone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ControllerPack extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        } else {
            config = DeepClone(config);
        }

        super(scene, config);
        // this.scene

        this._enable = true;
        this._camera = undefined;

        var enableMask = GetValue(config, 'enable', true);
        delete config.enable;

        config.enable = GetValue(config, 'panScrolEnable', true);
        this.panScroll = new PanScroll(scene, config);

        config.enable = GetValue(config, 'pinchZoomEnable', true);
        this.pinchZoom = new PinchZoom(scene, config);

        this.boundsWheelController = new BoundsWheelController(scene, config);

        this.setEnable(enableMask);
    }

    destroy(fromScene) {
        this.panScroll.destroy(fromScene);
        this.pinchZoom.destroy(fromScene);
        this.boundsWheelController.destroy(fromScene);

        super.destroy(fromScene);
    }

    set camera(value) {
        this.panScroll.setCamera(value);
        this.pinchZoom.setCamera(value);
        this.boundsWheelController.setCamera(value);
    }

    get camera() {
        return this.panScroll.camera;
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    set panScrollEnable(value) {
        this.panScroll.enable = value;
    }

    get panScrollEnable() {
        return this.panScroll.enable;
    }

    setPanScrollEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.panScrollEnable = enable;
        return this;
    }

    set pinchZoomEnable(value) {
        this.pinchZoom.enable = value;
    }

    get pinchZoomEnable() {
        return this.pinchZoom.enable;
    }

    setPinchZoomEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.pinchZoomEnable = enable;
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