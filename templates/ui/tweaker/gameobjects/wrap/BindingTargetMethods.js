export default {
    setBindingTarget(target) {
        var children = this.childrenMap.child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setBindingTarget(target);
        }
        return this;
    },
}