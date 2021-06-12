const Rectangle = Phaser.Geom.Rectangle;
const Center = Phaser.Scale.Center;

var GetViewport = function (scene, out) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globRect;
    }

    var scaleManager = scene.scale;
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

    return out;
}

var globRect = new Rectangle();

export default GetViewport;