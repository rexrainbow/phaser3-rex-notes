var LayoutInit = function (parent) {
    if (parent) {
        return;
    }

    var children = this.getAllChildrenSizers([this]);
    var child, parent;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.rexSizer) {
            continue;
        }
        child._layoutInit();
    }
}
export default LayoutInit;