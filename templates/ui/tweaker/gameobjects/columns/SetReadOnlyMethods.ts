export default {
    setReadOnly(value?: any) {
        var children = this.childrenMap.columns;
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