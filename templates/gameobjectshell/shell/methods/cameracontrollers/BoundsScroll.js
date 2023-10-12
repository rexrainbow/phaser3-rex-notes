import CursorAtBounds from '../../../cursoratbounds/CursorAtBounds.js';

var BoundsScroll = function () {
    var scene = this.scene;

    var camera = scene.cameras.main;

    var cursorAtBounds = new CursorAtBounds(scene);
    var cursorKeys = cursorAtBounds.createCursorKeys();

    var cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: camera,

        left: cursorKeys.left,
        right: cursorKeys.right,
        up: cursorKeys.up,
        down: cursorKeys.down,

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

        cameraController.destroy();
        cameraController = undefined;

        cursorKeys = undefined;
    }, this);
}

export default BoundsScroll;