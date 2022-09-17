var GetFirstChildContains = function (x, y) {
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.active || !child.renderable) {
            continue;
        }
        if (child.contains(x, y)) {
            return child;
        }
    }

    return null;
}

export default GetFirstChildContains;