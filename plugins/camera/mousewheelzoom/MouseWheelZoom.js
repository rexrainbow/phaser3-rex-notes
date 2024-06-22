import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';
import ZoomAt from '../../utils/camera/ZoomAt.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class MouseWheelZoom extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.zoomInc = 0;

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setCamera(camera)
            .setEnable(GetValue(config, 'enable', true))
            .setMinZoom(GetValue(config, 'minZoom', 0.001))
            .setMaxZoom(GetValue(config, 'maxZoom', 1000))
            .setZoomStep(GetValue(config, 'zoomStep', 0.01))
            .setEaseDuration(GetValue(config, 'easeDuration', 200))

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

        this.inputTarget = undefined;

        super.shutdown(fromScene);
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    setEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setMinZoom(value) {
        this.minZoom = value;
        return this;
    }

    setMaxZoom(value) {
        this.maxZoom = value;
        return this;
    }

    setZoomStep(step) {
        this.zoomStep = step;
        return this;
    }

    setEaseDuration(duration) {
        this.easeDuration = duration;
        return this;
    }

    onWheel(pointer, currentlyOver, dx, dy, dz, event) {
        var camera = this.camera;
        if (!this.enable || !camera) {
            return;
        }

        this.zoomInc += (dy > 0) ? -this.zoomStep : this.zoomStep;
        this.focusLocalX = pointer.x;
        this.focusLocalY = pointer.y;
        this.startZoom()
    }

    startZoom() {
        this.scene.sys.events.on('preupdate', this.onZoomTick, this);
    }

    onZoomTick(time, delta) {
        var camera = this.camera;
        if (!this.enable || !camera) {
            return;
        }

        var zoomStep = this.zoomStep * delta / this.easeDuration;

        var lastZoomInc = zoomStep >= Math.abs(this.zoomInc);
        if (lastZoomInc) {
            zoomStep = this.zoomInc;
            this.zoomInc = 0;

        } else {
            if (this.zoomInc < 0) {
                zoomStep = -zoomStep;
            }
            this.zoomInc -= zoomStep;
        }

        var zoom = camera.zoom + zoomStep;
        zoom = Clamp(zoom, this.minZoom, this.maxZoom);
        ZoomAt(camera, zoom, this.focusLocalX, this.focusLocalY);

        if (lastZoomInc) {
            this.stopZoom();
        }
    }

    stopZoom() {
        this.scene.sys.events.off('preupdate', this.onZoomTick, this);
    }

}

export default MouseWheelZoom;