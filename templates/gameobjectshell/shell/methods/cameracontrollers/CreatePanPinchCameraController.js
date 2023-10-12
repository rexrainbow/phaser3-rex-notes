import Pinch from '../../../pinch/Pinch.js';

var CreatePanPinchCameraController = function (config) {
    var scene = this.scene;

    var gameObject = (this.background) ? this.background : scene;
    var pinch = new Pinch(gameObject);

    var camera = scene.cameras.main;
    pinch
        .on('drag1', function (pinch) {
            var drag1Vector = pinch.drag1Vector;
            camera.scrollX -= drag1Vector.x;
            camera.scrollY -= drag1Vector.y;
        })
        .on('pinch', function (pinch) {
            var scaleFactor = pinch.scaleFactor;
            camera.zoom *= scaleFactor;
        }, this)


    var onWheeling = function (pointer, currentlyOver, dx, dy, dz, event) {
        camera.zoom += ((dy < 0) ? 1 : -1) * 0.05;
    }
    scene.input.on('wheel', onWheeling, this);


    this.once('destroy', function () {
        pinch.destroy();
        pinch = undefined;

        scene.input.off('wheel', onWheeling, this);
    });

}

export default CreatePanPinchCameraController;