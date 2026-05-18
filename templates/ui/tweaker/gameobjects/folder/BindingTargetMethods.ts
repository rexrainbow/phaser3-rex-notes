export default {
    setBindingTarget(target?: any) {
        var child = this.childrenMap.child;  // tweaker
        if (child.setBindingTarget) {
            child.setBindingTarget(target);
        }
        return this;
    },
}