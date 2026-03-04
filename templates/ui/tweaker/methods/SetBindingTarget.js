var SetBindingTarget = function (target, key) {
    // Use key only if there has single inputRow
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.setBindingTarget) {
            continue;
        }

        child.setBindingTarget(target, key);
    }

    return this;
}

export default SetBindingTarget;