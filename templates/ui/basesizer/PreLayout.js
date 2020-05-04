var LayoutInit = function (parent) {
    if (parent) {
        return;
    }

    var children = this.getAllChildrenSizers([this]);
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i]._layoutInit();
    }
}
export default LayoutInit;