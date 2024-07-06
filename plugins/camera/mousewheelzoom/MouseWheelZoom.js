import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';
import EaseZoom from './EaseZoom.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class MouseWheelZoom extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.easeZoom = new EaseZoom(this);

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setEnable(GetValue(config, 'enable', true))
            .setZoomStep(GetValue(config, 'zoomStep', 0.1))
            .setEaseDuration(GetValue(config, 'easeDuration', 200))
            .setCamera(camera)

        this.boot();
    }

    boot() {
        this.scene.input.on('wheel', this.onWheel, this);
    }

    shutdown(fromScene) {
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

    setCamera(camera) {
        this.camera = camera;

        this.resetZoomLevel();

        this.easeZoom
            .stop()
            .setTarget((camera) ? camera : null)

        return this;
    }

    setEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setZoomStep(step) {
        this.zoomStep = step;
        return this;
    }

    setEaseDuration(duration) {
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
        return this;
    }

    onWheel(pointer, currentlyOver, dx, dy, dz, event) {
        var camera = this.camera;
        if (!this.enable || !camera) {
            return;
        }

        this.zoomLevel += (dy < 0) ? 1 : -1;
        var nextZoom = GetZoomValue(this.zoomLevel, this.zoomStep);

        this.focusLocalX = pointer.x;
        this.focusLocalY = pointer.y;

        this.easeZoom.start(nextZoom);
    }
}

var GetZoomLevel = function (zoom, step) {
    if (zoom >= 1) {
        var level = Math.log(zoom) / Math.log(1 + step);
        return level;
    } else {
        var level = Math.log(zoom) / Math.log(1 - step);
        return -level;
    }
}

var GetZoomValue = function (level, step) {
    if (level >= 0) {
        return Math.pow((1 + step), level);
    } else {
        return Math.pow((1 - step), -level);
    }
}

export default MouseWheelZoom;