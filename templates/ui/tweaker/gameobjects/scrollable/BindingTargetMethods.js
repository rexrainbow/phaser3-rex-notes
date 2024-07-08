export default {
    setBindingTarget(target) {
        var child = this.childrenMap.panel;  // tweaker
        child.setBindingTarget(target);
        return this;
    },
}