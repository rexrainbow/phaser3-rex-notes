var GetAllChildrenSizer = function (out) {
    if (out === undefined) {
        out = [];
    }
    var children = this.sizerChildren,
        child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.isRexSizer) {
            continue;
        }
        out.push(child);
        out.push(...child.getAllChildrenSizer());
    }

    return out;
}
export default GetAllChildrenSizer;