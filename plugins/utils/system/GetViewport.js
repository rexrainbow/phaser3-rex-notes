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
    var parentSize = scaleManager.parentSize;
    var autoCenter = scaleManager.autoCenter;

    out.x = (bounds.x >= 0) ? 0 : -(bounds.x * scale.x);
    out.y = (bounds.y >= 0) ? 0 : -(bounds.y * scale.y);

    if ((autoCenter === Center.CENTER_BOTH) || (autoCenter === Center.CENTER_HORIZONTALLY)) {
        out.width = baseSize.width - (out.x * 2);
    } else {
        var width = baseSize.width - (bounds.width - parentSize.width) * scale.x;
        out.width = Math.min(baseSize.width, width);
    }

    if ((autoCenter === Center.CENTER_BOTH) || (autoCenter === Center.CENTER_VERTICALLY)) {
        out.height = baseSize.height - (out.y * 2);
    } else {
        var height = baseSize.height - (bounds.height - parentSize.height) * scale.y;
        out.height = Math.min(baseSize.height, height);
    }
    return out;
}

var globRect = new Rectangle();

export default GetViewport;