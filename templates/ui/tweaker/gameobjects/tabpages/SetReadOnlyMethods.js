export default {
    setReadOnly(value) {
        var children = this.childrenMap.pages.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.setReadOnly) {
                continue;
            }
            child.setReadOnly(value);
        }
        return this;
    },
}