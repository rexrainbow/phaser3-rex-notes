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
    var bounds = scaleManager.canvasBounds;
    var scale = scaleManager.displayScale;
    var autoCenter = scaleManager.autoCenter;

    out.x = (bounds.x >= 0) ? 0 : -(bounds.x * scale.x);
    out.y = (bounds.y >= 0) ? 0 : -(bounds.y * scale.y);

    out.width = baseSize.width - out.x;
    out.height = baseSize.height - out.y;
    if ((autoCenter === Center.CENTER_BOTH) || (autoCenter === Center.CENTER_HORIZONTALLY)) {
        out.width -= out.x;
    }
    if ((autoCenter === Center.CENTER_BOTH) || (autoCenter === Center.CENTER_VERTICALLY)) {
        out.height -= out.y;
    }
    return out;
}

var globRect = new Rectangle();

export default GetViewport;