import CursorAtBounds from '../../../cursoratbounds/CursorAtBounds.js';
import MouseWhellToUpDown from '../../../mousewheeltoupdown/MouseWheelToUpDown.js';

var CreateCursorAtBoundsCameraController = function (config) {
    var scene = this.scene;

    var cursorAtBounds = new CursorAtBounds(scene);
    var cursorKeys = cursorAtBounds.createCursorKeys();

    var mouseWheelToUpDown = new MouseWhellToUpDown(scene);
    var zoomKeys = mouseWheelToUpDown.createCursorKeys();

    var cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: scene.cameras.main,

        left: cursorKeys.left,
        right: cursorKeys.right,
        up: cursorKeys.up,
        down: cursorKeys.down,
        zoomIn: zoomKeys.down,
        zoomOut: zoomKeys.up,

        acceleration: 0.06,
        drag: 0.003,
        maxSpeed: 0.3,
        zoomSpeed: 0.05
    });

    this.cameraController = cameraController;

    var UpdateCameraController = function (time, delta) {
        cameraController.update(delta);
    }

    scene.events.on('preupdate', UpdateCameraController);

    this.once('destroy', function () {
        this.cameraController = undefined;
        scene.events.off('preupdate', UpdateCameraController);

        cursorAtBounds.destroy();
        cursorAtBounds = undefined;

        mouseWheelToUpDown.destroy();
        mouseWheelToUpDown = undefined;

        cameraController.destroy();
        cameraController = undefined;

        cursorKeys = undefined;
        zoomKeys = undefined;
    }, this);
}

export default CreateCursorAtBoundsCameraController;