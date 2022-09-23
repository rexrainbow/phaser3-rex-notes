var ForEachRenderableChild = function (callback, scope, activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    var charIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (activeOnly && !child.active) {
            continue;
        }

        if (child.renderable && !child.removed) {
            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, charIndex, children);
            } else {
                isBreak = callback(child, charIndex, children);
            }
            charIndex++;

            if (isBreak) {
                break;
            }
        }
    }

    return this;
}

export default ForEachRenderableChild;