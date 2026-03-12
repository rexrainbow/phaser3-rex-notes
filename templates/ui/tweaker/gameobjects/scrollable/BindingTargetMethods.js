export default {
    setBindingTarget(target) {
        var child = this.childrenMap.panel;  // tweaker
        if (child.setBindingTarget) {
            child.setBindingTarget(target);
        }
        return this;
    },
}