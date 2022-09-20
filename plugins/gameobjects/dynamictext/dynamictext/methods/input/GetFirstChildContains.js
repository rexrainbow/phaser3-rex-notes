var GetFirstChildContains = function (children, x, y) {
    if (Result === undefined) {
        Result = {};
    }

    Result.child = null;
    Result.index = -1;

    var children = children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.active || !child.renderable) {
            continue;
        }
        if (child.contains(x, y)) {
            Result.child = child;
            Result.index = i;
            break;
        }
    }

    return Result;
}

var Result;

export default GetFirstChildContains;