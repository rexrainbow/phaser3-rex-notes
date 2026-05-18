import ComponentBase from '../../utils/componentbase/ComponentBase';
import { Pinch } from '../../gestures';
import GetCameraByName from '../../utils/camera/GetCameraByName';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class PinchZoom extends ComponentBase {
    camera: any;
    emit: any;
    focusEnable: any;
    focusWorldX: any;
    focusWorldY: any;
    inputTarget: any;
    isShutdown: any;
    maxZoom: any;
    minZoom: any;
    pinch: any;
    scene: any;

    constructor(scene?: any, config?: any) {
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
            .setMinZoom(GetValue(config, 'minZoom', undefined))
            .setMaxZoom(GetValue(config, 'maxZoom', undefined))
            .setFocusEnable(GetValue(config, 'focusEnable', true))

        this.boot();
    }

    boot() {
        this.focusWorldX = undefined;
        this.focusWorldY = undefined;

        this.pinch
            .on('pinchstart', function(pinch?: any) {
                var pointer0 = pinch.pointers[0];
                var pointer1 = pinch.pointers[1];
                if (this.focusEnable && (this.focusWorldX === undefined)) {
                    this.focusWorldX = (pointer0.worldX + pointer1.worldX) * 0.5;
                    this.focusWorldY = (pointer0.worldY + pointer1.worldY) * 0.5;
                }
                this.emit('pinchstart');
            }, this)

            .on('pinch', function(pinch?: any) {
                var camera = this.camera;
                if (!camera) {
                    return;
                }

                var newZoom = camera.zoom * pinch.scaleFactor;
                if ((this.minZoom !== undefined) && (newZoom < this.minZoom)) {
                    newZoom = this.minZoom;
                }
                if ((this.maxZoom !== undefined) && (newZoom > this.maxZoom)) {
                    newZoom = this.maxZoom;
                }
                camera.zoom = newZoom;
                camera.preRender();

                if (this.focusEnable) {
                    var pointer0 = pinch.pointers[0];
                    var pointer1 = pinch.pointers[1];
                    var focusLocalX = (pointer0.x + pointer1.x) * 0.5;
                    var focusLocalY = (pointer0.y + pointer1.y) * 0.5;
                    var newWorldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
                    camera.scrollX -= (newWorldXY.x - this.focusWorldX);
                    camera.scrollY -= (newWorldXY.y - this.focusWorldY);
                }

            }, this)

            .on('pinchend', function() {
                this.focusWorldX = undefined;
                this.focusWorldY = undefined;
                this.emit('pinchend');
            }, this)
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.inputTarget = undefined;
        this.pinch.destroy();
        this.pinch = undefined;

        super.shutdown(fromScene);
    }

    setCamera(camera?: any) {
        this.camera = camera;
        return this;
    }

    get enable() {
        return this.pinch.enable;
    }

    set enable(value) {
        this.pinch.enable = value;
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

    setFocusEnable(value?: any) {
        this.focusEnable = value;
        return this;
    }

    get isPinching() {
        return this.pinch.isPinching;
    }
}

export default PinchZoom;