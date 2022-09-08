import IsCameraObject from './IsCameraObject.js';
const Rectangle = Phaser.Geom.Rectangle;

var GetViewport = function (scene, camera, out) {
    if (!IsCameraObject(camera)) {
        out = camera;
        camera = undefined;
    }

    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globRect;
    }

    var scaleManager = scene.sys.scale;
    var baseSize = scaleManager.baseSize;
    var parentSize = scaleManager.parentSize;
    var canvasBounds = scaleManager.canvasBounds;
    var displayScale = scaleManager.displayScale;

    var x = (canvasBounds.x >= 0) ? 0 : -(canvasBounds.x * displayScale.x);

    var y = (canvasBounds.y >= 0) ? 0 : -(canvasBounds.y * displayScale.y);

    var width;
    if (parentSize.width >= canvasBounds.width) {
        width = baseSize.width;
    } else {
        width = baseSize.width - (canvasBounds.width - parentSize.width) * displayScale.x;
    }

    var height;
    if (parentSize.height >= canvasBounds.height) {
        height = baseSize.height;
    } else {
        height = baseSize.height - (canvasBounds.height - parentSize.height) * displayScale.y;
    }

    out.setTo(x, y, width, height);

    if (camera) {        
        out.width /= camera.zoomX;
        out.height /= camera.zoomY;
        out.centerX = camera.centerX + camera.scrollX;
        out.centerY = camera.centerY + camera.scrollY;
    }

    return out;
}

var globRect = new Rectangle();

export default GetViewport;