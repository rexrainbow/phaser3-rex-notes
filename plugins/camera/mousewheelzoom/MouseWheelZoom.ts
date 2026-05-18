import ComponentBase from '../../utils/componentbase/ComponentBase';
import GetCameraByName from '../../utils/camera/GetCameraByName';
import EaseZoom from './EaseZoom';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

class MouseWheelZoom extends ComponentBase {
    enable: any;

    camera: any;
    easeDuration: any;
    easeZoom: any;
    focusLocalX: any;
    focusLocalY: any;
    inputTarget: any;
    isShutdown: any;
    maxZoom: any;
    minZoom: any;
    scene: any;
    zoom: any;
    zoomLevel: any;
    zoomStep: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.easeZoom = new EaseZoom(this);

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setEnable(GetValue(config, 'enable', true))
            .setMinZoom(GetValue(config, 'minZoom'))
            .setMaxZoom(GetValue(config, 'maxZoom'))
            .setZoomStep(GetValue(config, 'zoomStep', 0.1))
            .setEaseDuration(GetValue(config, 'easeDuration', 200))
            .setCamera(camera)

        this.boot();
    }

    boot() {
        this.scene.input.on('wheel', this.onWheel, this);
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.input.off('wheel', this.onWheel, this);

        this.easeZoom.destroy();
        this.easeZoom = undefined;

        this.inputTarget = undefined;

        super.shutdown(fromScene);
    }

    setCamera(camera?: any) {
        this.camera = camera;

        this.resetZoomLevel();

        this.easeZoom
            .stop()
            .setTarget((camera) ? camera : null)

        return this;
    }

    setEnable = function(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setMinZoom(value?: any) {
        this.minZoom = value;
        return this;
    }

    setMaxZoom(value?: any) {
        this.maxZoom = value;
        return this;
    }

    setZoomStep(step?: any) {
        this.zoomStep = step;
        return this;
    }

    setEaseDuration(duration?: any) {
        this.easeDuration = duration;
        this.easeZoom.setDuration(duration);
        return this;
    }

    resetZoomLevel() {
        var camera = this.camera;
        if (!camera) {
            this.zoomLevel = undefined;
            return this;
        }

        this.zoomLevel = Math.round(GetZoomLevel(camera.zoom, this.zoomStep));
        this.zoom = camera.zoom;

        return this;
    }

    onWheel(pointer?: any, currentlyOver?: any, dx?: any, dy?: any, dz?: any, event?: any) {
        var camera = this.camera;
        if (!this.enable || !camera) {
            return;
        }

        var hasMinZoom = (this.minZoom !== undefined);
        var hasMaxZoom = (this.maxZoom !== undefined);

        if (
            (hasMinZoom && (this.zoom <= this.minZoom) && (dy > 0)) ||
            (hasMaxZoom && (this.zoom >= this.maxZoom) && (dy < 0))
        ) {
            return;
        }

        this.zoomLevel += (dy < 0) ? 1 : -1;
        this.zoom = GetZoomValue(this.zoomLevel, this.zoomStep);

        if (hasMinZoom && (this.zoom < this.minZoom)) {
            this.zoom = this.minZoom;
        }

        if (hasMaxZoom && (this.zoom > this.maxZoom)) {
            this.zoom = this.maxZoom;
        }

        this.focusLocalX = pointer.x;
        this.focusLocalY = pointer.y;

        this.easeZoom.start(this.zoom);
    }
}

var GetZoomLevel = function(zoom?: any, step?: any) {
    if (zoom >= 1) {
        var level = Math.log(zoom) / Math.log(1 + step);
        return level;
    } else {
        var level = Math.log(zoom) / Math.log(1 - step);
        return -level;
    }
}

var GetZoomValue = function(level?: any, step?: any) {
    if (level >= 0) {
        return Math.pow((1 + step), level);
    } else {
        return Math.pow((1 - step), -level);
    }
}

export default MouseWheelZoom;