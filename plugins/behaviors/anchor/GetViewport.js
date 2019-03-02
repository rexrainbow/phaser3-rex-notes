const Rectangle = Phaser.Geom.Rectangle;

var GetViewport = function (scaleManager, out) {
    if (out === undefined) {
        out = new Rectangle();
    }
    var bounds = scaleManager.canvasBounds;
    var scale = scaleManager.displayScale;
    var autoCenter = scaleManager.autoCenter;
    out.x = (bounds.x >= 0) ? 0 : -(bounds.x * scale.x);
    out.y = (bounds.y >= 0) ? 0 : -(bounds.y * scale.y);
    out.width = (bounds.width * scale.x) - out.x;
    out.height = (bounds.height * scale.y) - out.y;
    if ((autoCenter === 1) || (autoCenter === 2)) {
        out.width -= out.x;
    }
    if ((autoCenter === 1) || (autoCenter === 3)) {
        out.height -= out.y;
    }
    return out;
}

export default GetViewport;