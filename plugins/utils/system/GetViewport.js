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
    var canvasBounds = scaleManager.canvasBounds;
    var displayScale = scaleManager.displayScale;
    var parentSize = scaleManager.parentSize;

    out.x = (canvasBounds.x >= 0) ? 0 : -(canvasBounds.x * displayScale.x);
    out.y = (canvasBounds.y >= 0) ? 0 : -(canvasBounds.y * displayScale.y);

    var width = baseSize.width - (canvasBounds.width - parentSize.width) * displayScale.x;
    out.width = Math.min(baseSize.width, width);
    var height = baseSize.height - (canvasBounds.height - parentSize.height) * displayScale.y;
    out.height = Math.min(baseSize.height, height);

    return out;
}

var globRect = new Rectangle();

export default GetViewport;