var GetChildrenSizers = function (out) {
    if (out === undefined) {
        out = [];
    }
    var children = this.gridChildren,
        child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child && child.isRexSizer) {
            out.push(child);
        }
    }
    return out;
}
export default GetChildrenSizers;