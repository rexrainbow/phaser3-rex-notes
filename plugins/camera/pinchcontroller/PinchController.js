import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import { Pinch } from '../../gestures.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PinchController extends ComponentBase {
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
            .setPanScrollEnable(GetValue(config, 'pan-scroll', true))
            .setPinchZoomEnable(GetValue(config, 'pinch-zoom', true))

        this.boot();
    }

    boot() {
        this.pinch
            .on('drag1', function (pinch) {
                var camera = this.camera;
                if (!this.panScrollEnable || !camera) {
                    return;
                }

                var drag1Vector = pinch.drag1Vector;
                var zoom = camera.zoom;
                camera.scrollX -= drag1Vector.x / zoom;
                camera.scrollY -= drag1Vector.y / zoom;
            }, this)
            .on('pinch', function (pinch) {
                var camera = this.camera;
                if (!this.pinchZoomEnable || !camera) {
                    return;
                }

                var scaleFactor = pinch.scaleFactor;
                camera.zoom *= scaleFactor;
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

    setPanScrollEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.panScrollEnable = enable;
        return this;
    }

    setPinchZoomEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.pinchZoomEnable = enable;
        return this;
    }
}

export default PinchController;