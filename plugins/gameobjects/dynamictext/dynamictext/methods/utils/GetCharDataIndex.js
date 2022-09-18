var GetCharDataIndex = function (textIndex, activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children;
        if (activeOnly && !child.active) {
            continue;
        }

        if (IsChar(child)) {
            if (textIndex === 0) {
                return i;
            } else {
                textIndex--;
            }
        }
    }

    return undefined;
}

export default GetCharDataIndex;