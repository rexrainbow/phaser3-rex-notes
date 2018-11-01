var DrawBounds = function (graphics, color) {
    if (color === undefined) {
        color = 0xffffff;
    }
    var children = this.getAllChildren([this]);
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        graphics.lineStyle(1, color).strokeRectShape(children[i].getBounds());
    }
    return this;
}
export default DrawBounds;