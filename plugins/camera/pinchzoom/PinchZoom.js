import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import { Pinch } from '../../gestures.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';
import ZoomFocusAt from '../../utils/camera/ZoomFocus.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class PinchZoom extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.inputTarget = GetValue(config, 'inputTarget', scene);
        this.pinch = new Pinch(this.inputTarget);

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setCamera(camera)
            .setEnable(GetValue(config, 'enable', true))
            .setMinZoom(GetValue(config, 'minZoom', 0.001))
            .setMaxZoom(GetValue(config, 'maxZoom', 1000))

        this.boot();
    }

    boot() {
        this.pinch
            .on('pinch', function (pinch) {
                var camera = this.camera;
                if (!this.enable || !camera) {
                    return;
                }

                var zoom = camera.zoom * pinch.scaleFactor;
                zoom = Clamp(zoom, this.minZoom, this.maxZoom);

                var pointer0 = pinch.pointers[0];
                var pointer1 = pinch.pointers[1];
                var focusLocalX = (pointer0.x + pointer1.x) / 2;
                var focusLocalY = (pointer0.y + pointer1.y) / 2;

                ZoomFocusAt(camera, zoom, focusLocalX, focusLocalY);
            }, this)
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.inputTarget = undefined;
        this.pinch.destroy();
        this.pinch = undefined;

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

}

export default PinchZoom;