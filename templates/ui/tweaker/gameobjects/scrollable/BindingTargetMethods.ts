export default {
    setBindingTarget(target?: any) {
        var child = this.childrenMap.panel;  // tweaker
        if (child.setBindingTarget) {
            child.setBindingTarget(target);
        }
        return this;
    },
}