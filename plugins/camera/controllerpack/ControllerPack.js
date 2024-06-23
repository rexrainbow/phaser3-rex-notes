import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import PanScroll from '../panscroll/PanScroll.js';
import PinchZoom from '../pinchzoom/PinchZoom.js';
import BoundsScroll from '../boundsscroll/BoundsScroll.js';
import MouseWheelZoom from '../mousewheelzoom/MouseWheelZoom.js';
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

        if (GetValue(config, 'panScroll', true)) {
            config.enable = GetValue(config, 'panScrollEnable', true);
            this.panScroll = new PanScroll(scene, config);
        }

        if (GetValue(config, 'pinchZoom', true)) {
            config.enable = GetValue(config, 'pinchZoomEnable', true);
            this.pinchZoom = new PinchZoom(scene, config);
        }

        if (GetValue(config, 'boundsScroll', true)) {
            config.enable = GetValue(config, 'boundsScrollEnable', true);
            this.boundsScroll = new BoundsScroll(scene, config);
        }

        if (GetValue(config, 'mouseWheelZoom', true)) {
            config.enable = GetValue(config, 'mouseWheelZoomEnable', true);
            config.zoomStep = GetValue(config, 'mouseWheelZoomStep', 0.01);
            this.mouseWheelZoom = new MouseWheelZoom(scene, config);
        }

        this.setEnable(enableMask);
    }

    destroy(fromScene) {
        if (this.panScroll) {
            this.panScroll.destroy(fromScene);
        }

        if (this.pinchZoom) {
            this.pinchZoom.destro(fromScene);
        }

        if (this.boundsScroll) {
            this.boundsScroll.destroy(fromScene);
        }

        if (this.mouseWheelZoom) {
            this.mouseWheelZoom.destroy(fromScene);
        }

        super.destroy(fromScene);
    }

    set camera(value) {
        if (this.panScroll) {
            this.panScroll.setCamera(value);
        }

        if (this.pinchZoom) {
            this.pinchZoom.setCamera(value);
        }

        if (this.boundsScroll) {
            this.boundsScroll.setCamera(value);
        }

        if (this.mouseWheelZoom) {
            this.mouseWheelZoom.setCamera(value);
        }
    }

    get camera() {
        if (this.panScroll) {
            return this.panScroll.camera;
        }

        if (this.pinchZoom) {
            return this.pinchZoom.camera;
        }

        if (this.boundsScroll) {
            return this.boundsScroll.camera;
        }

        if (this.mouseWheelZoom) {
            return this.mouseWheelZoom.camera;
        }
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    set panScrollEnable(value) {
        if (this.panScroll) {
            this.panScroll.enable = value;
        }
    }

    get panScrollEnable() {
        if (this.panScroll) {
            return this.panScroll.enable;
        }
        return false;
    }

    setPanScrollEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.panScrollEnable = enable;
        return this;
    }

    set pinchZoomEnable(value) {
        if (this.pinchZoom) {
            this.pinchZoom.enable = value;
        }
    }

    get pinchZoomEnable() {
        if (this.pinchZoom) {
            return this.pinchZoom.enable;
        }
        return false;
    }

    setPinchZoomEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.pinchZoomEnable = enable;
        return this;
    }

    set boundsScrollEnable(value) {
        if (this.boundsScroll) {
            this.boundsScroll.enable = value;
        }
    }

    get boundsScrollEnable() {
        if (this.boundsScroll) {
            return this.boundsScroll.enable;
        }
        return false;
    }

    setBoundsScrollEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.boundsScrollEnable = enable;
        return this;
    }

    set mouseWheelZoomEnable(value) {
        if (this.mouseWheelZoom) {
            this.mouseWheelZoom.enable = value;
        }
    }

    get mouseWheelZoomEnable() {
        if (this.mouseWheelZoom) {
            return this.mouseWheelZoom.enable;
        }
    }

    setMouseWheelZoomEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.mouseWheelZoom = enable;
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