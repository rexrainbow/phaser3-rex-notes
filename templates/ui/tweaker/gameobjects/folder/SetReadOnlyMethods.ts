export default {
    setReadOnly(value?: any) {
        var child = this.childrenMap.child;  // tweaker
        if (child.setReadOnly) {
            child.setReadOnly(value);
        }
        return this;
    },
}