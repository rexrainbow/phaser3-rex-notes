import Pinch from '../../../pinch/Pinch.js';

var PanScrollPinchZoom = function (panScrollEnable, pinchZoomEnable) {
    if (!panScrollEnable && !pinchZoomEnable) {
        return;
    }

    var scene = this.scene;

    var gameObject = (this.background) ? this.background : scene;
    var pinch = new Pinch(gameObject);

    var camera = scene.cameras.main;

    if (panScrollEnable) {
        pinch.on('drag1', function (pinch) {
            var drag1Vector = pinch.drag1Vector;

            var zoom = camera.zoom;
            camera.scrollX -= drag1Vector.x / zoom;
            camera.scrollY -= drag1Vector.y / zoom;
        })
    }

    if (pinchZoomEnable) {
        pinch.on('pinch', function (pinch) {
            var scaleFactor = pinch.scaleFactor;
            camera.zoom *= scaleFactor;
        })
    }

    this.once('destroy', function () {
        pinch.destroy();
        pinch = undefined;
    });

}

export default PanScrollPinchZoom;