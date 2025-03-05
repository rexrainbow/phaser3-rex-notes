import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import { Pan } from '../../gestures.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PanScroll extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.inputTarget = GetValue(config, 'inputTarget', scene);
        this.pan = new Pan(this.inputTarget);

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setCamera(camera)
            .setEnable(GetValue(config, 'enable', true))

        this.boot();
    }

    boot() {
        this.pan
            .on('pan', function (pan) {
                var camera = this.camera;
                if (!camera) {
                    return;
                }

                var zoom = camera.zoom;
                camera.scrollX -= pan.dx / zoom;
                camera.scrollY -= pan.dy / zoom;
            }, this)
            .on('panstart', function () {
                this.emit('panstart');
            }, this)
            .on('panend', function () {
                this.emit('panend');
            }, this)
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.inputTarget = undefined;
        this.pan.destroy();
        this.pan = undefined;

        super.shutdown(fromScene);
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    get enable() {
        return this.pan.enable;
    }

    set enable(value) {
        this.pan.enable = value;
    }

    setEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    get isPanning() {
        return this.pan.isPanning;
    }
}

export default PanScroll;