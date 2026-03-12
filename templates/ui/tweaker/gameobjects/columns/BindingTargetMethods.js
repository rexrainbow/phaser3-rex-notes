export default {
    setBindingTarget(target) {
        var children = this.childrenMap.columns;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.setBindingTarget) {
                continue;
            }
            child.setBindingTarget(target);
        }
        return this;
    },
}