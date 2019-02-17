var LayoutInit = function (parent) {
    if (parent) {
        return;
    }

    var children = this.getAllChildrenSizers([this]);
    var child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.rexSizer) {
            continue;
        }
        parent = child.rexSizer.parent;
        parent.layoutInitChild(child);
    }
}
export default LayoutInit;