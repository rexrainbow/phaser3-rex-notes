var DrawBounds = function (graphics, color) {
    if (color === undefined) {
        color = 0xffffff;
    }
    var children = this.getAllChildren([this]),
        child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.getBounds) {
            continue;
        }
        graphics.lineStyle(1, color).strokeRectShape(child.getBounds(globRect));
    }
    return this;
}

var globRect = new Phaser.Geom.Rectangle();

export default DrawBounds;