var DrawBounds = function (graphics) {
    var children = this.getAllChildren([this]);
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        graphics.lineStyle(1, this.boundsColor).strokeRectShape(children[i].getBounds());
    }
    return this;
}
export default DrawBounds;