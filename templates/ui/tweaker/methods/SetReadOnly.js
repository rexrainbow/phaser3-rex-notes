var SetReadOnly = function (value) {
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.setReadOnly) {
            continue;
        }

        child.setReadOnly(value);
    }

    return this;
}

export default SetReadOnly;