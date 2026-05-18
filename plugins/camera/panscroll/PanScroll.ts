import ComponentBase from '../../utils/componentbase/ComponentBase';
import { Pan } from '../../gestures';
import GetCameraByName from '../../utils/camera/GetCameraByName';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class PanScroll extends ComponentBase {
    camera: any;
    emit: any;
    inputTarget: any;
    isShutdown: any;
    pan: any;
    scene: any;

    constructor(scene?: any, config?: any) {
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
            .on('pan', function(pan?: any) {
                var camera = this.camera;
                if (!camera) {
                    return;
                }

                var zoom = camera.zoom;
                camera.scrollX -= pan.dx / zoom;
                camera.scrollY -= pan.dy / zoom;
            }, this)
            .on('panstart', function() {
                this.emit('panstart');
            }, this)
            .on('panend', function() {
                this.emit('panend');
            }, this)
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.inputTarget = undefined;
        this.pan.destroy();
        this.pan = undefined;

        super.shutdown(fromScene);
    }

    setCamera(camera?: any) {
        this.camera = camera;
        return this;
    }

    get enable() {
        return this.pan.enable;
    }

    set enable(value) {
        this.pan.enable = value;
    }

    setEnable = function(enable?: any) {
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