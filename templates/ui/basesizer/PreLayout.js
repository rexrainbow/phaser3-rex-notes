var PreLayout = function (parent) {
    // Only run PreLayout in topMostSizer.layout()
    if (parent) {
        return;
    }

    this._layoutInit();
    var children = this.getChildrenSizers(),
        child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer.hidden || (!child.dirty)) {
            continue;
        }
        children[i].preLayout();
    }
}
export default PreLayout;