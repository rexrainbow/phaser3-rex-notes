import CursorAtBounds from '../../plugins/cursoratbounds.js';
import MouseWheelToUpDown from '../../plugins/mousewheeltoupdown.js';

class BoundsWheelController {
    constructor(scene, config) {
        this.scene = scene;
        this.cursorAtBounds = new CursorAtBounds(scene);
        this.mouseWheel = new MouseWheelToUpDown(scene);

        var boundsCursorKeys = this.cursorAtBounds.createCursorKeys();
        var mouseWheelCursorKeys = this.mouseWheel.createCursorKeys();

        // TODO: KeysHub
        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            left: boundsCursorKeys.left,
            right: boundsCursorKeys.right,
            up: boundsCursorKeys.up,
            down: boundsCursorKeys.down,
            zoomIn: mouseWheelCursorKeys.down,
            zoomOut: mouseWheelCursorKeys.up,

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3,
            zoomSpeed: 0.05
        });

        this
            .setCamera(GetValue(config, 'camera', scene.cameras.main))
            .setBoundsScrollEnable(GetValue(config, 'bounds-scroll', true))
            .setMouseWheelZoomEnable(GetValue(config, 'mouse-wheel-zoom', true))
    }

    boot() {
        this.scene.events.on('preupdate', this.updateCameraController, this);
    }

    destroy() {
        this.scene.events.off('preupdate', this.updateCameraController, this);

        this.cursorAtBounds.destroy();
        this.mouseWheel.destroy();
        this.cameraController.destroy();
    }

    get camera() {
        return this.cameraController.camera;
    }

    set camera(value) {
        this.cameraController.setCamera(value);
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    get boundsScrollEnable() {
        return this.cursorAtBounds.enable;
    }

    set boundsScrollEnable(value) {
        this.cursorAtBounds.enable = value;
    }

    setBoundsScrollEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.boundsScrollEnable = enable;
        return this;
    }

    get mouseWheelZoomEnable() {
        return this.mouseWheel.enable;
    }

    set mouseWheelZoomEnable(value) {
        this.mouseWheel.enable = value;
    }

    setMouseWheelZoomEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.mouseWheelZoomEnable = enable;
        return this;
    }

    updateCameraController(time, delta) {
        this.cameraController.update(delta);
    }
}

export default BoundsWheelController;