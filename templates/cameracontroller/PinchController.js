import { Pinch } from '../../plugins/gestures.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PinchController {
    constructor(scene, config) {
        this.scene = scene;
        this.pinch = new Pinch(GetValue(config, 'inputTarget', scene));

        this
            .setCamera(GetValue(config, 'camera', this.scene.cameras.main))
            .setPanScrollEnable(GetValue(config, 'pan-scroll', true))
            .setPinchZoomEnable(GetValue(config, 'pinch-zoom', true))

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

    destroy() {
        this.pinch.destroy();
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